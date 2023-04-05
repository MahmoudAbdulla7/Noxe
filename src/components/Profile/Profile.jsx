import React from "react";

export default function Profile({ userData }) {
  let { first_name, last_name, age, email } = userData;

  return (
    <>
      <div className="container shadow-lg d-flex justify-content-center">
        <div className="userData p-5 my-5">
          <h4 className="fw-bolder">
            Name :{" "}
            <span className="fw-light">
              {first_name} {last_name}
            </span>
          </h4>

          <h4 className="fw-bolder">
            Email :<span className="fw-light"> {email}</span>
          </h4>
          <h4 className="fw-bolder">
            Age :<span className="fw-light"> {age}</span>
          </h4>
        </div>
      </div>
    </>
  );
}
