/**
 * Powered by @louisvenne
 */


import  { Command, flags }                from '@oclif/command';
import  chalk                             from 'chalk';
import  fs, { promises as pfs }           from 'fs';
import  isValidIP                         from 'is-ip';
import  isValidDomain                     from 'is-valid-domain';
import  readline, { Interface }           from 'readline';

import  { database }                      from '../database';

import  Add                               from './add';


enum FileType {
    NONE = 'NONE',
    IP = 'IP',
    DOMAIN = 'DOMAIN',
    NMAP = 'NMAP'
}


class Import extends Command {


    static aliases = ['i'];

    static description = 'Import IP and/or domains from file';

    static examples = [
        '$ pskop import scope.txt',
        '$ pskop import domains/*',
        '$ pskop import sublister.output.txt',
        '$ pskop import scans/*'
    ];

    static flags = {
        help: flags.help({ char: 'h' })
    };




    async run() : Promise<void> {
        try {
            await database.init();
            for (const path of this.argv) await this.processFile(path);
        } catch (err) {
            this.error(err);
        }
    }


    async processFile(path: string) : Promise<void> {
        try {
            console.log(`[+] File path: ${path}`);

            const stats = await pfs.stat(path);
            if (!stats.isFile()) throw new Error(`[-] '${path}' is not a file.\n`);

            const type = await this.determineFileType(path);
            console.log(`[+] File type detected: ${type}`);

            if (type === FileType.DOMAIN || type === FileType.IP) await this.importBasicFile(path, type);
            else console.error(chalk.red('[-] File type not supported.'));

            process.stdout.write('\n');

        } catch (err) {
            console.error(chalk.red(`[-] ${err.message}`));
        }
    }


    async determineFileType(path: string) : Promise<FileType> {
        const stream = fs.createReadStream(path);
        const lines = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        let firstline = true;
        // @ts-ignore
        for await (const line of lines) {
            if (firstline && isValidIP(line)) return FileType.IP;
            if (firstline && isValidDomain(line)) return FileType.DOMAIN;
            if (line.includes('<!DOCTYPE nmaprun>')) return FileType.NMAP;
            firstline = false;
        }

        return FileType.NONE;
    }


    async importBasicFile(path: string, type: string) : Promise<void> {
        const stream = fs.createReadStream(path);
        const lines: Interface = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        // @ts-ignore
        for await (const line of lines) {
            if (type === FileType.DOMAIN) await Add.addDomain(line);
            if (type === FileType.IP) await Add.addIP(line);
        }
    }

}


export default Import;
