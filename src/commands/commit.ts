import { Command } from '@oclif/command'
import inquirer from 'inquirer'
import AutoCompletePrompt from 'inquirer-autocomplete-prompt'
import chalk from 'chalk'

import { messages } from '../messages'
import { defaultAnswers, defaultConfig } from '../defaults'
import { getUserConfig } from '../config'
import {
  checkIfStaged,
  createQuestions,
  executeGitMessage,
  MaxInputPrompt
} from '../utils'
import { commitFlags } from '../flags'

inquirer.registerPrompt('autocomplete', AutoCompletePrompt)
inquirer.registerPrompt('maxlength-input', MaxInputPrompt)

const shouldCheckIfStaged = (array: string[] = []): boolean => {
  return !['--add', '-a', '--amend'].some(flag => array.includes(flag))
}

export default class GitCommitCli extends Command {
  static description = messages.description
  static examples = messages.examples
  static flags = commitFlags
  static aliases = ['c']

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

  promptQuestions = async (): Promise<void> => {
    const { flags: cliFlags } = this.parse(GitCommitCli)
    const fQuestions = this.state.config.questions.filter(question => {
      return !Object.keys(cliFlags).includes(question)
    })
    const questions = createQuestions(
      { ...this.state.config, questions: fQuestions },
      this.state.answers
    )
    const answers = await inquirer.prompt(questions)

    this.state.answers = { ...this.state.answers, ...cliFlags, ...answers }
  }

  async run(): Promise<void> {
    const { flags: cliFlags } = this.parse(GitCommitCli)

    await this.start()
    await this.promptQuestions()

    executeGitMessage(this.state, cliFlags.passThrough)
  }

  async catch(error: Error): Promise<void> {
    await this.log(chalk.red(error))
  }
}
