---
title: 'How to mock fetch requests in React Testing Librarty tests'
date: 2024-01-09T12:00:00-05:00
permalink: 'mocking-fetch-requests-in-react-testing-library-tests/'
description: 'Creating a mock server with msw to make React Testing Librarty tests for your components.'
draft: false
tags: ['react', 'javascript', 'testing']
---

I built a complicated react component that made a `fetch` call and did different things based on the result. It used to be that I would chalk up a component like this to being so based on side effects that I wouldn't bother testing most of the component.

I've been a fan of [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for years, and like the opinionated approach that it takes. With some help from this [Kent C. Dodd's blog post](https://kentcdodds.com/blog/stop-mocking-fetch), I was able to make some meaningful tests for this component. This post is a note-to-future-me post, because I think this will be helpful to remember how to do. But I hope you find this useful too.

## Overall approach

In our tests, we will use the `msw` [library](https://www.npmjs.com/package/msw) to recreate our backend. Then, using fixture data, we pass that data to our component and write tests against the result. This will mean that our unit tests won't actually make data calls, and will get the same data every time, which allows us to write these tests in a meaningful way. This approach is easy to scale up across a codebase with multiple tests.

## Procedure

1. `npm install msw --save-dev` in your project
2. Import your component into a test file like you would for any other test:

```tsx
// YourComponent.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'

import YourComponent from './YourComponent'
```

3. This component makes a `fetch` call to our backend on load, and does stuff based on the response. Let's say we want to test three different permutations of that call. That is where `msw` comes in. We need to use it to set up a server, and get ready to intercept those three calls:

```tsx
// YourComponent.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import YourComponent from './YourComponent'

const server = setupServer(
  rest.get('/api/example/one', (req, res, ctx) => {
    return res(ctx.json())
  }),

  rest.get('/api/example/two', (req, res, ctx) => {
    return res(ctx.json())
  }),

  rest.get('/api/example/three', (req, res, ctx) => {
    return res(ctx.json())
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

4. What should go into those responses? That's where you can create some fixture responses. To be honest, I usually slap a `console.log()` in my component and load the component locally. I'll copy that and paste it into a fixtures file, which is helpful if I want to use the same response in multiple tests.

```tsx
// YourComponent.tsx
const YourComponent = (props) => {
  // Other hooks or destructuring may go here
  useEffect(() => {
    const url = `api/example/${slug}` // or whatever
    const fetchFunction = () => {
      fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('bad server resonse')
          }
          return response.json()
        })
        .then((json: typedResponse) => {
          console.log(json) // <- where to get fixture data
          // back this out when you're done!
          // other stuff goes here
        })
        .catch((error) => {
          console.error('Error fetching data: ', error)
        })
    }

    fetchFunction()
  }, [])
  // Your component, you know, does things
}

export default YourComponent
```

Then put those responses in a static file:

```ts
// YourComponent/fixtures.ts
export const examleOneResponse = {
  // data copied from console.log()
}
export const examleTwoResponse = {
  // data copied from console.log()
}
export const examleThreeResponse = {
  // data copied from console.log()
}
```

5. Use those fixtures as your responses

```tsx
// YourComponent.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import YourComponent from './YourComponent'
import {
  examleOneResponse,
  examleTwoResponse,
  examleThreeResponse,
} from './fixtures'

const server = setupServer(
  rest.get('/api/example/one', (req, res, ctx) => {
    return res(ctx.json(examleOneResponse))
  }),

  rest.get('/api/example/two', (req, res, ctx) => {
    return res(ctx.json(examleTwoResponse))
  }),

  rest.get('/api/example/three', (req, res, ctx) => {
    return res(ctx.json(examleThreeResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

6. You can now write tests for your component when it would make those three API calls.

```tsx
// YourComponent.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import YourComponent from './YourComponent'
import {
  examleOneResponse,
  examleTwoResponse,
  examleThreeResponse,
} from './fixtures'

const server = setupServer(
  rest.get('/api/example/one', (req, res, ctx) => {
    return res(ctx.json(examleOneResponse))
  }),

  rest.get('/api/example/two', (req, res, ctx) => {
    return res(ctx.json(examleTwoResponse))
  }),

  rest.get('/api/example/three', (req, res, ctx) => {
    return res(ctx.json(examleThreeResponse))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('YourComponent', () => {
  it('Does a thing based on the first API response', async () => {
    render(<YourComponent propThatFactorsIntoApiCall={'one'} />)
    // do stuff
  })

  it('Does a thing based on the second API response', async () => {
    render(<YourComponent propThatFactorsIntoApiCall={'two'} />)
    // do stuff
  })

  // etc
})
```

7. If it makes sense for your project, you could even abstract out the `msw` server setup and import it into tests throughout your codebase.

```ts
// testServer.ts
import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const testServer = setupServer(
  rest.get('/api/example/one', (req, res, ctx) => {
    return res(ctx.json())
  }),

  rest.get('/api/example/two', (req, res, ctx) => {
    return res(ctx.json())
  }),

  rest.get('/api/example/three', (req, res, ctx) => {
    return res(ctx.json())
  })
)
```

Which means you can now do this:

```tsx
// YourComponent.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { testServer } from '/path/to/testServer'

import YourComponent from './YourComponent'

beforeAll(() => testServer.listen())
afterEach(() => testServer.resetHandlers())
afterAll(() => testServer.close())
```

8. Bonus - if you have a loading state in your component while the server call is being made, you can test that like so:

```tsx
// YourComponent.test.tsx
//...
it('Does a thing based on the first API response', async () => {
  render(<YourComponent propThatFactorsIntoApiCall={'one'} />)

  const loadingIndicator = await screen.getByTestId('loading-indicator')

  expect(loadingIndicator).toBeTruthy()

  // wait for the loading indicator to go away
  await waitFor(() => {
    expect(
      // the queryBy... methods are what you need if you are
      // testing for the absence of something
      queryByTestId(document.querySelector('div'), 'loading-indicator')
    ).not.toBeInTheDocument()
  })

  const shouldBeInComponentAfterLoad = queryByText(
    document.querySelector('.thing'),
    'Some string'
  )
  expect(shouldBeInComponentAfterLoad).toBeInTheDocument
  const shouldNotBeInComponentAfterLoad = queryByText(
    document.querySelector('.thing'),
    'Some other string'
  )
  expect(shouldNotBeInComponentAfterLoad).not.toBeInTheDocument
})
```

I hope you have found this helpful, and that you are able to write better, more meaningful tests for your components!
