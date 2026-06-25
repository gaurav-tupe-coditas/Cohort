"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
   */
  const transaction = await queryInterface.sequelize.transaction();

  try {
    const rolesToInsert = [
      { name: "STUDENT" },
      { name: "INSTRUCTOR" },
      { name: "ADMIN" },
    ];
    const createdRoles = await queryInterface.bulkInsert(
      "role",
      rolesToInsert,
      {
        returning: ["id", "name"],
        transaction,
      },
    );
    const roleMap = {};
    createdRoles.forEach((element) => {
      roleMap[element.name] = element.id;
    });
    const permissionsToInsert = [
      { name: "find-user" },
      { name: "create-user" },
      { name: "delete-user" },
      { name: "update-user" },
      { name: "manage-courses" },
      { name: "enroll-course" },
      { name: "submit-assignment" },
      { name: "view-course" },
    ];

    const createdPerms = await queryInterface.bulkInsert(
      "permission",
      permissionsToInsert,
      { returning: ["id", "name"], transaction },
    );
    const perMap = {};
    createdPerms.forEach((element) => {
      perMap[element.name] = element.id;
    });

    const rolePermRows = [
      ...Object.values(perMap).map((permId) => ({
        role_id: roleMap["ADMIN"],
        permission_id: permId,
      })),
      { role_id: roleMap["INSTRUCTOR"], permission_id: perMap["find-user"] },
      {
        role_id: roleMap["INSTRUCTOR"],
        permission_id: perMap["manage-courses"],
      },

      { role_id: roleMap["STUDENT"], permission_id: perMap["find-user"] },
      { role_id: roleMap["STUDENT"], permission_id: perMap["enroll-course"] },
      {
        role_id: roleMap["STUDENT"],
        permission_id: perMap["submit-assignment"],
      },
      { role_id: roleMap["STUDENT"], permission_id: perMap["view-course"] },
    ];

    await queryInterface.bulkInsert("rolepermission", rolePermRows, {
      transaction,
    });

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Gaurav",
          email: "gaurav.tupe@coditas.com",
          password:
            "$2a$05$oHk7YrNCdCZ1C/ye7sN/kegFA2HzIbWzV5eLwLicoHb/bL3WyeeQO",
          role_id: roleMap["ADMIN"],
        },
      ],
      { transaction },
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete("rolepermission", null, {});
  await queryInterface.bulkDelete("permission", null, {});
  await queryInterface.bulkDelete("role", null, {});
}
