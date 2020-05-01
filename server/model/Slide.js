const sequelize=require('../database')
const Sequelize=require('sequelize')

const Model = Sequelize.Model;
class Slide extends Model {}

Slide.init({
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
    modelName: 'slide'
})

module.exports=Slide