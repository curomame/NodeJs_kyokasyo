const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      
      comment:{
        type:Sequelize.STRING(100),
        allowNull:false,
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
      modelName:'Comment',
      tableName:'Comments',
      paranoid:false,
      charset:'utf8mb4',
      collate:'utf8mb4_general_ci',

    })
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {foreignKey : 'commenter', targetKey:'id'})
  }
}

//user table과 연결된 컬럼은 index에서 따로 정의

//다른모델의 정보가 들어가는 테이블에 비롱스 투
//포린 키 따로 설정하지 않으면 이름이 모델명 + 기본키인 컬럼 모델이 생성됨
