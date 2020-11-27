import { cosmiconfig } from 'cosmiconfig'
import path from 'path'

import * as utils from '../utils'
import { CommitlintConfig, CommitlintOverrides } from './config.types'

interface LoadConfigResult<T> {
  config: T
  filepath: string
  isEmpty?: boolean
}

export const loadConfig = async <T>(
  configName: string,
  configPath?: string,
  cwd = process.cwd()
): Promise<LoadConfigResult<T> | null> => {
  const explorer = cosmiconfig(configName)
  const explicitPath = configPath ? path.resolve(cwd, configPath) : undefined
  const explore = explicitPath ? explorer.load : explorer.search
  const searchPath = explicitPath ? explicitPath : cwd
  const local = await explore(searchPath)

  return local ? local : null
}

const cleanObject = (object: Record<string, unknown>) => {
  return Object.entries(object).reduce<Record<string, unknown>>(
    (currentObject, [key, value]) => {
      const isEmpty = value === null || value === undefined

      return isEmpty
        ? currentObject
        : ((currentObject[key] = value), currentObject)
    },
    {}
  )
}

const getCommitLintOverrides = (
  config: CommitlintConfig
): CommitlintOverrides => {
  return cleanObject({
    scopes: config.rules?.['scope-enum']?.[2],
    types: config.rules?.['type-enum']?.[2],
    maxMessageLength: config?.rules?.['header-max-length']?.[2],
    minMessageLength: config?.rules?.['header-min-length']?.[2]
  })
}

export const getCommitlintConfig = async (): Promise<
  CommitlintOverrides | undefined
> => {
  const commitlint = await loadConfig<CommitlintConfig>('commitlint')

  if (commitlint) {
    const commitlintOverrides = getCommitLintOverrides(commitlint.config)

    const isValid = await utils.validateUserConfig(commitlintOverrides)

    return isValid ? commitlintOverrides : undefined
  }

  return undefined
}
