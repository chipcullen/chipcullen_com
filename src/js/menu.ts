import { trapFocus, visibleLinks } from './helpers/trapFocus'
import bodyScrollLock from './helpers/bodyScrollLock'

const menuOuter = document.querySelector('[data-menu]') as HTMLElement;
const menuBtn = menuOuter?.querySelector('[data-btn="menu"]') as HTMLButtonElement;
const menuWrapper = menuOuter?.querySelector('[data-menu-wrapper]') as HTMLElement;
const homeLink = menuOuter?.querySelector('[data-home-link]') as HTMLAnchorElement;
const body = document.querySelector('body') as HTMLBodyElement;
const main = document.querySelector('main') as HTMLElement;

const open = () => {
  const firstMenuLink = visibleLinks(menuWrapper)[0]

  menuWrapper.hidden = false
  menuBtn.setAttribute('aria-expanded', 'true')
  menuBtn.innerText = 'Close'
  firstMenuLink.focus()
  bodyScrollLock(true)

  setTimeout(() => {
    menuWrapper.classList.add('is-visible')
    menuOuter.classList.add('is-open')
    body.classList.add('menu-is-open')
    main.setAttribute('inert', 'true')
  }, 10)
}

const close = () => {
  menuWrapper.classList.remove('is-visible')
  menuOuter.classList.remove('is-open')
  body.classList.remove('menu-is-open')
  main.removeAttribute('inert')

  setTimeout(() => {
    menuWrapper.hidden = true
    menuBtn.setAttribute('aria-expanded', 'false')
    menuBtn.innerText = 'Menu'
    bodyScrollLock(false)
  }, 250)
}

const toggleMenu = (e) => {
  if (menuWrapper.hidden) {
    open()
  } else {
    close()
  }
}

const trapFocusInMenu = (e) => {
  trapFocus(e, menuOuter)

  /* if Esc key pressed */
  if (e.keyCode === 27) {
    close()
  }
}

const menu = () => {
  menuBtn.hidden = false
  menuWrapper.hidden = true
  homeLink.hidden = false
  menuWrapper.classList.add('js-menu')
  menuBtn.addEventListener('click', toggleMenu)
  menuWrapper.addEventListener('keydown', trapFocusInMenu)
}

export default menu;
