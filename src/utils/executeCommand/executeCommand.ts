import shellescape from 'any-shell-escape'
import chalk from 'chalk'
import { spawn, exec } from 'child_process'

import { Answers, GitCConfig } from '../../interfaces'
import { formatCommitMessage } from '../formatCommitMessage'

const executeCommand = (
  command: string,
  args: string[] = [],
  env = process.env
): void => {
  const formattedCommand = shellescape([command, ...args])
  const proc = spawn(formattedCommand, [], {
    env,
    shell: true,
    stdio: [0, 1, 2]
  })

  proc.on('close', code => {
    process.exit(code)
  })
}

export const executeGitMessage = (
  { config, answers }: { config: GitCConfig; answers: Answers },
  passThrough: string[] = []
): void => {
  const message = formatCommitMessage(config, answers)

  return executeCommand('git', ['commit', '-m', message, ...passThrough])
}

/**
 * Determines wether or not files are staged.
 */
export const checkIfStaged = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec('git --no-pager diff --cached --quiet --exit-code', error => {
      if (error) {
        resolve()
      }
      reject(
        new Error(
          `No files staged! \n\n${chalk.blue(
            'Tip: You can use "git-c c -p --add" to replicate git -am'
          )}`
        )
      )
    })
  })
}
