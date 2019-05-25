import anime from 'animejs'
export default Animations

function Animations() {

  /**
   * Chooses a random animation and
   * executes it on the text inside the provided element
   * 
   * @param {String} selector Selector to find element that contains the text that should be animated
   */
  function randomText(selector) {
    const element = document.querySelector(selector)
    element.innerHTML = element.textContent.replace(/([^\s]+|\w)/g, '<span class="letter">$&</span>')
    const rand = Math.floor((Math.random() * 3))
    if (rand === 0) {
      return flowUp(`${selector} .letter`)
    }
    if (rand === 1) {
      return zoomOut(`${selector} .letter`)
    }
    return typewriter(`${selector} .letter`)
  }

  function typewriter(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 500,
          delay: anime.stagger(50),
          complete: resolve
        })
    })
  }

  function zoomOut(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          opacity: [0, 1],
          scale: [0.1, 1],
          easing: "easeOutExpo",
          duration: 500,
          delay: anime.stagger(50),
          complete: resolve
        })
    })
  }

  function flowUp(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          translateY: [1000, 0],
          easing: "easeOutExpo",
          duration: 500,
          delay: anime.stagger(50),
          complete: resolve
        })
    })
  }

  function slideInPage(fromTopSelector, fromBottomSelector, fromLeftSelector, fromRightSelector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: fromTopSelector,
          translateY: [-1000, 0],
          easing: "easeOutExpo",
          duration: 500
        })
        .add({
          targets: fromBottomSelector,
          translateY: [1000, 0],
          easing: "easeOutExpo",
          duration: 500
        }, '-=500')
        .add({
          targets: fromLeftSelector,
          translateX: [-1000, 0],
          easing: "easeOutExpo",
          duration: 750,
          complete: resolve
        })
    })
  }

  function wobbleLeft(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          translateX: [0, -20],
          easing: "linear",
          duration: 100
        })
        .add({
          targets: selector,
          translateX: [-20, 0],
          easing: "linear",
          duration: 100,
          complete: resolve
        })
    })
  }

  function slideOutRight(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          translateX: [0, 500],
          opacity: [1, 0],
          easing: "linear",
          duration: 500,
          complete: resolve
        })
    })
  }

  function slideInRight(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          translateX: [500, 0],
          opacity: [0, 1],
          easing: "linear",
          duration: 500,
          complete: resolve
        })
    })
  }

  function fadeIn(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          opacity: [0, 1],
          easing: "linear",
          duration: 500,
          delay: anime.stagger(50),
          complete: resolve
        })
    })
  }

  function fadeOut(selector) {
    return new Promise((resolve) => {
      anime.timeline({ loop: false })
        .add({
          targets: selector,
          opacity: [1, 0],
          easing: "linear",
          duration: 250,
          delay: anime.stagger(50),
          complete: resolve
        })
    })
  }

  return {
    randomText,
    typewriter,
    zoomOut,
    flowUp,
    slideInPage,
    wobbleLeft,
    slideOutRight,
    slideInRight,
    fadeIn,
    fadeOut
  }
}