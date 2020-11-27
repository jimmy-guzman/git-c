import { Question } from 'inquirer'

export const issues = (): Question => ({
  message: 'Issues this commit closes, e.g #123:',
  name: 'issues',
  type: 'input'
})
