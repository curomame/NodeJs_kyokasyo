const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      //id값은 기본적으로 연동되기 때문에 따로 적어줄 필요가 없음
      name:{
        type:Sequelize.STRING(20),
        allowNull:false,
        unique:true,
      },
      age:{
        type:Sequelize.INTEGER.UNSIGNED,
        allowNull:false,
      },
      married:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
      },
      comment:{
        type:Sequelize.TEXT,
        allowNull:true,
      },
      created_at:{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW,
      },
    },
    {
      sequelize,
      timestamps:false,
      underscored:false,
      modelName:'User',
      tableName:'users',
      paranoid:false,
      charset:'utf8',
      collate:'utf8_general_ci',

    })
  }
  static associate(db) {
    db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey:'id'})
  }
}

//1:N 관계는 hasMany Belongs to

// User => has Many => Comment
// Comment => Belongs to => User