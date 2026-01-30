import "./RequestMoreInfo.scss";

const RequestMoreInfo = () => {
  return (
    <div className="request-wrapper">
      <div className="request-card">
        {/* Header */}
        <div className="request-header">
          Request More Info Screen (Staff)
        </div>

        {/* Meta Info */}
        <div className="request-meta">
          <span>
            <strong>Intake ID:</strong> 123456
          </span>
          <span>
            <strong>Client Name:</strong> John Doe
          </span>
        </div>

        {/* Checkboxes */}
        <div className="request-options">
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>Proof of Identity</span>
          </label>

          <label className="checkbox">
            <input type="checkbox" />
            <span>Additional Details</span>
          </label>
        </div>

        {/* Message Box */}
        <div className="request-message">
          <p>Dear John Doe,</p>
          <p>
            Please provide the requested document and details to proceed your
            case.
          </p>
          <p>
            Proof Of Identity (PAN, Aadhaar)
            <br />
            Additional Supporting Documents (PAN, Aadhaar)
          </p>
        </div>

        {/* Actions */}
        <div className="request-actions">
          <button className="btn primary">Send Request</button>
          <button className="btn secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RequestMoreInfo;
