import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  defaultValue,
  placeholder,
  error,
  info,
  onChange,
  line,
  border
}) => {
  return (
    <div>
      <label>
        <textarea
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          border={border}
          className={classnames("input", {
            "form-control is-invalid": error
          })}
          style={{ border: "2px solid #D8D8D8" }}
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

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;
