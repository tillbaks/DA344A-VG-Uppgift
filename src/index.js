import Animations from './Animations.js'
import CatFactsApi from './CatFactsApi.js'

// Constants

const catFactApi = CatFactsApi()
const animate = Animations()
const elNextFact = document.querySelector('.next-fact')
const elFact = document.querySelector('article.fact')
const elButtonCat = document.querySelector('.button.cat')
const elButtonDog = document.querySelector('.button.dog')
const elButtonHorse = document.querySelector('.button.horse')
const state = {
  visibleView: '.no-view-selected.yet'
}

// Functions

async function changeView (selector) {
  await animate.fadeOut(state.visibleView)
  if (selector === 'article.fact') {
    document.querySelector(selector).style.opacity = 1
    await animate.randomText(selector)
  } else {
    await animate.fadeIn(selector)
  }
  state.visibleView = selector
}

async function loadNextFact (initialLoad) {
  if (!initialLoad) animate.slideOutRight('nav.next-fact')
  await changeView('article.loading')
  try {
    const fact = await catFactApi.getRandomFact()
    elFact.innerHTML = fact.text
    await changeView('article.fact')
  } catch (error) {
    console.error(error)
    await changeView('article.error')
  } finally {
    await animate.slideInRight('nav.next-fact')
  }
}

async function setAnimalType (type, element) {
  await animate.wobbleLeft('nav.animal-type-chooser')
  const isSet = element.classList.contains('active')
  const result = {}
  result[type] = !isSet
  if (isSet) {
    element.classList.remove('active')
  } else {
    element.classList.add('active')
  }
  catFactApi.setAnimalTypes(result)
}

// Event Listeners

elNextFact.addEventListener('click', event => loadNextFact())
elButtonCat.addEventListener('click', event => setAnimalType('cat', elButtonCat))
elButtonDog.addEventListener('click', event => setAnimalType('dog', elButtonDog))
elButtonHorse.addEventListener('click', event => setAnimalType('horse', elButtonHorse))

// Set initial state

const initialAnimalTypes = catFactApi.getAnimalTypes()
if (initialAnimalTypes.cat) elButtonCat.classList.add('active')
if (initialAnimalTypes.dog) elButtonDog.classList.add('active')
if (initialAnimalTypes.horse) elButtonHorse.classList.add('active')


// Navigation slides in from sides
animate.slideInPage('header', 'footer', 'nav.animal-type-chooser', 'nav.next-fact')
  .then(() => loadNextFact(true))

window.changeView = (sel) => changeView(sel)