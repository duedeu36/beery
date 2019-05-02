import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  defaultValue,
  value,
  error,
  info,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div>
      <label>
        <select
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          className={classnames("input", {
            "form-control is-invalid": error
          })}
        >
          {selectOptions}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
        {info && <small className="form-text text-muted">{info}</small>}
      </label>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
