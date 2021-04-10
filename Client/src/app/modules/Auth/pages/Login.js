import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, Button,TextField, InputAdornment, IconButton } from '@material-ui/core';
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login,loginGmail } from "../_redux/authCrud";
import {GoogleLogin} from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import decode from 'jwt-decode';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "nejii@esprit.com",
  password: "ghzouani",
};
const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
};

function Login(props) {
  const { intl } = props;
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(7, "Minimum 8 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  // const googleSuccess = async (res) => {
  //   console.log(res);
  //   const result = res?.profileObj;
  //   console.log(result);
  //   console.log("ddd"+result.email+result.givenName+result.familyName);
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: props, data: { result, token } });
  //     console.log("ddd"+token )
  //     const decodeToken= decode(token);
  //     console.log("decode   "+decodeToken);
  //     props.login(token)
  //     history.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const googleSuccess = async (response) => {
    console.log(response)
    try {
      const tokenId= response.tokenId
      console.log(tokenId)
      setTimeout(() => {
        loginGmail(tokenId)
          .then(({ data: {token} }) => { 
            console.log("googleres") 
           
           
            localStorage.setItem("jwtToken", token);
            console.log(token);
            disableLoading();
            props.login(token);
            console.log("vv");
          })
          .catch(() => {
            disableLoading();
            
          
          });
      }, 1000);

        
    } catch (err) {
        
        alert('Google Sign In was unsuccessful. Try again later'); 
        
    }
}


  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { token } }) => {
            console.log(token);
            localStorage.setItem("jwtToken", token);
            disableLoading();
            props.login(token);
            console.log("vv");
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">
              Use account <strong>admin@demo.com</strong> and password{" "}
              <strong>demo</strong> to continue.
            </div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Email"
            type="email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <TextField
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
            InputProps={{ // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
          <GoogleLogin
            clientId="86559713029-sau39ta8lgackd248d1e7rcsebp6bssg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton,'px-9 py-4 my-3'} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy={'single_host_origin'}
          />
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
