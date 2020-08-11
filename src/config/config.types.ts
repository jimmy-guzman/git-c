export interface CommitlintOverrides {
  scopes?: string[]
  types?: string[]
  maxMessageLength?: number
  minMessageLength?: number
}

export interface CommitlintConfig {
  rules: {
    'scope-enum'?: string[]
    'type-enum'?: string[]
    'header-max-length'?: string[]
    'header-min-length'?: string[]
  }
}
