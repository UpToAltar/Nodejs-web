"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Comments", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        idBook: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
        },
        star: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        content: {
            type: Sequelize.TEXT,
        },
        avata: {
        type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn("now"),
        },
    });
},
down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Comments");
},
};
