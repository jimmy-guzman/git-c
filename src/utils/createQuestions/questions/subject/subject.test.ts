import { filterSubject } from './subject'

describe('maxInputPrompt', () => {
  describe('filterSubject', () => {
    it('should remove trailing dot', () => {
      expect(filterSubject('testing123.')).toBe('testing123')
    })
  })
})
