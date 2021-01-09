import { GitCConfig } from '../interfaces'
import { validateUserConfig } from '../utils'
import { getCommitlintConfig, loadConfig } from './helpers'

export const getUserConfig = async (
  config: GitCConfig
): Promise<GitCConfig | undefined> => {
  const loaded = await loadConfig<GitCConfig>('gitc')

  if (loaded) {
    const isValid = await validateUserConfig(loaded.config)

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
