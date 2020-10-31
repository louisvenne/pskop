/**
 * Powered by @louisvenne
 */


import  { Sequelize, DataTypes, Model, HasManyAddAssociationMixin } from 'sequelize';

import  { Domain }                                                  from './domain';


class IP extends Model {
    public id!: number
    public addr!: string
    public scoped!: boolean

    public domains!: Domain[]
    public addDomain!: HasManyAddAssociationMixin<Domain, number>
}


const registerIPModel = (sequelize: Sequelize) : void => {

    IP.init({
        addr: {
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
        modelName: 'IP',
        tableName: 'skop_ip'
    });

};


export { IP, registerIPModel };
