const fp = require("fastify-plugin");
const { sequelize } = require("../config/database");
require("../models");

module.exports = fp(async function (fastify) {
  try {
    await sequelize.authenticate();
    fastify.log.info("Database connected");

    fastify.decorate("sequelize", sequelize);

    if (process.env.NODE_ENV === "development") {
      fastify.log.info("sequelize.sync({ alter: true }) enabled (DEV ONLY)");
      await sequelize.sync({ alter: true });
    }

    fastify.addHook("onClose", async () => {
      fastify.log.info("Closing database connection");
      await sequelize.close();
    });

  } catch (error) {
    fastify.log.error(error, "Database connection failed");
    process.exit(1);
  }
});
