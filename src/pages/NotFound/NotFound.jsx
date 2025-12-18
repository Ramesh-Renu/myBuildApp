import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({...props}) => {
    return (
        <div className="not-found">
        <div className="not-found-content">
            {props.code !== "400" && <div className="error-code">{props.code? "Not Found "+props.code : "Not Found 404"}</div> }
            <h2 className="error-message">
                {props?.code? ((props?.name ? props?.name+" " : "")+ `Not Found ${props.code}`) : "page not found"}
                </h2>
            <p className="error-description">
                {props.code? "You tried to access a page you did not have prior authorization for."+props.code : "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
            </p>
            <Link to="/" className="not-found-content-button">
                {"Back To Home"}
            </Link>
        </div>
        </div>
    );
};

export default NotFound;