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
pskop/0.0.3 darwin-x64 node-v15.0.1
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
* [`pskop import`](#pskop-import)
* [`pskop resolve`](#pskop-resolve)
* [`pskop show`](#pskop-show)

## `pskop add`

Add/update a domain and/or IP to the database.

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

_See code: [src/commands/add.ts](https://github.com/louisvenne/pskop/blob/v0.0.3/src/commands/add.ts)_

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

## `pskop import`

Import IP and/or domains from file

```
USAGE
  $ pskop import

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ pskop i

EXAMPLES
  $ pskop import scope.txt
  $ pskop import domains/*
  $ pskop import sublister.output.txt
  $ pskop import scans/*
```

_See code: [src/commands/import.ts](https://github.com/louisvenne/pskop/blob/v0.0.3/src/commands/import.ts)_

## `pskop resolve`

Resolves all domains to IP and reverse them afterwards

```
USAGE
  $ pskop resolve

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ pskop r
```

_See code: [src/commands/resolve.ts](https://github.com/louisvenne/pskop/blob/v0.0.3/src/commands/resolve.ts)_

## `pskop show`

Display scope in a beautiful ASCII table

```
USAGE
  $ pskop show

OPTIONS
  -c, --columns=columns  Only show provided columns (comma-separated)
  -f, --filter=filter    Filter property by partial string matching, ex: name=foo
  -h, --help             show CLI help
  -o, --output=raw       Output in a more machine friendly format (for 'raw' format, you must select only one column)
  -s, --scoped           Show only scoped rows
  -x, --extended         Show extra columns
  --sort=sort            Property to sort by (prepend '-' for descending)

ALIASES
  $ pskop s
```

_See code: [src/commands/show.ts](https://github.com/louisvenne/pskop/blob/v0.0.3/src/commands/show.ts)_
<!-- commandsstop -->
