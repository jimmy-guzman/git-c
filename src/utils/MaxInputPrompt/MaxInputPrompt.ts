import chalk from 'chalk'
import { Answers, Question } from 'inquirer'
import InputPrompt from 'inquirer/lib/prompts/input'
import { Interface as ReadLineInterface } from 'readline'

interface MaxInputQuestion extends Question {
  maxLength: number
  leadingLabel: string | ((answers: Answers) => void)
}

type MaxInputPromptType = new (
  question: MaxInputQuestion,
  readLine: ReadLineInterface,
  answers: Answers
) => InputPrompt<MaxInputQuestion>

export class MaxInputPrompt extends InputPrompt<MaxInputQuestion> {
  private _leadingLabel: string
  private _leadingLength: number
  private _maxLength: number
  constructor(...args: ConstructorParameters<MaxInputPromptType>) {
    super(...args)

    if (!this.opt.maxLength) {
      this.throwParamError('maxLength')
    }

    this._maxLength = this.opt.maxLength

    if (this.opt.leadingLabel) {
      if (typeof this.opt.leadingLabel === 'function') {
        this._leadingLabel = `${this.opt.leadingLabel(this.answers)}`
      } else {
        this._leadingLabel = `${this.opt.leadingLabel}`
      }
    } else {
      this._leadingLabel = ''
    }

    this._leadingLength = this._leadingLabel.length
  }

  remainingChar(): number {
    return this._maxLength - this._leadingLength - this.rl.line.length
  }

  onKeypress(): void {
    if (this.rl.line.length > this._maxLength - this._leadingLength) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.rl.line = this.rl.line.slice(
        0,
        this._maxLength - this._leadingLength
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.rl.cursor--
    }

    this.render()
  }

  getCharsLeftText(): string {
    const chars = this.remainingChar()
    const percentRemaining = (chars / this._maxLength) * 100
    const charsLeftIndicator = `${chars} chars left`

    if (percentRemaining > 25) {
      return chalk.green(charsLeftIndicator)
    }
    if (percentRemaining > 5) {
      return chalk.yellow(charsLeftIndicator)
    }
    return chalk.red(charsLeftIndicator)
  }

  render(error?: string): void {
    const isAnswered = this.status === 'answered'
    const bottomContent = error ? chalk.red('>> ') + error : ''
    const message = `${this.getQuestion()}${this.getCharsLeftText()}\n${
      this._leadingLabel
    } ${this.rl.line}`

    this.screen.render(
      isAnswered ? `${this.getQuestion()}${chalk.cyan(this.answer)}` : message,
      bottomContent
    )
  }
}
