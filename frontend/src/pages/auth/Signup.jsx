import React, { useState ,useEffect} from "react";
import { signup } from "../../services/api/auth-service";
import FormInput from "../../component/form/FormInput";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useContext } from "react";
import { redirectByRole } from "../../utils/redirectByRole";
const Signup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
  if (user) {
    redirectByRole(user, navigate);
  }
}, [user, navigate]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await signup(formData);
      alert("Signup successful!"); // Replace with redirect/login
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      // Backend error handling
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: err.message || "Signup failed" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth__wrapper">
      <h2 className="auth__title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        {errors.general && <div className="form__error">{errors.general}</div>}

        <FormInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.name}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          showPasswordToggle={true}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          isPasswordVisible={showPassword}
        />

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
