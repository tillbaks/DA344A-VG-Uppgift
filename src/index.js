import Animations from './Animations.js'
import CatFactsApi from './CatFactsApi.js'

// Constants

const catFactApi = CatFactsApi()
const elNextFact = document.querySelector('.next-fact')
const elFact = document.querySelector('article.fact')
const elLoading = document.querySelector('article.loading')
const elError = document.querySelector('article.error')
const elButtonCat = document.querySelector('.button.cat')
const elButtonDog = document.querySelector('.button.dog')
const elButtonHorse = document.querySelector('.button.horse')

// Functions

function showView (element) {
  elFact.classList.add('hidden')
  elError.classList.add('hidden')
  elLoading.classList.add('hidden')
  element.classList.remove('hidden')
}

async function loadNextFact () {
  showView(elLoading)
  try {
    const fact = await catFactApi.getRandomFact()
    elFact.innerHTML = fact.text
    showView(elFact)
    Animations().randomText('article.fact')
  } catch (error) {
    console.error(error)
    showView(elError)
  }
}

function setAnimalType (type, element) {
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

elNextFact.addEventListener('click', event => loadNextFact(elFact))
elButtonCat.addEventListener('click', event => setAnimalType('cat', elButtonCat))
elButtonDog.addEventListener('click', event => setAnimalType('dog', elButtonDog))
elButtonHorse.addEventListener('click', event => setAnimalType('horse', elButtonHorse))

// Set initial state

loadNextFact(elFact)
const initialAnimalTypes = catFactApi.getAnimalTypes()
if (initialAnimalTypes.cat) elButtonCat.classList.add('active')
if (initialAnimalTypes.dog) elButtonDog.classList.add('active')
if (initialAnimalTypes.horse) elButtonHorse.classList.add('active')
