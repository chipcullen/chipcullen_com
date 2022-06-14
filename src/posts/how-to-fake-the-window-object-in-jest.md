---
title: "How to Fake the Window Object in Jest and Enzyme"
date: 2018-09-24T08:24:00-04:00
draft: false
tags: ["Jest", "Testing"]
slug: "how-to-fake-the-window-object-in-jest-and-enzyme"
---

I was struggling with writing a test the other day for a React component that was mostly a stateless component, but it did read two properties of the `window` object and made some decisions based on that.

The problem is that Jest makes use of `jsdom` which doesn't provide the `window` object. I googled and googled and struggled with many suggestions around problems that weren't _exactly_ what I was trying to solve. Most of the solutions I found were people trying to mock window functions. What I needed was a fake _window object_ itself, and one that didn't involve hacking my `jest.setup.js` file.

A coworker (yet another one who is much smarter than me) suggested that I could solve this by making a lightweight use of **Dependency Injection**. In the context of this article, I'll define that as setting external data points as optional parameters to your function, so that you can _inject_ them in your tests more easily, and you can side-step the vagaries of your test runner.

I will be using React components in this blog post, but there is no reason the concept can't transfer to other JavaScript implementations.

Let's say the component looked something like this:

```javascript
// our-component.js
class ourComponent extends Component {
  render() {
    const { data } = this.props;

    const windowData = window.windowData;

    let title = data.title;

    // altering the title variable if the window object has windowData
    if (windowData) {
      title = windowData;
    }

    return <div className="our-component">{title}</div>;
  }
}

ReactPassportTooltip.propTypes = {
  data: PropTypes.object.isRequired
};

export default ourComponent;
```

The problem comes when we try to write a unit test (in my case, using Jest and Enzyme) for this component. We need to be able to supply `window.windowData` for our tests.

The solution for this situation, for me, was the _dependency injection_ that my coworker suggested. It's really just a fancy term to allow for faking some data by making a function parameter optional. In this case we "inject" `window` by altering the _original_ function like so:

```javascript
// our-component.js

class ourComponent extends Component {
  render() {
    // depWindowData - 'dep' just signifies it's a dependecy prop as a convention
    const { data, depWindowData } = this.props;

    // testing for depWindowData OR window.windowData
    const windowData = depWindowData || window.windowData;

    let title = data.title;

    // altering the title variable if the there is windowData
    if (windowData) {
      title = windowData;
    }

    return <div className="our-component">{title}</div>;
  }
}

ReactPassportTooltip.propTypes = {
  data: PropTypes.object.isRequired
};

export default ourComponent;
```

This allows us to then write our test something like this:

```javascript
// our-component.test.js
import React from "react";
import { shallow } from "enzyme";

import ourComponent from "./our-component";

function setup() {
  const props = {
    data: {
      title: "Example Title"
    }
  };

  const enzymeWrapper = shallow(<ourComponent {...props} />);

  return { props, enzymeWrapper };
}

describe("ourComponent Test", () => {
  const { enzymeWrapper } = setup();

  test("ourComponent Should Render with the default title", () => {
    // the first test will be for the default prop-based title
    expect(enzymeWrapper.find(".our-component").text()).toBe("Example Title");
  });

  test("ourComponent Should Render with a different title", () => {
    // using .setProps we 'inject' depWindowData
    enzymeWrapper.setProps({ depWindowData: "Window based title" });
    // and now we get a new text string
    expect(enzymeWrapper.find(".our-component").text()).toBe(
      "Window based title"
    );
  });
});
```

By modifying our original function, we've made it easy for a test to pass along an optional dependency. This makes the tests much simpler, as we're not having to resort to crazy methods of inject or faking a window object.
