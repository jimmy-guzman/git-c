import { GitCConfig } from '../interfaces'
import * as utils from '../utils'
import { getCommitlintConfig, loadConfig } from './config.helpers'

export const getUserConfig = async (
  config: GitCConfig
): Promise<GitCConfig | undefined> => {
  const loaded = await loadConfig<GitCConfig>('gitc')

  if (loaded) {
    const isValid = await utils.validateUserConfig(loaded.config)

    if (isValid) {
      if (loaded.config.useCommitlintConfig) {
        const commitlintConfig = await getCommitlintConfig()

        return { ...config, ...loaded.config, ...commitlintConfig }
      }

      return { ...config, ...loaded.config }
    }
  }
  return undefined
}
