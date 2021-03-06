---
title: "Test"
date: Sun, 01 Nov 2020 16:00:46 +0000
draft: false
layout: "page"
---

<style>
.player-wrapper {
  position: relative;
  padding-bottom: 55%;
  height: 0;
  width: 500px;
}

.player-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
## Player tests

### Player staging

<div class="player-wrapper">
<iframe id="partnerPlayer" marginwidth="0" marginheight="0" scrolling="no" src="https://player-staging.pbs.org/partnerplayer/5czL0C0cle1vmic6A2Du5A==/?topbar=false&amp;end=0&amp;endscreen=true&amp;start=0&amp;autoplay=false&amp;callsign=weta" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

```html
<iframe id="partnerPlayer" marginwidth="0" marginheight="0" scrolling="no" src="https://player-staging.pbs.org/partnerplayer/5czL0C0cle1vmic6A2Du5A==/?topbar=false&amp;end=0&amp;endscreen=true&amp;start=0&amp;autoplay=false&amp;callsign=weta" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0"  referrerpolicy="no-referrer-when-downgrade"></iframe>
```

<a href="https://www.pbs.org/?returnURL=https%3A%2F%2Fchipcullen.com/test&showSignIn=true">Log in link</a>

### with parentURL - not what we want

<div class="player-wrapper">
<iframe id="partnerPlayer" marginwidth="0" marginheight="0" scrolling="no" src="https://player-staging.pbs.org/partnerplayer/5czL0C0cle1vmic6A2Du5A==/?topbar=false&end=0&endscreen=true&start=0&autoplay=false&callsign=weta&parentURL=https://chipcullen.com/test/" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

```html
<iframe id="partnerPlayer" marginwidth="0" marginheight="0" scrolling="no" src="https://player-staging.pbs.org/partnerplayer/5czL0C0cle1vmic6A2Du5A==/?topbar=false&end=0&endscreen=true&start=0&autoplay=false&callsign=weta&parentURL=https://chipcullen.com/test/" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

### with uid set

<div class="player-wrapper">
<iframe id="partnerPlayer" marginwidth="0" marginheight="0" scrolling="no" src="https://player-staging.pbs.org/partnerplayer/5czL0C0cle1vmic6A2Du5A==/?topbar=false&end=0&endscreen=true&start=0&autoplay=false&callsign=weta&uid=c131802f-4e9c-44eb-9fa4-fcc0d75d894d" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>

```html
<iframe id="partnerPlayer" marginwidth="0" marginheight="0" scrolling="no" src="https://player-staging.pbs.org/partnerplayer/5czL0C0cle1vmic6A2Du5A==/?topbar=false&end=0&endscreen=true&start=0&autoplay=false&callsign=weta&uid=c131802f-4e9c-44eb-9fa4-fcc0d75d894d" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0" referrerpolicy="no-referrer-when-downgrade"></iframe>
```


<iframe id="" marginwidth="0" marginheight="0" scrolling="no" src="https://chipcullen.com/iframe/" allowfullscreen="" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-storage-access-by-user-activation allow-top-navigation" width="100%" height="100%" frameborder="0" referrerpolicy="no-referrer-when-downgrade"></iframe>

<script>
  var getCookie = function (name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  };

// Example
var cookieVal = getCookie('c_is_for'); // returns "turkey"
console.log(`From the parent page, the value of "c_is_for" is ${cookieVal}`);
  </script>
