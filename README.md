pskop
=====

Tool to manage pentest scope

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/pskop.svg)](https://npmjs.org/package/pskop)
[![Downloads/week](https://img.shields.io/npm/dw/pskop.svg)](https://npmjs.org/package/pskop)
[![License](https://img.shields.io/npm/l/pskop.svg)](https://github.com/louisvenne/pskop/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g pskop
$ pskop COMMAND
running command...
$ pskop (-v|--version|version)
pskop/0.0.1 darwin-x64 node-v14.12.0
$ pskop --help [COMMAND]
USAGE
  $ pskop COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pskop add`](#pskop-add)
* [`pskop help [COMMAND]`](#pskop-help-command)
* [`pskop resolve`](#pskop-resolve)
* [`pskop show`](#pskop-show)

## `pskop add`

Add an ip/domain/urls

```
USAGE
  $ pskop add

OPTIONS
  -d, --domain=domain  Add an domain
  -h, --help           show CLI help
  -i, --ip=ip          Add an IP
  -s, --scope          Tag entries as scoped

ALIASES
  $ pskop a
  $ pskop update
  $ pskop patch
  $ pskop modify

EXAMPLES
  $ pskop add -i 42.42.42.42
  $ pskop add -d www.example.com
```

_See code: [src/commands/add.ts](https://github.com/louisvenne/pskop/blob/v0.0.1/src/commands/add.ts)_

## `pskop help [COMMAND]`

display help for pskop

```
USAGE
  $ pskop help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `pskop resolve`

Show scope

```
USAGE
  $ pskop resolve

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ pskop r
```

_See code: [src/commands/resolve.ts](https://github.com/louisvenne/pskop/blob/v0.0.1/src/commands/resolve.ts)_

## `pskop show`

Show scope

```
USAGE
  $ pskop show

OPTIONS
  -c, --columns=columns  only show provided columns (comma-separated)
  -f, --filter=filter    filter property by partial string matching, ex: name=foo
  -h, --help             show CLI help
  -o, --output=raw       output in a more machine friendly format
  -s, --scoped           show only scoped rows
  -x, --extended         show extra columns
  --sort=sort            property to sort by (prepend '-' for descending)

ALIASES
  $ pskop s
```

_See code: [src/commands/show.ts](https://github.com/louisvenne/pskop/blob/v0.0.1/src/commands/show.ts)_
<!-- commandsstop -->
