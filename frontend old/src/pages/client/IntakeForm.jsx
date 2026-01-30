import { useState } from "react";
import { createIntake } from "../../service/api/client-service.js";
import { useNavigate } from "react-router-dom";
const IntakeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: "",
    priority: "MEDIUM",
    caseType: "",
    description: "",
    uploadDocs: [],
    uploadId: [],
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      setError("Please confirm the information is correct.");
      return;
    }

    const { uploadDocs, uploadId, consent, ...payload } = formData;

    try {
      setLoading(true);
      setError(null);

      const resp = await createIntake(payload);
      setRequestId(resp.data.id);
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to submit intake. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    navigate("/client/form-success", {
    state: { requestId },
  });
  return null;
}

  return (
    <div className="intake">

      {error && <div className="intake__error">{error}</div>}

      <form className="intake__form" onSubmit={handleSubmit}>
        <section className="intake__section">
          <h3>1. Personal Information</h3>
          <div className="intake__grid">
            <div className="field">
              <label>Full Name</label>
              <input name="name" required onChange={handleChange} />
            </div>
            <div className="field">
              <label>Date of Birth</label>
              <input type="date" name="dob" required onChange={handleChange} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" required onChange={handleChange} />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input name="phoneNumber" required onChange={handleChange} />
            </div>
            <div className="field full">
              <label>Full Address</label>
              <input name="address" required onChange={handleChange} />
            </div>
          </div>
        </section>

        <section className="intake__section">
          <h3>2. Case / Request Details</h3>
          <div className="intake__grid">
            <div className="field">
              <label>Case Type</label>
              <select name="caseType" required onChange={handleChange}>
                <option value="">Select</option>
                <option>Immigration Law</option>
                <option>Family Law</option>
                <option>Criminal Law</option>
                <option>Civil Law</option>
              </select>
            </div>
            <div className="field">
              <label>Priority</label>
              <select name="priority" onChange={handleChange}>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
            <div className="field full">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                required
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <section className="intake__section">
          <h3>3. Documents</h3>
          <div className="intake__grid">
            <div className="field">
              <label>Upload ID</label>
              <input type="file" name="uploadId" multiple onChange={handleFileChange} />
            </div>
            <div className="field">
              <label>Supporting Documents</label>
              <input type="file" name="uploadDocs" multiple onChange={handleFileChange} />
            </div>
          </div>
        </section>

       <section className="intake__consent">
        <label className="intake__consent-label">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          <span>I confirm the information provided is accurate</span>
        </label>
      </section>


        <button
              className="intake__submit"
              type="submit"
              disabled={loading || !formData.consent}
            >
              {loading ? "Submitting..." : "Submit Intake"}
            </button>

      </form>
    </div>
  );
};

export default IntakeForm;
