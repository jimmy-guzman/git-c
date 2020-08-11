import fuzzy from 'fuzzy'

export const fuzzySearchForScope = (
  substring: string,
  scopes: string[]
): Promise<string[]> => {
  return Promise.resolve(
    fuzzy.filter(substring || '', scopes).map(({ original: scope }) => scope)
  )
}
