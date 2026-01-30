const { Intake,IntakeReview } = require("../models");
const { NotFoundError, ConflictError,BadRequestError } =  require("../errors/index");
const { uploadFilesToCloudinary } = require("./cloudinary.service.js");

const intakeService = {

  async createIntake(payload, files) {
    let uploadedFiles = { uploadId: [], uploadDocs: [] };

    if (files && (files.uploadId.length || files.uploadDocs.length)) {
      uploadedFiles = await uploadFilesToCloudinary(files);
      payload.uploadId = uploadedFiles.uploadId;
      payload.uploadDocs = uploadedFiles.uploadDocs;
    }

    return Intake.create(payload);
  },
  
  // Get Intake by ID
  async getIntakeById(id) {
    const intake = await Intake.findByPk(id);

    if (!intake) {
      throw new NotFoundError(`Intake not found with id ${id}`);
    }

    return intake;
  },

  // Fetch all intakes for a client (optional status filter)
  async getIntakesByUser(userId, query = {}) {
    const { status, page = 1, limit = 10 } = query;

    const where = { userId };

    // Optional filter: status
    if (query.status) {
      where.status = query.status;
    }

    const offset = (page - 1) * limit;

    const { rows: intakes, count: total } = await Intake.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
    });
 
     return { data: intakes,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };

  },

  // Handle controlled intake status transitions
  async  transitionIntakeStatus({ intakeId, from, to, onApprove = false, onReject = false }) {
    
    const intake = await Intake.findByPk(intakeId);

    if (!intake) {
      throw new NotFoundError(`Intake not found: ${intakeId}`);
    }

    if (intake.status !== from) {
      throw new ConflictError(
        `Cannot change status from ${intake.status}`
      );
    }

    if (intake.status === to) {
      throw new ConflictError(`Intake already in ${to} state`);
    }

    intake.status = to;

    if (to === "APPROVED" && onApprove) {
      intake.approvedAt = new Date();
    }

    if (to === "REJECTED" && onReject) {
      intake.rejectedAt = new Date();
    }

    await intake.save();

    return intake;
  },

  // Legal manager approval / rejection 
  async  updateIntakeStatusByLegalManager(intakeId, status) {
    if (!["APPROVED", "REJECTED"].includes(status)) {
      throw new ConflictError(
        "Legal manager can only set status to APPROVED or REJECTED"
      );
    }

    return  await this.transitionIntakeStatus({
      intakeId,
      from: "IN_REVIEW",
      to: status,
      onApprove: true,
      onReject: true
    });

    // after approved create the
  },

  // Add lawyer review comment to an intake 
  async addComment(intakeId, comment, lawyerId) { 
    
    if (!comment || !comment.trim()) {
      throw new BadRequestError("Comment cannot be empty");
    }

    return await Intake.sequelize.transaction(async (transaction) => {
      const intake = await Intake.findByPk(intakeId, { transaction });

      if (!intake) {
        throw new NotFoundError(`Intake not found with id ${intakeId}`);
      }

      // Business rule
      if (intake.status !== "PENDING") {
        throw new BadRequestError(
          "Comments can only be added when intake status is PENDING"
        );
      }

      // Prevent duplicate review for same intake
      const existingReview = await IntakeReview.findOne({
        where: { intakeId },
        transaction
      });

    if (existingReview) {
      throw new ConflictError("Review already exists for this intake");
    }

    // Create review entry
    const review = await IntakeReview.create(
      {
        intakeId,
        lawyerId,
        comment: comment.trim()
      },
      { transaction }
    );

    // Update intake status
    intake.status = "IN_REVIEW";
    await intake.save({ transaction });

    return {
      intakeId: intake.id,
      status: intake.status,
      review
    };
  });
 },

  // Fetch all pending intakes (with pagination)
  async findPendingIntakes(query = {}) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    const { rows: intakes, count: total } = await Intake.findAndCountAll({
      where: { status: "PENDING" },
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    return { data: intakes,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  

};

module.exports = { intakeService };
