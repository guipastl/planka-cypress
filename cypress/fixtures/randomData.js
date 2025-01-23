import { faker } from '@faker-js/faker'

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

module.exports.generate = () => {
  const data = {
    name: faker.word.words(2),
    anotherName: faker.word.words(2),
    description: faker.lorem.words(5),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
    userName: faker.word.words(1),
    position: getRandomIntInclusive(100000, 999999)
  }
  return data
}
