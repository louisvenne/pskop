/**
 * Powered by @louisvenne
 */


import  { Command, flags }                         from '@oclif/command';
import  chalk                                      from 'chalk';
import  { promises as dns }                        from 'dns';

import  { Domain }                                 from '../database/models/domain';
import  { IP }                                     from '../database/models/ip';
import  { database }                               from '../database';

import Add                                         from './add';


class Resolve extends Command {

    static aliases = ['r'];

    static description = 'Resolves all domains to IP and reverse them afterwards';

    static flags = {
        help: flags.help({ char: 'h' })
    };


    async run () : Promise<void> {
        try {
            await database.init();

            const domains = await Domain.findAll();
            const resolve_ips = await this.resolve(domains);
            await this.reverse(resolve_ips);

        } catch (err) {
            this.error(err);
        }
    }


    async resolve(domains: Domain[]) : Promise<IP[]> {
        const resolve_ips: IP[] = [];
        for (const domain of domains) {
            const entry = domain.name.toString();
            try {
                const ips = await dns.resolve(entry);
                for (const ip of ips) {
                    const rip = await Add.addIP(ip, domain);
                    if (rip) resolve_ips.push(rip);
                }
            } catch (err) {
                this.warn(chalk.yellow(`Unable to resolve domain '${entry}'`));
            }
        }
        return resolve_ips;
    }


    async reverse(ips: IP[]) : Promise<void> {
        for (const ip of ips) {
            const entry = ip?.addr.toString();
            try {
                const domains = await dns.reverse(entry);
                for (const domain of domains) {
                    await Add.addDomain(domain, ip);
                }
            } catch (err) {
                this.warn(chalk.yellow(`Unable to reverse resolve IP '${entry}'`));
            }
        }
    }

}


export default Resolve;
