import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  defaultValue,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  className,
  title
}) => {
  return (
    <div>
      <label>
        {title && <p className="label-txt">ENTER YOUR {title}</p>}
        <input
          type={type}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
          className={classnames("input", {
            "form-control is-invalid": error
          })}
        />
        <div className="line-box">
          <div className="line" />
        </div>
        {/* {info && <small className="form-text text-muted">{info}</small>} */}
        {error && <div className="invalid-feedback">{error}</div>}
      </label>
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  title: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
