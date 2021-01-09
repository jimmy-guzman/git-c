import { PromptObject } from 'prompts'

import { Answers, GitCConfig, Questions } from '../interfaces'
import { body, breaking, issues, scope, subject, type } from '../prompts'

type CreatedQuestion = (
  config: GitCConfig,
  answers: Answers
) => PromptObject | null

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
  { config, answers }: { config: GitCConfig; answers: Answers },
  questionSet: Questions[]
): PromptObject[] => {
  return config.questions
    .filter(question => questionSet.includes(question))
    .map(name => questionCreator[name](config, answers))
    .filter(notEmpty)
}
