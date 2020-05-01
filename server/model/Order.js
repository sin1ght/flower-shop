const sequelize=require('../database')
const Sequelize=require('sequelize')

const Address = require('./Address')
const CardRecord = require('./CartRecord')

const Model = Sequelize.Model;
class Order extends Model {}

Order.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    serialNumber:{
        type:Sequelize.STRING,
        description:'订单编号',
    },
    price:{
        type:Sequelize.FLOAT,
        description:'总计价格',
    },
    message:{
        type:Sequelize.STRING,
        description:'买家留言',
    },
    status:{
        type:Sequelize.INTEGER,
        description:'订单状态 0待付款/1待发货/2待收获/3待评价/4已结束',
    }, 
},{
    sequelize,
    modelName: 'Order'
})

//收获地址
Order.belongsTo(Address)

//购物车记录
Order.hasMany(CardRecord,{
    onDelete:'CASCADE',
    hooks:true,
    as:'CartRecords'
})
CardRecord.belongsTo(Order)

module.exports=Order