'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('role', {
    
    id: {
      type: Sequelize.UUID,
      defaultValue:Sequelize.literal("uuidv7()"),
      allowNull:false,
      primaryKey:true
    },
    name:{
      type:Sequelize.TEXT,
      allowNull:false,
      unique:true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('role');
}