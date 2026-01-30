const { documentService, } = require("../services/document.service");

const documentController = {

  async uploadDocumentLocally(request, reply) {
    const files = await request.files();
    const results = [];

    for await (const file of files) {
      const result = await documentService.uploadDocumentLocally(file, "System");
      results.push(result);
    }

    reply.code(201).send({
      message: "Documents uploaded successfully",
      results
    });
  },

  async uploadDocumentCloudinary(request, reply) {
    const files = await request.files();
    const results = [];

    for await (const file of files) {
      const result = await documentService.uploadDocumentToCloudinary(file, "System");
      results.push(result);
    }

    reply.code(201).send({
      message: "Documents uploaded successfully",
      results
    });
  }

};

module.exports = documentController;
