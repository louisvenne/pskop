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
pskop/0.0.0 darwin-x64 node-v14.12.0
$ pskop --help [COMMAND]
USAGE
  $ pskop COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`pskop hello [FILE]`](#pskop-hello-file)
* [`pskop help [COMMAND]`](#pskop-help-command)

## `pskop hello [FILE]`

describe the command here

```
USAGE
  $ pskop hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ pskop hello
  hello world from ./src/add.ts!
```

_See code: [src/commands/add.ts](https://github.com/louisvenne/pskop/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
