import { defaultConfig } from '../../../../defaults'
import { filterSubject, subject } from './subject'

const setupSubject = (config = {}, userAnswers = {}) => {
  return subject(
    { ...defaultConfig, ...config },
    {
      body: 'this an amazing feature, lots of details',
      breaking: 'breaks everything',
      issues: '#123',
      scope: '*',
      subject: 'a cool new feature',
      type: 'feat',
      ...userAnswers
    }
  )
}

const answers = {
  body: 'this an amazing feature, lots of details',
  breaking: 'breaks everything',
  issues: '#123',
  scope: '*',
  subject: 'a cool new feature',
  type: 'feat'
}

describe('maxInputPrompt', () => {
  describe('filterSubject', () => {
    it('should remove trailing dot', () => {
      expect(filterSubject('testing123.')).toBe('testing123')
    })
  })
  describe('subject', () => {
    it('should create default subject', () => {
      const subjectQuestion = setupSubject()

      expect(subjectQuestion).toStrictEqual(
        expect.objectContaining({
          filter: expect.any(Function),
          leadingLabel: expect.any(Function),
          maxLength: 61,
          message: 'Write a short, imperative description of the change:',
          name: 'subject',
          type: 'maxlength-input',
          validate: expect.any(Function)
        })
      )
    })
    describe('leadingLabel', () => {
      it("should create subject's leading label with scope", () => {
        const { leadingLabel } = setupSubject()

        expect(leadingLabel(answers)).toBe('feat(*):')
      })
      it('should create subject leading label with no scope', () => {
        const { leadingLabel } = setupSubject()

        expect(leadingLabel({ ...answers, scope: '' })).toBe('feat:')
      })
      it('should create subject leading label with no scope when there is no type', () => {
        const { leadingLabel } = setupSubject(defaultConfig, { type: '' })

        expect(leadingLabel({ ...answers, scope: '' })).toBe('feat:')
      })
    })
    it('should return maxlength without disable emoji', () => {
      const { maxLength } = setupSubject({ disableEmoji: true })

      expect(maxLength).toBe(64)
    })
    describe('validate', () => {
      it('should return min error message when the length is not valid', () => {
        const { validate } = setupSubject()

        expect(validate('12')).toBe(
          'The subject must have at least 3 characters'
        )
      })
      it('should return true when length is valid', () => {
        const { validate } = setupSubject()

        expect(validate('123')).toBe(true)
      })
    })
  })
})
