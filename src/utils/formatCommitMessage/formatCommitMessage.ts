import { Answers, GitCConfig } from '../../interfaces'

/**
 * wraps string based on width
 */
const wrap = (string: string, width = 72) =>
  string.replace(
    new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, 'g'),
    '$1\n'
  )

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
  const body = wrap(answers.body || '')
  const breaking = wrap(answers.breaking)
  const issues = wrap(answers.issues)

  return createMessage(head, body, breaking, issues, config)
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
}
