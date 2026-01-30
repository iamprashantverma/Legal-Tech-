import { useEffect, useState } from "react";
import { getMyProfile, getPendingIntakes } from "../../service/api/lawyer-service.js";

const LawyerDashboard = () => {
  const [lawyer, setLawyer] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [profileRes, pendingRes] = await Promise.all([
          getMyProfile(),
          getPendingIntakes({ page: 1, limit: 1 }) // we only need total count
        ]);

        setLawyer(profileRes.data);
        setPendingCount(pendingRes.pagination.total);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard__loading">Loading dashboard…</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div className="dashboard__headerLeft">
          <h2 className="dashboard__title">
             Welcome {lawyer?.name}!
          </h2>
          <p className="dashboard__subtitle">
            Here are your active and new qualified cases for review
          </p>
        </div>
        <button className="dashboard__button">
          View Details
        </button>
      </div>

      <div className="dashboard__qualified">
        <span className="dashboard__qualifiedText">
          Qualified Intakes: <strong>{pendingCount} (Pending Review)</strong>
        </span>
        <button className="dashboard__button">
          View All
        </button>
      </div>

      <div className="dashboard__section">
        <h3 className="dashboard__sectionTitle">
          My Active Cases
        </h3>

        <table className="dashboard__table">
          <thead>
            <tr className="dashboard__tableRow">
              <th className="dashboard__tableHeader">Case ID</th>
              <th className="dashboard__tableHeader">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="dashboard__tableRow">
              <td className="dashboard__tableCell">#00120</td>
              <td className="dashboard__tableCell">
                Client Apr. 1, 11:00 AM : Reserved Documents on 4/15/24
              </td>
            </tr>

            <tr className="dashboard__tableRow">
              <td className="dashboard__tableCell">#00124</td>
              <td className="dashboard__tableCell">
                Client Apr. 1, 01:00 PM : Reserved Case Details on 4/15/24
              </td>
            </tr>
          </tbody>
        </table>

        <div className="dashboard__sectionFooter">
          <button className="dashboard__button">
            View All
          </button>
        </div>
      </div>

      <div className="dashboard__section">
        <h3 className="dashboard__sectionTitle">
          Recent Notifications
        </h3>

        <div className="dashboard__notification">
          Intake #1346 is due on March 19. Please review and take necessary action
        </div>

        <div className="dashboard__notification">
          Contract #C789 requires signature by March 20
        </div>

        <div className="dashboard__notification">
          New intake assigned to you: #1347
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;
