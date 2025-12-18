import React from "react";
import AccessImage from "../../assets/images/accessRequired.svg";
const AccessRequired = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <img src={AccessImage} alt="AccessImage"  className="w-25" />
        <h2 className="error-message mt-3">{"Access Required"}</h2>
        <p className="error-description-access">
          {"You don’t currently have permission to view Boards."}
        </p>
        <p className="error-description-access">
          {
            "Kindly contact the Admin or Product team to get the required access and board permissions"
          }
        </p>
      </div>
    </div>
  );
};

export default AccessRequired;
