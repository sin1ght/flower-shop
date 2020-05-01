const sequelize=require('../database')
const Sequelize=require('sequelize')

const User = require('./User')
const Product = require('./Product')

const Model = Sequelize.Model;
class SaleRecord extends Model {}

SaleRecord.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    num:{
        type:Sequelize.INTEGER,
        description:'产品数量',
    }
},{
    sequelize,
    modelName: 'sale_record'
})


//用户
SaleRecord.belongsTo(User)

//产品
Product.hasMany(SaleRecord,{
    onDelete:'CASCADE',
    hooks:true,
    as:'SaleRecords'
})
SaleRecord.belongsTo(Product)

module.exports=SaleRecord