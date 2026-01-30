const { intakeService } = require("../services/intake.service");

const legalController = {

  async getIntakeById(request, reply) {
    const { id } = request.params;

    const intake = await intakeService.getIntakeById(id);

    return reply.code(200).send({
      success: true,
      data: intake
    });
  },

  async updateIntakeStatus(request, reply) {
    const { id } = request.params;
    const { status } = request.body;

    
    const updatedIntake = await intakeService.updateIntakeStatusByLegalManager(id, status);

    return reply.code(200).send({
      success: true,
      message: `Intake ${String(status).toLowerCase()} successfully`,
      data: updatedIntake
    });
  }

};

module.exports = legalController;
