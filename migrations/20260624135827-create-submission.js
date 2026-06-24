'use strict';

import { type } from 'node:os';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('submission', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuidv7()"),
      allowNull: false,
      primaryKey: true,
    },
    assignment_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "assignment",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    student_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    grade:{
      type:Sequelize.INTEGER,
      allowNull:true
    },
    submission_time:{
      type:Sequelize.DATE,
      defaultValue:Sequelize.Sequelize.fn("now"),
      allowNull:false
    },
    url:{
      type:Sequelize.TEXT,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.Sequelize.fn("now"),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('submission');
}