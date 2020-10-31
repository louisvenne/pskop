/**
 * Powered by @louisvenne
 */


import  chalk                                                                from 'chalk';
import  * as config                                                          from 'config';
import  { Sequelize }                                                        from 'sequelize';

import  { registerAllModels }                                                from './models';


async function init () : Promise<void> {

    try {
        const sequelize: Sequelize = new Sequelize(config.get('database'));

        registerAllModels(sequelize);

        await sequelize.sync();
    } catch (err) {
        console.error(chalk.red('[SKOP-DB] Unable to reach/interact with the database ! Check your configuration !'));
        console.error(err);
        throw err;
    }
}

const database = { init: init };


export { database };
