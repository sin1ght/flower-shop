const sequelize=require('../database')
const Sequelize=require('sequelize')

const Model = Sequelize.Model;
class Address extends Model {}

Address.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        description:'收货人姓名',
    },
    phoneNumber:{
        type:Sequelize.STRING(11),
        description:'收货人电话号码',
    },
    detail:{
        type:Sequelize.STRING,
        description:'地址详情',
    },
},{
    sequelize,
    modelName: 'address'
})




module.exports=Address