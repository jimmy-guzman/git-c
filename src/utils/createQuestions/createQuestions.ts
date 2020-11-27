import { Question } from 'inquirer'

import { Answers, GitCConfig } from '../../interfaces'
import { body, breaking, issues, scope, subject, type } from './questions'

type CreatedQuestion = (config: GitCConfig, answers: Answers) => Question | null

const questionCreator: Record<string, CreatedQuestion> = {
  body,
  breaking,
  issues,
  scope,
  subject,
  type
}

const notEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined
}

export const createQuestions = (
  config: GitCConfig,
  answers: Answers
): Question[] => {
  const questions = config.questions.map(name => {
    return questionCreator[name](config, answers)
  })

  return questions.filter(notEmpty)
}
