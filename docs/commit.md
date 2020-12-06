# `git-c commit`

interactive conventional commit cli

- [`git-c commit`](#git-c-commit)

## `git-c commit`

interactive conventional commit cli

```
USAGE
  $ git-c commit

OPTIONS
  -b, --breaking=breaking        skip "breaking" question and provide your own "breaking" message
  -d, --body=body                skip "body" question and provide your own "body" message
  -h, --help                     show CLI help
  -i, --issue=issue              skip "issue" question and provide your own "issue" message
  -m, --subject=subject          skip "subject" question and provide your own "subject" message
  -p, --passThrough=passThrough  subsequent command line args passed through to "git"
  -s, --scope=scope              skip "scope" question and provide your own "scope" message
  -t, --type=type                skip "type" question and provide your own "type" message

ALIASES
  $ git-c c

EXAMPLES
  git-c commit
  git-c c
  git-c c -p --amend
  git-c c -m "added cool new feature" -t "feat" -s "amazing"
```

_See code: [src/commands/commit.ts](https://github.com/comparto/git-c/blob/v1.0.2/src/commands/commit.ts)_
