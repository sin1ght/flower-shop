const sequelize=require('../database')
const Sequelize=require('sequelize')

const Product = require('./Product')

const Model = Sequelize.Model;
class CartRecord extends Model {}

//购物车记录
CartRecord.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    num:{
        type:Sequelize.INTEGER,
        description:'商品数量',
    },
    status:{
        type:Sequelize.INTEGER,
        description:'0 购物车记录/1 成为订单的一部分',
        defaultValue:0
    }
},{
    sequelize,
    modelName: 'cart_record'
})

//商品
CartRecord.belongsTo(Product)

module.exports=CartRecord