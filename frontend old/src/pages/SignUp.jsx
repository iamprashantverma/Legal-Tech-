import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../component/common/InputField";
import { signup } from "../service/api/auth-service.js";

const SignUp = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { confirmPassword, ...payload } = formData;
      await signup(payload);

      toast.success("Account created successfully. Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__card">
        <h2 className="signup__title">Create your account</h2>
        <p className="signup__subtitle">
          Join LegalTech to manage your cases efficiently
        </p>

        {error && <div className="signup__error">{error}</div>}

        <form onSubmit={handleSubmit} className="signup__form">
          <InputField
            label="Full Name"
            id="signup-name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            wrapperClass="signup__field"
            labelClass="signup__label"
            inputClass="signup__input"
          />

          <InputField
            label="Email"
            id="signup-email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
            wrapperClass="signup__field"
            labelClass="signup__label"
            inputClass="signup__input"
          />

          <InputField
            label="Password"
            id="signup-password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
            wrapperClass="signup__field"
            labelClass="signup__label"
            inputClass="signup__input"
          />

          <InputField
            label="Confirm Password"
            id="signup-confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            wrapperClass="signup__field"
            labelClass="signup__label"
            inputClass="signup__input"
          />

          <button
            type="submit"
            className="signup__button"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="signup__footer">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
