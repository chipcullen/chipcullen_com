---
title: "Say What the Impact is when Reporting Issues"
date: 2021-10-05T21:53:02-04:00
draft: false
slug: "say-what-the-impact-is-when-reporting-issues"
description: "When reporting an issue, make it clear what the impact is."
tags: [microcommunication]
custom_properties: []
---

When you have to make an issue report, especially to another team, here is a tip that will make it more likely that your issue will get resolved the way you need:

**When reporting an issue, make it clear what the impact is.**

For example, this is a clear, but not terribly helpful error report:

> Hey API team! We noticed that the user preference API seems to be returning 500's, even though nothing has changed on our end.

Why is this not helpful? It doesn't let the other team know how urgent of an issue this is. The other team will also not have the contextual knowledge of your application and will not know intuitively what this could result in. This could be a mild inconvenience, or it could be catastrophic.

Compare with this:

> Hey API team! We noticed that the user preference API seems to be returning 500's, even though nothing has changed on our end. The impact of this in our application is that users actually can't log in, and is breaking the experience for all users. Can we address this as soon as possible?

Much better! You've made it clear what the issue is resulting in. This issue is serious and should be addressed ASAP. It could just as easily have been this:

> Hey API team! We noticed that the user preference API seems to be returning 500's, even though nothing has changed on our end. The impact of this in our application is that users who chose dark mode don't have it loaded. Approximately 10% of our users have used this option. If this could get addressed in the next week or two, our users will appreciate it.

This is also much more clear - you're letting them know that something is _broken_, but is not a _fire_. The other team will appreciate not having to drop everything to look into this.
