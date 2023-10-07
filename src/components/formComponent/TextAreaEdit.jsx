import React from "react";

function TextAreaEdit({
  dispatch,
  name,
  label,
  row,
  defaultValue,
  error,
  readOnly,
}) {
  return (
    <>
      <label className="form-label">
        {label}{" "}
        {error && (
          <span>
            <span style={{ fontSize: "10px", color: "#ff4e4e" }}>
              ({error})
            </span>
          </span>
        )}{" "}
      </label>
      <textarea
        style={{ border: error && "1px solid #ffa7a7" }}
        name={name}
        readOnly={readOnly}
        rows={row}
        defaultValue={defaultValue}
        className="form-control"
        onChange={(e) =>
          dispatch({
            type: "INPUT",
            payload: {
              name: e.target.name,
              value: e.target.value,
            },
          })
        }
      ></textarea>
    </>
  );
}

export default TextAreaEdit;
