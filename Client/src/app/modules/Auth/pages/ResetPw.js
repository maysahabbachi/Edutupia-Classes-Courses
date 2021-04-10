/*!
=========================================================
* Paper Kit React - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/paper-kit-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component, useState } from "react";

import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";



// reactstrap components


// core components

import axios from "axios";
import { reset } from "../_redux/authCrud";
const initialValues = {
    token: "",
    password:"",
    password2:"",

  };


    function ResetPw(props) {
        const { intl } = props;
        const [isRequested, setIsRequested] = useState(false);
        const ForgotPasswordSchema = Yup.object().shape({
          token: Yup.string()
            
            .min(3, "Minimum 10 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
              intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD",
              })
            ),
            password: Yup.string()
      .min(8, "Minimum 8 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password2: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
    
        });
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
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
        reset(values.token,values.password)
        .then(() => setIsRequested(true))
        .catch(() => {
          setIsRequested(false);
          setSubmitting(false);
          setStatus(
            intl.formatMessage(
              { id: "AUTH.VALIDATION.NOT_FOUND" },
              { name: values.token }
            )
          );
        });
    },
  });
  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Reset Password</h3>
            <div className="text-muted font-weight-bold">
              Enter your token to reset your password
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              <input
               placeholder="token"
                type="token"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "token"
                )}`}
                name="token"
                {...formik.getFieldProps("token")}
              />
              {formik.touched.token && formik.errors.token ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.token}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password2"
            )}`}
            name="password2"
            {...formik.getFieldProps("password2")}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.password2}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Submit
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

    
    

export default injectIntl(connect(null, auth.actions)(ResetPw));