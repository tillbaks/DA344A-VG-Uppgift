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
      dropDown(`${selector} .letter`)
    } else if (rand === 1) {
      zoomOut(`${selector} .letter`)
    } else {
      typewriter(`${selector} .letter`)
    }
  }

  function typewriter(selector) {
    anime.timeline({ loop: false })
      .add({
        targets: selector,
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 700,
        offset: '-=500',
        delay: function (el, i) {
          return 50 * i
        }
      })
  }

  function zoomOut(selector) {
    anime.timeline({loop: false})
      .add({
        targets: selector,
        opacity: [0,1],
        scale: [0.1, 1],
        duration: 500,
        offset: '-=500',
        easing: "easeOutExpo"
      })
  }

  function dropDown(selector) {
    anime.timeline({loop: false})
      .add({
        targets: selector,
        translateY: [1000,0],
        easing: "easeOutExpo",
        duration: 500,
        offset: '-=500',
        delay: function(el, i) {
          return 50 * i;
        }
      })
  }

  return {
    randomText,
    typewriter
  }
}