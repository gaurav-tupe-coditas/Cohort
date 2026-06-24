'use strict';

import { type } from 'node:os';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('course', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuidv7()"),
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type:Sequelize.TEXT,
      allowNull:false
    },
    instructor_id:{
      type:Sequelize.UUID,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"SET NULL"
    },
    description:{
      type:Sequelize.TEXT,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('course');
}