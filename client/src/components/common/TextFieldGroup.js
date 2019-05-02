import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  handle,
  placeholder,
  defaultValue,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  title,
  title2,
  line,
  favorites
}) => {
  return (
    <div>
      <label>
        {title && <p className="label-txt">{title}</p>}
        {title2 && <p className="label-txt">{title2}</p>}
        <input
          type={type}
          handle={handle}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
          favorites={favorites}
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
  handle: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  title: PropTypes.string,
  title2: PropTypes.string,
  line: PropTypes.string,
  favorites: PropTypes.array
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
