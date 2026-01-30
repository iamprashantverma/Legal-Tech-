const { intakeService } = require("../services/intake.service");

const lawyerController = {

  // Get intake by ID
  async getIntakeById(request, reply) {
    const { id } = request.params;

    const intake = await intakeService.getIntakeById(id);

    return reply.code(200).send({
      success: true,
      data: intake
    });
  },
  // Add comment to intake
  async addCommentToIntake(request, reply) {
    // intake Id
    const { id } = request.params;

    // review added by lawyers
    const { comment } = request.body;

    // lawyerId
    const userId = request.user.id;

    const updatedIntake = await intakeService.addComment(id, comment, userId );

    return reply.code(200).send({
      success: true,
      message: "Comment added successfully",
      data: updatedIntake
    });
  },

  async findPendingIntakes(request, reply) {
    const { page, limit } = request.query;

    const result = await intakeService.findPendingIntakes({
      page,
      limit
    });

    return reply.code(200).send({
      success: true,
      data:result
    });
  }

};

module.exports = lawyerController;
