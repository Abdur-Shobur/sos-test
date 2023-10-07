import React from "react";
import { ClipLoader } from "react-spinners";
import ReactStars from "react-rating-stars-component";
import TextArea from "../../formComponent/TextArea";

function SupportRatting({
  data,
  hanldeSubmitRating,
  ratingChanged,
  userRating,
  loading,
  dispatch,
  rating_comment
}) {
  return (
    <div>
      {data?.rating === null ? (
        <form onSubmit={hanldeSubmitRating}>
          <div
            style={{
              width: "350px",
              margin: "0 auto",
              textAlign: "center",
              background: "#eee",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <label style={{ fontSize: "22px" }} className="m-0">
              Please Rate
            </label>
            <p>1 out of 5</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ReactStars
                classNames="justify-content-center"
                style={{ justifyContent: "center" }}
                count={5}
                onChange={ratingChanged}
                size={28}
                isHalf={true}
                activeColor="#ffd700"
              />
            </div>
            <div style={{ textAlign: "left" }} className="col-lg-12">
              <div className="form-group position-relative">
                <TextArea
                  name={rating_comment}
                  require={true}
                  label={"Your Message"}
                  dispatch={dispatch}
                  placeholder={"Share your fellings"}
                  dispatch_type={"INPUT"}
                  id={"admin-add-affiliates-email"}
                />
              </div>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading || userRating === 0}
            >
              Submit {loading && <ClipLoader color="#36d7b7" size={13} />}
            </button>
          </div>
        </form>
      ) : (
        <div className="d-flex justify-content-center">
          <p
            className="btn btn-sm btn-info px-4"
            style={{
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            Thank you very much for your rating. <br />
            Support is Closed !
          </p>
        </div>
      )}
    </div>
  );
}

export default SupportRatting;
