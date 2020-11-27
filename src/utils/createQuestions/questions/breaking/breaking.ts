import chalk from 'chalk'
import { Question } from 'inquirer'

export const breaking = (): Question => {
  return {
    message: `List any breaking changes\n  ${chalk.red('BREAKING CHANGE')}:`,
    name: 'breaking',
    type: 'input'
  }
}
