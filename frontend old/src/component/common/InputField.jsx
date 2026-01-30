import React from "react";

const InputField = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  wrapperClass = "form__field",
  labelClass = "form__label",
  inputClass = "form__input"
}) => {
  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
};

export default InputField;
