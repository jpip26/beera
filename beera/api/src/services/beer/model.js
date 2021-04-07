import Sequelize from 'sequelize';

export default {
  name: 'beer',
  define: {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    imageUrl: {
      field: 'image_url',
      type: Sequelize.TEXT,
      allowNull: true,
    },
    status: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'NOT_DRUNK',
    },
    drinkByDate: {
      field: 'drink_by_date',
      type: Sequelize.TEXT,
      allowNull: true,
    },
    createdAt: {
      field: 'created_at',
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      field: 'updated_at',
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  options: {},
};
