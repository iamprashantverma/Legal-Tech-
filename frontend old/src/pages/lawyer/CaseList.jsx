import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CaseCard from "../../component/card/CaseCard";
import { getAllCases } from "../../service/api/lawyer-service"

const CaseList = () => {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCases().then(res => setCases(res.data));
  }, []);

  return (
    <section className="case-list">
      <div className="case-list__grid">
        {cases.map((c) => (
          <div
            key={c.id}
            className="case-list__item"
            onClick={() => navigate(`/lawyer/cases/${c.id}`)}
          >
            <CaseCard case={c} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CaseList;
