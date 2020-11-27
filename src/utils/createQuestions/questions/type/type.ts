import { Question } from 'inquirer'
import Choice from 'inquirer/lib/objects/choice'

import { GitCConfig } from '../../../../interfaces'
import { fuzzySearchForType } from './helpers'

export const type = (config: GitCConfig): Question => {
  const question = {
    message: "Select the type of change that you're committing:",
    name: 'type',
    source: (
      _answers: string,
      input: string
    ): Promise<Omit<Choice, 'disabled'>[]> => {
      return fuzzySearchForType(input, config)
    },
    type: 'autocomplete'
  }

  return question
}
