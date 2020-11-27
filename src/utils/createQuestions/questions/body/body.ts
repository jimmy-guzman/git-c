import { Question } from 'inquirer'

export const body = (): Question => {
  return {
    message: 'Provide a longer description of the change:\n ',
    name: 'body',
    type: 'input'
  }
}
