import { useNavigate, useLocation } from "react-router-dom";

const IntakeSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const requestId = state?.requestId;

  return (
    <div className="intake-success">
      <div className="intake-success__card">
        <div className="intake-success__icon">✅</div>

        <h2 className="intake-success__title">
          Intake Submitted Successfully
        </h2>

        <p className="intake-success__message">
          Your request has been received. Our team will review it shortly.
        </p>

        {requestId && (
          <p className="intake-success__request-id">
            Reference ID: <strong>#{requestId}</strong>
          </p>
        )}

        <div className="intake-success__actions">
          <button
            className="btn btn--primary"
            onClick={() => navigate("/client/intake-form")}
          >
            Submit Another Intake
          </button>

          <button
            className="btn btn--outline"
            onClick={() => navigate("/client/intakes")}
          >
            View My Intakes
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntakeSuccess;
