/**
 * Powered by @louisvenne
 */


import  { Sequelize, DataTypes, Model, HasManyAddAssociationMixin } from 'sequelize';

import  { IP }                                                      from './ip';


class Domain extends Model {
    public name!: string
    public scoped!: boolean

    public addIp!: HasManyAddAssociationMixin<IP, number>

}


const registerDomainModel = (sequelize: Sequelize) : void => {

    Domain.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        scoped: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Domain',
        tableName: 'skop_domain'
    });

};


export { Domain, registerDomainModel };
