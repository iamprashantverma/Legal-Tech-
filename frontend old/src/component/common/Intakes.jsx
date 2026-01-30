import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination.jsx";
import { addReview } from "../../service/api/lawyer-service.js";
const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "In Review", value: "IN_REVIEW" },
];

const Intakes = ({ fetchFn, defaultStatus = "", showFilter = true, showComment=false}) => {
  
  const [cases, setCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState(defaultStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCases = async (page, selectedStatus) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetchFn({
        page,
        limit: PAGE_SIZE,
        status: selectedStatus || undefined,
      });
      console.log(res);

      setCases(res.data.data.data);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to load records. Please try again."
      );
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases(currentPage, status);
  }, [currentPage, status]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="intakes__header">
        {showFilter && (
          <div className="intakes__filter-wrapper">
            <span className="intakes__filter-icon">🔍</span>

            <select
              className="intakes__filter"
              value={status}
              onChange={handleStatusChange}
              disabled={loading}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <div className="intakes__error">{error}</div>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Case Type</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Submitted On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading…</td>
              </tr>
            ) : cases.length === 0 ? (
              <tr>
                <td colSpan="6">No records found</td>
              </tr>
            ) : (
              cases.map((item) => (
                <tr key={item.id}>
                  <td>#{item.id}</td>
                  <td>{item.caseType}</td>
                  <td>
                    <span
                      className={`status ${item.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.priority}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <Link
                      to={`/client/intakes/${item.id}`}
                      className="view-btn"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disabled={loading}
      />
    </>
  );
};

export default Intakes;
