import { faker } from '@faker-js/faker'

module.exports.generate = () => {
  const data = {
    name: faker.word.words(2),
    anotherName: faker.word.words(2),
    description: faker.lorem.words(5)
  }
  return data
}
