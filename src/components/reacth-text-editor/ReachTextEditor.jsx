import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReachTextEditor({ value, dispatch, name = "long_description" }) {
  const handleChange = (content) => {
    dispatch({
      type: "INPUT",
      payload: {
        name: name,
        value: content,
      },
    });
  };
  return (
    <ReactQuill
      theme="snow"
      value={value}
      name={name}
      onChange={handleChange}
      style={{ minHeight: "150px" }}
    />
  );
}

export default ReachTextEditor;
