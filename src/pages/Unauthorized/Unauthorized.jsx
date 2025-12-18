import React from 'react';


const Unauthorized = ({unAuthorizedUser}) => {
    
    const setUnAuthorizedUser = ()=>{
        unAuthorizedUser();
    }
    return (
        <div className="not-found">
        <div className="not-found-content">
            <div className="error-code">{"401"}</div>
            <h2 className="error-message">{"User ID is invalid or not approved."}</h2>
            <p className="error-description">
                {"The User ID you are trying to access may have been removed, renamed, or is temporarily unavailable."}
            </p>
            <button onClick={setUnAuthorizedUser} className="not-found-content-button">
                {"Back To Login"}
            </button>
        </div>
        </div>
    );
};

export default Unauthorized;