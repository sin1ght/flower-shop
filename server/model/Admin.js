const sequelize=require('../database')
const Sequelize=require('sequelize')

const Model = Sequelize.Model;
class Admin extends Model {}

Admin.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        description:'账号',
    },
    password:{
        type:Sequelize.STRING,
        description:'密码',
    }
},{
    sequelize,
    modelName: 'admin'
})


module.exports=Admin