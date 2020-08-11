import fuzzy from 'fuzzy'
import Choice from 'inquirer/lib/objects/choice'

import { GitCConfig } from '../../../../interfaces'

const typeToListItem = (
  { details, disableEmoji }: GitCConfig,
  type: string
): Omit<Choice, 'disabled'> => {
  const { description, emoji } = details[type]
  const prefix = emoji && !disableEmoji ? `${emoji}  ` : ''

  return {
    name: prefix + `${type}:`.padEnd(12, ' ') + description,
    value: type,
    short: disableEmoji ? type : `${emoji} ${type}`
  }
}

export const fuzzySearchForType = (
  substring: string,
  config: GitCConfig
): Promise<Omit<Choice, 'disabled'>[]> => {
  return Promise.resolve(
    fuzzy.filter(substring || '', config.types).map(({ original }) => {
      return typeToListItem(config, original)
    })
  )
}
