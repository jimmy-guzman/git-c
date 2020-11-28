import wrap from 'word-wrap'
import { Answers } from 'inquirer'

import { GitCConfig } from '../../interfaces'

const MAX_LINE_WIDTH = 72
const wrapOptions = {
  indent: '',
  trim: true,
  width: MAX_LINE_WIDTH
}

const createMessage = (
  head: string,
  body: string,
  breaking: string,
  issues: string,
  config: GitCConfig
) => {
  let msg = head

  if (body) {
    msg += `\n\n${body}`
  }

  if (breaking) {
    const breakingEmoji = config.disableEmoji
      ? ''
      : `${config.breakingChangeEmoji} `

    msg += `\n\nBREAKING CHANGE: ${breakingEmoji}${breaking}`
  }

  if (issues) {
    const closedIssueEmoji = config.disableEmoji
      ? ''
      : `${config.closedIssueEmoji} `

    msg += `\n\n${closedIssueEmoji}Closes: ${issues}`
  }

  return msg
}

export const createScope = (answers: Answers): string => {
  const hasScope = answers.scope && answers.scope !== 'none'

  return hasScope ? `(${answers.scope})` : ''
}

export const formatCommitMessage = (
  config: GitCConfig,
  answers: Answers
): string => {
  const hasEmoji = !config.disableEmoji || config.details[answers.type].emoji
  const emojiPrefix = hasEmoji ? `${config.details[answers.type].emoji} ` : ''
  const scope = createScope(answers)
  const head = `${answers.type + scope}: ${emojiPrefix}${answers.subject}`
  const body = wrap(answers.body || '', wrapOptions)
  const breaking = wrap(answers.breaking, wrapOptions)
  const issues = wrap(answers.issues, wrapOptions)

  return createMessage(head, body, breaking, issues, config)
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
}
