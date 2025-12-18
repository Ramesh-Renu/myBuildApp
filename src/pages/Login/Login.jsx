import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { setExpiresOn, setActiveWorkSpace } from "../../utils/storage";
import Spinner from "../../components/spinner/spinner.component";
import appConstants from "../../constant/common";
import Unauthorized from "../../pages/Unauthorized/Unauthorized";
import useToast from "../../hooks/useToast";
import { getLogin, createUser } from "../../services";
export default function Login() {
  const { showToast } = useToast();
  const [isTokenSuccess, setIsTokenSuccess] = useState();
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(false);
  const [activateSignUpSuccess, setActivateSignUpSuccess] = useState(false);
  const [euButtonHide, setEuButtonHide] = useState(false);
  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "",
  });
  const [mandatoryField, setMandatoryField] = useState({
    firstName: true,
    lastName: false,
    password: true,
    email: true,
    role: true,
  });
  const [errorMsg, setErrorMsg] = useState({
    firstName: false,
    lastName: false,
    password: false,
    email: false,
    role: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [getUserName, setGetUserName] = useState("");
  const [getPasswordName, setGetPasswordName] = useState("");
  const [haveLogin, setHaveLogin] = useState(true);

  /** Login Redirection */
  const handleLogin = async (loginData) => {
    try {
      setInProgress(true);
      const response = await getLogin(loginData); // ⏳ wait here
      if (response.success) {
        showToast({
          message: response?.message,
          variant: "success",
        });
      } else {
        showToast({
          message: response?.message,
          variant: "danger",
        });
      }
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Login Failed");
    } finally {
      setInProgress(false);
    }
  };

  /** Login Redirection */
  const handleCreateUser = async () => {
    try {
      setInProgress(true);
      const updatedFormData = {
        ...formData, // Keep the existing properties
        name: formData.firstName + " " + formData.lastName, // Combine firstName and lastName into name
      };
      delete updatedFormData.firstName; // Remove firstName
      delete updatedFormData.lastName; // Remove lastName
      const response = await createUser(updatedFormData); // ⏳ wait here
      if (response.success) {
        showToast({
          message: response?.message,
          variant: "success",
        });
      } else {
        showToast({
          message: response?.message,
          variant: "danger",
        });
      }
    } catch (err) {
      showToast("error", err?.response?.data?.message || "Login Failed");
    } finally {
      setInProgress(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData, mandatoryField, isSubmitted]);

  /** Validate Form Status */
  const validateForm = () => {
    const isFirstNameValid = mandatoryField.firstName
      ? formData.firstName.trim() !== ""
      : true;
    const isLastNameValid = mandatoryField.lastName
      ? formData.lastName.trim() !== ""
      : true;
    const isEmailValid = mandatoryField.email
      ? formData.email.trim() !== "" &&
        new RegExp(appConstants.VALIDATION_PATTERNS.email).test(formData.email)
      : true;
    const isAgencyNameValid = mandatoryField.agencyName
      ? formData.agencyName.trim() !== ""
      : true;
    const isCountryValid = mandatoryField.country
      ? formData.country.length > 0
      : true;
    const isPhoneValid = mandatoryField.phone
      ? formData.phone.trim() !== ""
      : true;

    setIsFormValid(
      isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isAgencyNameValid &&
        isCountryValid &&
        isPhoneValid
    );
    if (isSubmitted) {
      setErrorMsg({
        firstName: !isFirstNameValid,
        lastName: !isLastNameValid,
        email: !isEmailValid,
        invalidEmail: !new RegExp(appConstants.VALIDATION_PATTERNS.email).test(
          formData.email.trim()
        ),
        agencyName: !isAgencyNameValid,
        country: !isCountryValid,
        phone: !isPhoneValid,
      });
    }

    return isFormValid;
  };

  /** AUTO FOCUS ON FIRST INPUT FIELD */
  const inputRef = useRef(null);
  useEffect(() => {
    if (activeForm && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeForm]);

  const unAuthorizedUserRequestFailed = () => {
    setExpiresOn("");
    setActiveWorkSpace("");
    setIsRequestFailed(false);
  };

  const hanldeUserName = (e) => {
    setGetUserName(e.target.value);
  };
  const hanldePassswordName = (e) => {
    setGetPasswordName(e.target.value);
  };
  const handleSubmitLogin = () => {
    const paraData = {
      name: getUserName,
      password: getPasswordName,
    };
    handleLogin(paraData);
  };

  const handleCreateLogin = () => {
    setHaveLogin(!haveLogin);

    // handleCreateUser("createUser", paraData);
  };
  return (
    <>
      {!isAuthenticated && (
        <div className="login-page">
          <div className="login-form">
            <div className="login-form-banner">
              {!activateSignUpSuccess && (
                <p className="login-form-container-title">{"Welcome!"}</p>
              )}
              <div className="login-form-banner-image">
                {haveLogin && (
                  <>
                    <label>
                      User Name &#160;
                      <input
                        type="text"
                        value={getUserName}
                        onChange={hanldeUserName}
                      />
                    </label>
                    <label>
                      Password &#160; &#160;
                      <input
                        type="password"
                        value={getPasswordName}
                        onChange={hanldePassswordName}
                      />
                    </label>
                  </>
                )}
                {!haveLogin && (
                  <>
                    <label>
                      First Name &#160;
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Last Name &#160;
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Email &#160; &#160; &#160; &#160; &#160;&#160;
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Password &#160; &#160;
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Role &#160; &#160; &#160; &#160; &#160; &#160;&#160;
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                      />
                    </label>
                  </>
                )}
                {haveLogin && (
                  <button
                    disabled={getUserName === "" || getPasswordName === ""}
                    className="login-form-banner-login-button"
                    onClick={handleSubmitLogin}
                  >
                    Login
                  </button>
                )}
                {haveLogin && (
                  <p className="login-para">
                    Don't have an account ? &#160;&#160;
                    <button
                      className="login-form-banner-signup-button"
                      onClick={handleCreateLogin}
                    >
                      Signup
                    </button>
                  </p>
                )}
                {!haveLogin && (
                  <button
                    disabled={
                      formData.firstName === "" &&
                      formData.email === "" &&
                      formData.password === "" &&
                      formData.role === ""
                    }
                    className="login-form-banner-login-button"
                    onClick={handleCreateUser}
                  >
                    Create User
                  </button>
                )}
                {!haveLogin && (
                  <p className="login-para">
                    You have an account !&#160; &#160;
                    <button
                      className="login-form-banner-signup-button"
                      onClick={handleCreateLogin}
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
            {activeForm && activeForm == "login" && (
              <div className="login-form-container">
                <span>{"Loading"}...</span>
              </div>
            )}
          </div>
        </div>
      )}{" "}
      {isAuthenticated && !isRequestFailed && <Spinner />}
      {isAuthenticated && isRequestFailed && (
        <Unauthorized unAuthorizedUser={unAuthorizedUserRequestFailed} />
      )}
    </>
  );
}
