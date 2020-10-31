/**
 * Powered by @louisvenne
 */


import  { Sequelize }                       from 'sequelize';

import  { Domain, registerDomainModel }     from './domain';
import  { IP, registerIPModel }             from './ip';
import  { registerResolvModel, Resolv }     from './resolv';


const registerAllModels = (sequelize: Sequelize) : void => {

    registerIPModel(sequelize);
    registerDomainModel(sequelize);
    registerResolvModel(sequelize);

    IP.belongsToMany(Domain, { through: Resolv, as: 'domains', foreignKey: 'ip_id' });
    Domain.belongsToMany(IP, { through: Resolv, as: 'ips', foreignKey: 'domain_id' });

};


export { registerAllModels };
