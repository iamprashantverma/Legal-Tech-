const documentController = require("../controllers/document.controller");

async function documentRoutes(fastify) {
  
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.post(
    "/upload",
    {
      schema: {
        summary: "Upload document",
        consumes: ["multipart/form-data"],
      },
    },
    documentController.uploadDocumentLocally
  );

  fastify.post(
    "/online/upload",
    {
      schema: {
        summary: "Upload document to cloud",
        consumes: ["multipart/form-data"],
      },
    },
    documentController.uploadDocumentCloudinary
  );
}

module.exports = documentRoutes;
