import { faker } from '@faker-js/faker'

module.exports.generate = () => {
  const data = {
    name: faker.word.words(2),
    anotherName: faker.word.words(2),
    description: faker.lorem.words(5),
    email: faker.internet.email().toLocaleLowerCase(),
    password: faker.internet.password(),
    userName: faker.word.words(1)
  }
  return data
}
