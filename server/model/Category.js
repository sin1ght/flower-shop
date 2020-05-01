const sequelize=require('../database')
const Sequelize=require('sequelize')

const Model = Sequelize.Model;
class Category extends Model {}

Category.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        description:'分类名称',
        allowNull:false
    }
},{
    sequelize,
    modelName: 'category'
})


module.exports=Category