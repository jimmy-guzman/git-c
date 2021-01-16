import { Command } from '@oclif/command'
import prompts from 'prompts'
import kleur from 'kleur'

import { defaultAnswers, defaultConfig } from '../defaults'
import { getUserConfig } from '../config'
import { checkIfStaged, createQuestions, executeGitMessage } from '../utils'
import { commitFlags } from '../flags'
import { messages } from '../messages'
import { Answers, Questions } from '../interfaces'

const shouldCheckIfStaged = (array: string[] = []): boolean => {
  return !['--add', '-a', '--amend'].some(flag => array.includes(flag))
}

export default class GitCommitCli extends Command {
  static description = messages.description
  static examples = messages.examples
  static flags = commitFlags
  static aliases = ['', 'c']

  state = { config: defaultConfig, answers: defaultAnswers }

  start = async (): Promise<void> => {
    const { flags: cliFlags } = this.parse(GitCommitCli)
    const loadedUserConfig = await getUserConfig(this.state.config)

    if (loadedUserConfig) {
      this.state.config = loadedUserConfig
    }

    if (shouldCheckIfStaged(cliFlags.passThrough)) {
      await checkIfStaged()
    }
  }

  customPrompt = async (
    customPrompts: Questions[],
    userAnswers?: Answers
  ): Promise<Answers> => {
    return prompts(
      createQuestions(
        {
          ...this.state,
          answers: { ...this.state.answers, ...userAnswers }
        },
        customPrompts
      ),
      {
        onCancel: () => {
          process.exit(1)
        }
      }
    ) as Promise<Answers>
  }

  promptQuestions = async (): Promise<void> => {
    const { flags: cliFlags } = this.parse(GitCommitCli)
    const [first, second, ...rest] = defaultConfig.questions

    prompts.override(cliFlags)

    const firstAnswers = await this.customPrompt([first, second])
    const secondAnswers = await this.customPrompt(rest, firstAnswers)

    this.state.answers = {
      ...this.state.answers,
      ...firstAnswers,
      ...secondAnswers
    }
  }

  async run(): Promise<void> {
    const { flags: cliFlags } = this.parse(GitCommitCli)

    await this.start()
    await this.promptQuestions()

    executeGitMessage(this.state, cliFlags.passThrough)
  }

  async catch(error: Error): Promise<void> {
    await this.log(kleur.red(String(error)))
  }
}
