const sequelize=require('../database')
const Sequelize=require('sequelize')

const CardRecord = require('./CartRecord')
const Address = require('./Address')
const Order = require('./Order')

const Model = Sequelize.Model;
class User extends Model {}
User.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    openid:{
        type:Sequelize.STRING,
        description:'微信用户唯一标识',
        allowNull:false,    
    },
    avatarUrl:{
        type:Sequelize.STRING,
        description:'头像',
        allowNull:false,       
    },
    nickName:{
        type:Sequelize.STRING(20),
        description:'昵称',
        allowNull:false,       
    },
    name:{
        type:Sequelize.STRING(40),
        description:'真实姓名'    
    },
    phoneNumber:{
        type:Sequelize.STRING(11),
        description:'电话号码'
    }
}, {
  sequelize,
  modelName: 'user'
});


//购物车记录
User.hasMany(CardRecord,{
    onDelete:'CASCADE',
    hooks:true,
    as:'CartRecords'
})
CardRecord.belongsTo(User)

//收货人地址
User.hasMany(Address,{
    onDelete:'CASCADE',
    hooks:true,
    as:'Addresses'
})
Address.belongsTo(User)

//订单Order
User.hasMany(Order,{
    onDelete:'CASCADE',
    hooks:true,
})
Order.belongsTo(User)

module.exports=User