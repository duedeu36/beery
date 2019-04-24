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
  title,
  title2,
  line
}) => {
  return (
    <div>
      <label>
        {title && <p className="label-txt">ENTER YOUR {title}</p>}
        {title2 && <p className="label-txt">CONFIRM YOUR {title2}</p>}
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
        {line && (
          <div className="line-box">
            <div className="line" />
          </div>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
        {info && <small className="form-text text-muted">{info}</small>}
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
  title: PropTypes.string,
  title2: PropTypes.string,
  line: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
