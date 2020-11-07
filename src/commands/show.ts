/**
 * Powered by @louisvenne
 */


import  { Command, flags }            from '@oclif/command';
import chalk                          from 'chalk';
import  Table                         from 'cli-table3';
import  { cli }                       from 'cli-ux';
import Model, { FindOptions }         from 'sequelize/types/lib/model';

import  { Domain }                    from '../database/models/domain';
import  { IP }                        from '../database/models/ip';
import  { database }                  from '../database';


interface IFlags {
    help?: void,
    columns?: string | undefined,
    sort?: string,
    scoped?: boolean,
    filter?: string | undefined,
    extended?: boolean,
    output?: string,
}


interface Row {
    scope?: boolean
    ip?: string,
    domains?: string
}

class Show extends Command {

    static aliases = ['s'];

    static description = 'Display scope in a beautiful ASCII table';


    static flags = {
        help: flags.help({ char: 'h' }),
        columns: flags.string({ char: 'c', exclusive: ['additional'], description: 'Only show provided columns (comma-separated)' }),
        sort: flags.string({ description: "Property to sort by (prepend '-' for descending)" }),
        scoped: flags.boolean({ char: 's', description: 'Show only scoped rows', default: false }),
        filter: flags.string({ char: 'f', description: 'Filter property by partial string matching, ex: name=foo' }),
        extended: flags.boolean({ char: 'x', description: 'Show extra columns' }),
        output: flags.option({
            parse: input => input,
            char: 'o',
            description: "Output in a more machine friendly format (for 'raw' format, you must select only one column)",
            options: ['raw'],
            multiple: false,
            dependsOn: ['columns']
        })
    };


    async run() : Promise<void> {
        await database.init();
        const { flags } = this.parse(Show);


        const ips = await this.retrieveData(flags);
        const data = this.formatData(ips, flags);

        if (!data) return this.error('Unable to format data.');

        this.outputData(data, flags);
    }


    async retrieveData(flags: IFlags) : Promise<Array<IP>> {
        const options : FindOptions<Model['_attributes']> = {
            attributes: ['addr', 'scoped'],
            include: {
                model: Domain,
                as: 'domains',
                attributes: ['name']
            }
        };

        if (flags.scoped) options.where = { scoped: flags.scoped };

        return await IP.findAll(options);
    }


    formatData(ips: Array<IP>, flags: IFlags) : null | [] {
        let data = null;
        cli.table(ips, {
            scope: { header: 'SCOPED', get: (row) => row.scoped },
            ip: { header: 'IP', get: (row) => row.addr },
            domains: { header: 'DOMAINS', get: (row) => row.domains.map((domain) => domain.name).join('\n') }
        }, {
            output: 'json',
            printLine: (lines) => {
                try {
                    data = JSON.parse(lines);
                } catch (err) {
                    process.stdout.write(lines + '\n');
                }
            },
            columns: flags.columns,
            sort: flags.sort,
            filter: flags.filter,
            extended: flags.extended
        });
        return data;
    }


    outputData(data: [], flags: IFlags) : void {
        try {
            if (flags.output && flags.output === 'raw') return this.outputToRawList(data, flags);
            this.outputToASCII(data, flags);
        } catch (err) {
            console.error(chalk.red(`[-] ${err.message}`));
        }
    }


    outputToRawList(data: [], flags: IFlags) : void {
        if (!flags.columns || flags.columns.split(',').length !== 1) throw new Error('Only exactly one column must be provided !');
        data.map((d: Row) => {
            for (const key in d) process.stdout.write(`${d[key]}\n`);
        });
    }


    outputToASCII(data: [], flags: IFlags) : void {
        let headers = ['SCOPED', 'IP', 'DOMAIN'];
        if (flags.columns) headers = flags.columns.split(',');
        const table = new Table({ head: headers, colAligns: ['center'] });
        data.map((d: Row) => {
            const row = [];
            if (d.scope) row.push(d.scope.toString() === 'true' ? '✅' : '❌');
            if (d.ip) row.push(d.ip);
            if (d.domains) row.push(d.domains);
            table.push(row);
        });
        this.log(table.toString());
    }
}


export default Show;
