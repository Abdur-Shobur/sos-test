import React from "react";

function TextArea({ dispatch, name, label, row, error, placeholder }) {
  return (
    <>
      <label className="form-label">
        {label}{" "}
        {error && (
          <span style={{ fontSize: "10px", color: "#ff4e4e" }}>({error})</span>
        )}
      </label>
      <textarea
        onChange={(e) =>
          dispatch({
            type: "INPUT",
            payload: {
              name: e.target.name,
              value: e.target.value,
            },
          })
        }
        style={{
          border: error && "1px solid #ffa7a7",
        }}
        name={name}
        className="form-control"
        rows={row}
        placeholder={placeholder}
      ></textarea>
    </>
  );
}

export default TextArea;
