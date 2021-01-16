![actions][actions-badge]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![Code Coverage][coverage-badge]][coverage]
[![semantic-release][semantic-release-badge]][semantic-release]
[![code style: prettier][prettier-badge]][prettier]

# @comparto/git-c

Interactive conventional commit cli, inspired by [git-cz](https://github.com/streamich/git-cz)

# Usage

  <!-- usage -->

```sh-session
$ npm install -g @comparto/git-c
$ git-c COMMAND
running command...
$ git-c (-v|--version|version)
@comparto/git-c/2.1.0 linux-x64 node-v14.15.4
$ git-c --help [COMMAND]
USAGE
  $ git-c COMMAND
...
```

<!-- usagestop -->

# Command Topics

- [`git-c commit`](docs//commit.md) - interactive conventional commit cli
- [`git-c help`](docs//help.md) - display help for git-c

<!-- commandsstop -->

# Configuration

By default `git-c` comes ready to run out of the box.

> This supports cosmiconfig, so you can customize with either a `gitc` key in your package.json, or just create a `.gitcrc.json`, `.gitcrc.yml`, `gitc.config.js`, etc. in your project directory.

## Options

### Breaking Change Emoji

```
feat: 🎸 dope new feature

BREAKING CHANGE: 🧨 breaks stuff
```

```yml
breakingChangeEmoji: '🧨'
```

### Closed Issue Emoji

```
fix: 🐛 resolved nasty bug

🏁 Closes: #123
```

```yml
closedIssueEmoji: '🏁'
```

### Disable Emoji

Disable all emojis, overrides `breakingChangeEmoji`, `closedIssueEmoji` and `emoji` options

```yml
disableEmoji: false
```

### Details

Allows you to further configure cli and git message output based on `type`.
_Default emojis follow standards set by [gitmoji][gitmoji]_

```yml
details:
  chore:
    description: Other changes that don't modify src or test files
    emoji: '🤖'
  ci:
    description: Changes to CI configuration files and scripts
    emoji: '👷'
  docs:
    description: Add or update documentation.
    emoji: '📝'
  feat:
    description: A new feature
    emoji: '🎸'
  fix:
    description: Fix a bug.
    emoji: '🐛'
  perf:
    description: Improve performance.
    emoji: '⚡️'
  refactor:
    description: Refactor code.
    emoji: '♻️'
  release:
    description: Deploy stuff.
    emoji: '🚀'
  revert:
    description: Revert changes.
    emoji: '⏪'
  style:
    description: Improve structure / format of the code.
    emoji: '🎨'
  test:
    description: Add or update tests.
    emoji: '✅'
```

### Max Message Length

```yml
maxMessageLength: 64
```

### Min Message Length

```yml
minMessageLength: 3
```

### Questions

Allows you to toggle questions.

```yml
questions:
  - type # Select the type of change that you're committing?
  - scope # Select the scope this component affects?
  - subject # Write a short, imperative description of the change?
  - body # Provide a longer description of the change?
  - breaking # List any breaking changes
  - issues # Issues this commit closes, e.g #123
```

_`scope` question will not be turned if there's no scopes_

### Scopes

Allows you to provide list of `scopes` to choose from.

```yml
scopes: []
```

_Will not be in effect if `scope` question is not turned on._

### Types

Allows you to provide list of `types` to choose from. Can be further configured through `Details`.

```yml
types:
  - chore
  - docs
  - feat
  - fix
  - refactor
  - test
```

### Commitlint

Will leverage [Commitlint's configuration](https://commitlint.js.org/#/reference-configuration) instead for options:

- `types` correlates to `rules[type-enum][2]`
- `scopes` correlates to `rules[scope-enum][2]`
- `maxMessageLength` correlates to `rules[header-max-length][2]`
- `minMessageLength` correlates to `rules[header-min-length][2]`

```yml
useCommitlintConfig: false
```

[actions-badge]: https://img.shields.io/github/workflow/status/comparto/git-c/Release?label=actions&logo=github-actions&style=flat-square
[version-badge]: https://img.shields.io/npm/v/@comparto/git-c.svg?logo=npm&style=flat-square
[package]: https://www.npmjs.com/package/@comparto/git-c
[downloads-badge]: https://img.shields.io/npm/dm/@comparto/git-c.svg?logo=npm&style=flat-square
[npmtrends]: http://www.npmtrends.com/@comparto/git-c
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/comparto/git-c.svg?style=flat-square
[coverage]: https://codecov.io/github/comparto/git-c
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/prettier/prettier
[gitmoji]: https://gitmoji.carloscuesta.me/
