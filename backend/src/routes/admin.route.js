const adminController = require("../controllers/admin.controller");
const {userRoleSchema} = require("../validation/user-role.validation")
async function adminRoutes(fastify, options) {
  
  // Authenticate && Authorize User
  fastify.addHook("onRequest",fastify.authenticate)
  fastify.addHook("preHandler",fastify.isAdmin)

  // Get logged-in admin profile
  fastify.get("/me", adminController.getMyProfile );

  // Update user role
  fastify.patch("/users/:id/role",{schema:userRoleSchema}, adminController.changeUserRole );

}

module.exports = adminRoutes;