const sequelize=require('../database')
const Sequelize=require('sequelize')

const Model = Sequelize.Model;
class Image extends Model {}

Image.init({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    url:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    sequelize,
    modelName: 'image'
})

module.exports=Image