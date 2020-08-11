import { Question } from 'inquirer'

import { Answers, GitCConfig } from '../../../../interfaces'

export const filterSubject = (input: string): string => {
  return input.trim().replace(/\.$/, '')
}

export const subject = (
  { minMessageLength, maxMessageLength, disableEmoji }: GitCConfig,
  userAnswers: Answers
): Question => {
  const minTitleLengthErrorMessage = `The subject must have at least ${minMessageLength} characters`
  const question = {
    filter: filterSubject,
    leadingLabel: (answers: Answers) => {
      const hasScope = answers.scope && answers.scope !== 'none'
      const scope = hasScope ? `(${answers.scope})` : ''

      return `${userAnswers.type || answers.type}${scope}:`
    },
    maxLength: maxMessageLength - (disableEmoji ? 0 : 3),
    message: 'Write a short, imperative description of the change:',
    name: 'subject',
    type: 'maxlength-input',
    validate: (input: string): string | true => {
      return input.length >= minMessageLength || minTitleLengthErrorMessage
    }
  }

  return question
}
