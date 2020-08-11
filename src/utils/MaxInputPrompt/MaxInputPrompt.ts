/* eslint-disable lines-around-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import chalk from 'chalk'
import InputPrompt from 'inquirer/lib/prompts/input'

// TODO: eliminate @ts-ignore
// TODO: MaxInputPrompt ==> LimitedInputPrompt to account for min chars
export class MaxInputPrompt extends InputPrompt {
  private _leadingLabel: string
  private _leadingLength: number
  private _maxLength: number
  constructor(...args: ConstructorParameters<typeof InputPrompt>) {
    super(...args)
    // @ts-ignore
    if (!this.opt.maxLength) {
      this.throwParamError('maxLength')
    }
    // @ts-ignore
    this._maxLength = this.opt.maxLength

    // @ts-ignore
    if (this.opt.leadingLabel) {
      // @ts-ignore
      if (typeof this.opt.leadingLabel === 'function') {
        // @ts-ignore
        this._leadingLabel = `${this.opt.leadingLabel(this.answers)}`
      } else {
        // @ts-ignore
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
      // @ts-ignore
      this.rl.line = this.rl.line.slice(
        0,
        this._maxLength - this._leadingLength
      )
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
    const isAnswered: boolean = this.status === 'answered'
    const bottomContent: string = error ? chalk.red('>> ') + error : ''
    const message = `${this.getQuestion()}${this.getCharsLeftText()}
  ${this._leadingLabel} ${this.rl.line}`

    this.screen.render(
      isAnswered ? `${this.getQuestion()}${chalk.cyan(this.answer)}` : message,
      bottomContent
    )
  }
}
