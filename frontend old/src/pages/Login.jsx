import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputField from "../component/common/InputField";
import AuthContext from "../context/authContext";

const Login = () => {

  const navigate = useNavigate();

  const { login, loading } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const resp = await login(formData); 

      const { role } = resp.data;
      if (role === "LAWYER") navigate("/lawyer");
      else if (role === "CLIENT") navigate("/client");
      else if (role === "ADMIN") navigate("/admin");
    } catch (err) {
      let message = "Something went wrong. Please try again.";

      if (err?.response) {
        message =
          err.response.data?.message ||
          err.response.data?.error ||
          "Invalid email or password";
      } else if (err?.request) {
        message = "Network error. Please check your internet connection.";
      } else {
        message = err?.message || message;
      }
      setError(message);
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <h2 className="login__title">Login</h2>

        {error && <p className="login__error">{error}</p>}

        <form onSubmit={handleSubmit} className="login__form">
          <InputField
            label="Email"
            id="login-email"
            type="email"
            name="email"
            placeholder="Enter your registered email"
            value={formData.email}
            onChange={handleChange}
            required
            wrapperClass="login__field"
            labelClass="login__label"
            inputClass="login__input"
          />

          <InputField
            label="Password"
            id="login-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            wrapperClass="login__field"
            labelClass="login__label"
            inputClass="login__input"
          />

          <button
            type="submit"
            className="login__button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login__footer">
          Don’t have an account?{" "}
          <NavLink to="/signup" className="login__signup-link">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
