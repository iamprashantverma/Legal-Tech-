const Unauthorized = () => {
  return (
    <div className="unauthorized">
      <h1>403</h1>
      <h2>Unauthorized Access</h2>
      <p>You don’t have permission to view this page.</p>

      <a href="/login" className="unauthorized-btn">
        Go to Login
      </a>
    </div>
  );
};

export default Unauthorized;
