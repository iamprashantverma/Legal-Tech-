const User = require('./user.model');
const Intake = require('./intake.model');
const Case = require('./case.model');
const IntakeReview = require('./intakeReview.model');
const AuditLog = require("./auditLog.model");

/* User ↔ Intake */
User.hasMany(Intake, { foreignKey: 'userId', as: 'intakes' });
Intake.belongsTo(User, { foreignKey: 'userId', as: 'client' });

/* Intake ↔ Case */
Intake.hasMany(Case, { foreignKey: 'intakeId', as: 'cases' });
Case.belongsTo(Intake, { foreignKey: 'intakeId', as: 'intake' });

/* User ↔ Case (Assigned Lawyer) */
User.hasMany(Case, { foreignKey: 'assignedTo', as: 'assignedCases' });
Case.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedLawyer' });

/* Intake ↔ IntakeReview */
Intake.hasOne(IntakeReview, { foreignKey: 'intakeId', as: 'review' });
IntakeReview.belongsTo(Intake, { foreignKey: 'intakeId', as: 'intake' });

/* User ↔ IntakeReview */
User.hasMany(IntakeReview, { foreignKey: 'lawyerId', as: 'intakeReviews' });
IntakeReview.belongsTo(User, { foreignKey: 'lawyerId', as: 'lawyer' });

module.exports = {
  User,
  Intake,
  Case,
  IntakeReview,
  AuditLog,
};
