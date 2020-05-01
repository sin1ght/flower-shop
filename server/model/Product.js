const sequelize=require('../database')
const Sequelize=require('sequelize')

const Category = require('./Category')
const Image = require('./Image')

const Model = Sequelize.Model;
class Product extends Model {}
Product.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(40),
        description:'商品名称'    
    },
    price:{
        type:Sequelize.FLOAT,
    },
    amount:{
        type:Sequelize.INTEGER,
        description:'商品数量'
    },
    desc:{
        type:Sequelize.STRING,
        description:'商品详情说明'
    } 
}, {
  sequelize,
  modelName: 'product'
});

//分类
Product.belongsTo(Category)

//详情图
Product.hasMany(Image,{
    onDelete:'CASCADE',
    hooks:true,
})
Image.belongsTo(Product)

module.exports=Product