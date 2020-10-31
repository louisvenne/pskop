/**
 * Powered by @louisvenne
 */


import  { Sequelize, DataTypes, Model }   from 'sequelize';

import  { Domain }                        from './domain';
import  { IP }                            from './ip';


class Resolv extends Model {}


const registerResolvModel = (sequelize: Sequelize) : void => {

    Resolv.init({
        ip_id: {
            type: DataTypes.INTEGER,
            references: {
                model: IP,
                key: 'id'
            }
        },
        domain_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Domain,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Resolv',
        tableName: 'skop_resolv'
    });

};


export { Resolv, registerResolvModel };
