'use strict';

import { type } from 'node:os';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('courseenrollment', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuidv7()"),
      allowNull: false,
      primaryKey: true,
    },
    student_id:{
      type:Sequelize.UUID,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      }
    },
    course_id:{
        type:Sequelize.UUID,
      allowNull:false,
      references:{
        model:"course",
        key:"id"
      }
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.Sequelize.fn("now")
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('courseenrollment');
}