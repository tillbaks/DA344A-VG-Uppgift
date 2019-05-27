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
let visibleView = '.no-view-selected.yet'

// Functions

function setLoading (enabled) {
  if (enabled) {
    document.querySelector('.icon.loading').style.display = 'inline'
  } else {
    document.querySelector('.icon.loading').style.display = 'none'
  }
}

async function loadNextFact () {
  await animate.wobbleRight('nav.next-fact')
  setLoading(true)
  try {
    const fact = await catFactApi.getRandomFact()
    await animate.fadeOut(visibleView)
    elFact.innerHTML = fact.text
    visibleView = 'article.fact'
    document.querySelector(visibleView).style.opacity = 1
    await animate.randomText(visibleView)
  } catch (error) {
    console.error(error)
    await animate.fadeOut(visibleView)
    visibleView = 'article.error'
    await animate.fadeIn(visibleView)
  } finally {
    setLoading(false)
  }
}

async function setAnimalType (type, element) {
  animate.wobbleLeft('nav.animal-type-chooser')
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
  .then(() => loadNextFact())
