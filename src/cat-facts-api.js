const axios = require('axios')

const api = 'https://cat-fact.herokuapp.com'
const factsToRetrieve = 10

let animalTypes = {cat: true, dog: false, horse: false}
let availableFacts = []

/**
 * Updates the facts stored in memory to reduce http requests
 */
async function updateFacts() {
    const result = await axios.get(`${api}/facts/random`, {
        params: {
        amount: factsToRetrieve,
        animal_type: getAnimalTypesCommaSeparated()
        }
    })

    result.data.forEach(fact => availableFacts.push(fact))
}

function clearFacts() {
    availableFacts = []
}

/**
 * @returns {string} Comma separated list of selected animal types, if all are unselected all will be returned so you will never get an empty string
 */
function getAnimalTypesCommaSeparated() {
    let types = Object.entries(animalTypes)
        .filter(([key, value]) => value)
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
async function getRandomFact() {
    if (availableFacts == 0) {
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
function setAnimalTypes({cat, dog, horse}) {
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
}

function getAnimalTypes() {
    return animalTypes
}

module.exports = {
    getRandomFact, 
    setAnimalTypes, 
    getAnimalTypes
}