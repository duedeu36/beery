import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  defaultValue,
  placeholder,
  icon,
  type,
  error,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepand">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={classnames("input", {
          "form-control is-invalid": error
        })}
        style={{ border: "2px solid #D8D8D8" }}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaulrProps = {
  type: "text"
};

export default InputGroup;
