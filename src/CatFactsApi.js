import axios from 'axios'
export default CatFactsApi

function CatFactsApi (localStorageName = 'catFactsApi.animalTypes', factsToRetrieve = 10) {
  // API needs proxy since cat-fact api does not allow CORS
  const api = 'https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com'
  let availableFacts = []
  let animalTypes = JSON.parse(window.localStorage.getItem(localStorageName))
  if (animalTypes === null) {
    animalTypes = { cat: true, dog: false, horse: false }
  }

  /**
   * Updates the facts stored in memory to reduce http requests
   */
  async function updateFacts () {
    const result = await axios.get(`${api}/facts/random`, {
      params: {
        amount: factsToRetrieve,
        animal_type: getAnimalTypesCommaSeparated()
      }
    })

    result.data.forEach(fact => availableFacts.push(fact))
  }

  function clearFacts () {
    availableFacts = []
  }

  /**
   * @returns {string} Comma separated list of selected animal types, if all are unselected all will be returned so you will never get an empty string
   */
  function getAnimalTypesCommaSeparated () {
    let types = Object.entries(animalTypes)
      .reduce((acc, [key, value]) => { 
        if (value)  acc.push(key)
        return acc
      }, [])
      .join(',')

    if (types === '') {
      types = Object.keys(animalTypes).join(',')
    }

    return types
  }

  /**
   * Retrieves a random fact
   *
   * @returns {Object} A fact object
   */
  async function getRandomFact () {
    if (availableFacts.length === 0) {
      await updateFacts()
    }

    return availableFacts.pop()
  }

  /**
   * Select which animal types are wanted when retrieving random facts
   *
   * @param {Object}  object          Object containing animal types
   * @param {boolean} object.cat      Facts about cats
   * @param {boolean} object.dog      Facts about dogs
   * @param {boolean} object.horse    Facts about horses
   */
  function setAnimalTypes ({ cat, dog, horse }) {
    // Clear so new animal types are honored when retrieving facts
    clearFacts()

    if (cat !== undefined) {
      animalTypes.cat = cat
    }
    if (dog !== undefined) {
      animalTypes.dog = dog
    }
    if (horse !== undefined) {
      animalTypes.horse = horse
    }

    window.localStorage.setItem(localStorageName, JSON.stringify(animalTypes))
  }

  function getAnimalTypes () {
    return animalTypes
  }

  return {
    getRandomFact,
    setAnimalTypes,
    getAnimalTypes
  }
}
