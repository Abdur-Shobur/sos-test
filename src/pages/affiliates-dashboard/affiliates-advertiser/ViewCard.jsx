import React from "react";
import { IMG_PATH } from "../../../components/env";

function ViewCard({ data, isImg = false, advertise_placement }) {
  return (
    <div className="card">
      <div
        className="card-header"
        style={{
          backgroundColor: "#e1eef1",
          color: "#000",
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        {data?.[0]?.replace(/_/g, " ")}
      </div>

      {advertise_placement &&
        advertise_placement?.map((x, i) => (
          <div className="d-flex mt-3 ml-3" key={i}>
            <div
              className="card"
              style={{
                width: "18rem",
                borderEndEndRadius: "0",
                borderStartEndRadius: "0",
              }}
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Story Reels</li>
                <li className="list-group-item">Search Result</li>
                <li className="list-group-item">Messages</li>
                <li className="list-group-item">Feeds</li>
                <li className="list-group-item">Apps And Sites</li>
                <li className="list-group-item">Advertise id</li>
                <li className="list-group-item">Adds Video And Reels</li>
              </ul>
            </div>
            <div
              className="card"
              style={{
                width: "18rem",
                borderEndStartRadius: "0",
                borderStartStartRadius: "0",
              }}
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{x?.story_reels || "N/A"}</li>
                <li className="list-group-item">{x?.search_result || "N/A"}</li>
                <li className="list-group-item">{x?.messages || "N/A"}</li>
                <li className="list-group-item">{x?.feeds || "N/A"}</li>
                <li className="list-group-item">
                  {x?.apps_and_sites || "N/A"}
                </li>
                <li className="list-group-item">{x?.advertise_id || "N/A"}</li>
                <li className="list-group-item">
                  {x?.adds_video_and_reels || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        ))}
      <div
        className="card-body"
        style={{
          display: "flex",
          gap: "20px",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        {/* <h5 className="card-title">Special title treatment</h5> */}
        {isImg &&
          isImg?.map((e) => (
            <div
              className="card"
              style={{
                maxWidth: "250px",
                maxHeight: "250px",
                objectFit: "cover",
              }}
            >
              <img
                style={{ padding: "14px", borderRadius: "20px" }}
                src={IMG_PATH + "/" + e?.file}
                className="card-img-top"
                alt="..."
              />
            </div>
          ))}
        {data?.[1] && <p className="card-text">{data?.[1]} </p>}
      </div>
    </div>
  );
}

export default ViewCard;
