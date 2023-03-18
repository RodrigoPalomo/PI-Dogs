const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Dog",
    {
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_DB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
