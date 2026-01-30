import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">Page Not Found</h2>
      <p className="not-found__description">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/" className="not-found__link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
