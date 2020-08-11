import { Question } from 'inquirer'

import { GitCConfig } from '../../../../interfaces'
import { fuzzySearchForScope } from './helpers'

export const scope = ({ scopes }: GitCConfig): Question | null => {
  const hasScopes = scopes && scopes.length > 0
  const question = {
    message: 'Select the scope this component affects:',
    name: 'scope',
    source: (_answers: string, input: string): Promise<string[]> => {
      return fuzzySearchForScope(input, scopes)
    },
    type: 'autocomplete'
  }

  return hasScopes ? question : null
}
