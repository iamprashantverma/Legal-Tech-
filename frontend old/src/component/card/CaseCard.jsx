const CaseCard = ({ case: caseData }) => {
  if (!caseData) return null;

  return (
    <div className="case-card">
      <div className="case-card__header">
        <h3 className="case-card__title">{caseData.title}</h3>
        <span
          className={`case-card__status case-card__status--${caseData.status.toLowerCase()}`}
        >
          {caseData.status}
        </span>
      </div>

      <div className="case-card__body">
        <p className="case-card__meta">
          <strong>Case ID:</strong> {caseData.id}
        </p>

        <p className="case-card__meta">
          <strong>Client:</strong> {caseData.clientName}
        </p>

        <span className="case-card__type">{caseData.type}</span>
      </div>

      <div className="case-card__footer">
        Filed on: <span>{caseData.filedDate}</span>
      </div>
    </div>
  );
};

export default CaseCard;
