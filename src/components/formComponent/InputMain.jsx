// this input use for main input just get data

function InputMain({
  dispatch,
  name,
  type,
  placeholder,
  dispatch_type,
  label,
  require,
  id,
  autoComplete,
  error,
}) {
  return (
    <>
      <label htmlFor={id}>
        {label}{" "}
        {error && (
          <span style={{ fontSize: "10px", color: "#ff4e4e" }}>({error})</span>
        )}
      </label>
      <input
        onChange={(e) => {
          dispatch({
            type: dispatch_type,
            payload: {
              name: e.target.name,
              value:
                type === "number" ? parseInt(e.target.value) : e.target.value,
            },
          });
        }}
        required={require}
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className="form-control"
        autoComplete={"off"}
        style={{
          border: error && "1px solid #ffa7a7",
        }}
      />
    </>
  );
}

export default InputMain;
