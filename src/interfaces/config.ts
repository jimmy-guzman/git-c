import { Details } from './details'
import { Questions } from './questions'

export interface GitCConfig {
  details: Details
  breakingChangeEmoji: string
  closedIssueEmoji: string
  scopes: string[]
  maxMessageLength: number
  minMessageLength: number
  questions: Questions[]
  disableEmoji: boolean
  useCommitlintConfig: boolean
  types: string[]
}

export type UserConfig = Partial<GitCConfig>
