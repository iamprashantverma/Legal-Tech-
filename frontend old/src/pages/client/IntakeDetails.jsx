import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIntakeById } from "../../service/api/client-service.js";

const IntakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [intake, setIntake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchIntake = async () => {
      try {
        const res = await getIntakeById(id);
        setIntake(res.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          "Unable to fetch intake details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIntake();
  }, [id]);

  if (loading) {
    return (
      <div className="intake-details__state intake-details__loading">
        Loading intake…
      </div>
    );
  }

  if (error) {
    return (
      <div className="intake-details__state intake-details__error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button
          className="intake-details__back-btn"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  if (!intake) {
    return (
      <div className="intake-details__state intake-details__empty">
        No intake found
      </div>
    );
  }

  return (
    <div className="intake-details" id="intake-details">
      <div className="intake-details__header">
        <h2>Intake Details</h2>

        <div className="intake-details__header-actions">
          <span
            className={`intake-details__status ${intake.status
              .toLowerCase()
              .replace("_", "-")}`}
          >
            {intake.status}
          </span>

          <button
            className="intake-details__back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="intake-details__section">
        <h3>Client Information</h3>
        <div className="intake-details__grid">
          <p><strong>Name:</strong> {intake.name}</p>
          <p><strong>Email:</strong> {intake.email}</p>
          <p><strong>Phone:</strong> {intake.phoneNumber}</p>
          <p><strong>Date of Birth:</strong> {intake.dob}</p>
          <p><strong>Address:</strong> {intake.address}</p>
        </div>
      </div>

      <div className="intake-details__section">
        <h3>Case Details</h3>
        <div className="intake-details__grid">
          <p><strong>Case Type:</strong> {intake.caseType}</p>
          <p><strong>Priority:</strong> {intake.priority}</p>
          <p>
            <strong>Submitted On:</strong>{" "}
            {new Date(intake.createdAt).toLocaleString()}
          </p>
          {intake.rejectedAt && (
            <p>
              <strong>Rejected On:</strong>{" "}
              {new Date(intake.rejectedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="intake-details__section">
        <h3>Description</h3>
        <p className="intake-details__description">{intake.description}</p>
      </div>

      <div className="intake-details__section">
        <h3>Uploaded Documents</h3>

        <div className="intake-details__files">
          <div>
            <h4>ID Proof</h4>
            {intake.uploadId?.length ? (
              <ul>
                {intake.uploadId.map((file, i) => (
                  <li key={i}>{file}</li>
                ))}
              </ul>
            ) : (
              <span>—</span>
            )}
          </div>

          <div>
            <h4>Supporting Documents</h4>
            {intake.uploadDocs?.length ? (
              <ul>
                {intake.uploadDocs.map((file, i) => (
                  <li key={i}>{file}</li>
                ))}
              </ul>
            ) : (
              <span>—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeDetails;
