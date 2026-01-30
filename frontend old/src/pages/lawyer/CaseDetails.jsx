import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCaseById } from "../../service/api/lawyer-service";

const CaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      const {data} = await getCaseById(id);
      setCaseData(data);
      setLoading(false);
    };
    fetchCase();
  }, [id]);

  if (loading) return <p className="case-details__loading">Loading...</p>;
  if (!caseData) return <p className="case-details__error">Case not found</p>;

  return (
    <div className="case-details">
      <button className="case-details__back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <header className="case-details__header">
        <h2 className="case-details__title">{caseData.title}</h2>
      </header>

      <section className="case-details__section">
        <h3 className="case-details__section-title">Client Information</h3>
        <p><strong>Name:</strong> {caseData.clientName}</p>
      </section>

      <section className="case-details__section">
        <h3 className="case-details__section-title">Case Information</h3>
        <div className="case-details__grid">
          <p><strong>Case ID:</strong> {caseData.id}</p>
          <p><strong>Type:</strong> {caseData.type}</p>
          <p><strong>Status:</strong> {caseData.status}</p>
          <p><strong>Filed Date:</strong> {caseData.filedDate}</p>
        </div>
      </section>
    </div>
  );
};

export default CaseDetails;
