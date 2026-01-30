import React, { useEffect, useState } from "react";

const PendingIntakes = () => {
  const [intakes, setIntakes] = useState([]);

  useEffect(() => {
    setIntakes([
      {
        id: "#INT-01",
        type: "Criminal",
        status: "Pending",
        lawyer: "-",
        date: "12/01/2026",
      },
    ]);
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Intake ID</th>
            <th>Case Type</th>
            <th>Status</th>
            <th>Assigned Lawyer</th>
            <th>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {intakes.length ? (
            intakes.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.type}</td>
                <td>
                  <span className="status pending">{item.status}</span>
                </td>
                <td>{item.lawyer}</td>
                <td>{item.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty-state">
                No pending intakes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingIntakes;
