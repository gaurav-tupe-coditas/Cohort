"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("rolepermission", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal("uuidv7()"),
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "role", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    permission_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "permission", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      allowNull:true
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("rolepermission");
}
