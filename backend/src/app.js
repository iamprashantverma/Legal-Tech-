require("dotenv").config();
const multipart = require("@fastify/multipart");

const app = require("fastify")({
  logger: {
    level: process.env.LOG_LEVEL || "info",
    file:"./logs/app.log"
  },
  ajv: {
    plugins: [require("ajv-errors")],
    customOptions: {
      allErrors: true,
    },
  },
});

app.register(multipart, {
  attachFieldsToBody: false,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 15,
  },
});

app.register(require("@fastify/cors"), {
  origin: true,
});


// plugins
app.register(require("./plugins/sequelize.plugin"));
app.register(require("./plugins/jwt.plugin"));  
app.register(require("./plugins/auth.plugin"));     
app.register(require("./plugins/auditor.plugin"));
app.register(require("./plugins/cloudinary.plugin"));
app.register(require("./plugins/ajv.plugin"));
app.register(require("./plugins/error-handler.plugin"));


// Routes
app.register(require("./routes/document.route"), { prefix: "/api/document" });
app.register(require("./routes/health.route"), { prefix: "/api/health" });
app.register(require("./routes/auth.route"), { prefix: "/api/auth" });
app.register(require("./routes/client.route"), { prefix: "/api/client" });
app.register(require("./routes/lawyer.route"), { prefix: "/api/lawyer" });
app.register(require("./routes/legal.route"), { prefix: "/api/legal" });
app.register(require("./routes/admin.route"), { prefix: "/api/admin" });


const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = app;
