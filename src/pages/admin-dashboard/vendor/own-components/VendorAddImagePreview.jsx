import React from "react";

function VendorAddImagePreview({
  dispatch,
  data,
  multi = false,
  name,
  url_name,
}) {
  return (
    <div className="d-flex align-items-center gap-3">
      <div>
        <img
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={data}
          alt=""
        />
      </div>
      <div className="custom-file ml-3">
        {!multi ? (
          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "FILE",
                payload: e.target.files[0],
              })
            }
            name="image"
            className="custom-file-input"
            id="coverImage"
            accept="image/*"
          />
        ) : (
          <input
            type="file"
            onChange={(e) =>
              dispatch({
                type: "FILE_WITH_NAME",
                payload: {
                  name: name,
                  url: url_name,
                  value: e.target.files[0],
                },
              })
            }
            name="image"
            className="custom-file-input"
            id="coverImage"
            accept="image/*"
          />
        )}
        <label className="custom-file-label" htmlFor="coverImage">
          Choose file...
        </label>
        <div className="invalid-feedback">
          Example invalid custom file feedback
        </div>
      </div>
    </div>
  );
}

export default VendorAddImagePreview;
