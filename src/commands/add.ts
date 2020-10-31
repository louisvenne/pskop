/**
 * Powered by @louisvenne
 */


import  { Command, flags }          from '@oclif/command';
import  * as chalk                  from 'chalk';
import  * as checkIP                from 'check-ip';
import  * as isValidDomain          from 'is-valid-domain';

import  { Domain }                  from '../database/models/domain';
import  { IP }                      from '../database/models/ip';
import  { database }                from '../database';


class Add extends Command {

    static aliases = ['a', 'update', 'patch', 'modify']

    static description = 'Add an ip/domain/urls';

    static examples = [
        '$ pskop add -i 42.42.42.42',
        '$ pskop add -d www.example.com'
    ];

    static flags = {
        help: flags.help({ char: 'h' }),
        ip: flags.string({ char: 'i', description: 'Add an IP' }),
        domain: flags.string({ char: 'd', description: 'Add an domain' }),
        scope: flags.boolean({ char: 's', description: 'Tag entries as scoped', default: false })
    };


    async run() : Promise<void> {
        const { flags } = this.parse(Add);

        await database.init();

        if (flags.ip) await Add.addIP(flags.ip, undefined, flags.scope);
        if (flags.domain) await Add.addDomain(flags.domain, undefined, flags.scope);
    }


    static async addIP(ip: string, domain?: Domain, scope?: boolean) : Promise<IP | undefined> {
        try {
            if (!checkIP(ip).isValid) throw 'The IP address provided is not valid.';
            if (domain && !isValidDomain(domain?.name.toString())) throw 'The domain provided is not valid.';

            const [elem, created] = await IP.findOrCreate({
                where: { addr: ip },
                defaults: { addr: ip, scoped: !!scope }
            });
            if (domain) await elem.addDomain(domain);
            console.debug(scope);
            if (scope !== undefined) elem.update({ scoped: scope });

            if (created) console.log(chalk.green(`[+] IP '${elem.addr}' have been successfully added !`));
            else console.warn(chalk.yellowBright(`[+] IP '${elem.addr}' already exist on db.`));
            return elem;
        } catch (err) {
            console.error(chalk.red(`[+] ${err}`));
            return undefined;
        }
    }


    static async addDomain(domain: string, ip?: IP, scope?: boolean) : Promise<Domain | undefined> {
        try {
            if (!isValidDomain(domain)) throw 'The domain provided is not valid.';
            if (ip && !checkIP(ip?.addr.toString()).isValid) throw 'The IP address provided is not valid.';

            const [elem, created] = await Domain.findOrCreate({
                where: { name: domain },
                defaults: { name: domain, scoped: !!scope }
            });
            if (ip) await elem.addIp(ip);
            if (scope !== undefined) elem.update({ scoped: scope });

            if (created) console.log(chalk.green(`[+] Domain '${elem.name}' have been successfully added !`));
            else console.warn(chalk.yellowBright(`[+] Domain '${elem.name}' already exist on db.`));
            return elem;
        } catch (err) {
            console.error(chalk.red(`[+] ${err}`));
            return undefined;
        }
    }

}


export default Add;
