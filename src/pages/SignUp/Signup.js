import React from "react";

import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/reducer/authSlice";
import { toast } from "react-toastify";

import { Formik } from "formik";
import * as Yup from "yup";
import { REG_EMAIL, REG_USERNAME } from "../../constant/constant";

export const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .required("Vui lòng nhập username")
    .matches(REG_USERNAME, "Username không đúng định dạng"),
  email: Yup.string()
    .required("Vui lòng nhập email")
    .matches(REG_EMAIL, "Email không đúng định dạng"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(4, "Mật khẩu tối thiểu 4 ký tự"),
});

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await dispatch(signUp(data)).unwrap();
      navigate("/sign-in");
      toast.success("Đăng ký tài khoản thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={SignUpSchema}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <form autoComplete="on" onSubmit={handleSubmit}>
            <h1>SignUp</h1>
            <p>
              <label htmlFor="username">Username:</label>
              <input
                className={styles.formControl}
                type="text"
                name="username"
                id="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />

              {errors.username && touched.username && (
                <p className={styles.errorMsg}>{errors.username}</p>
              )}
            </p>
            <p>
              <label htmlFor="email">Email:</label>
              <input
                className={styles.formControl}
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && (
                <p className={styles.errorMsg}>{errors.email}</p>
              )}
            </p>
            <p>
              <label htmlFor="password">Password:</label>
              <input
                className={styles.formControl}
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <p className={styles.errorMsg}>{errors.password}</p>
              )}
            </p>
            <p>
              <input type="submit" value="SignUp" id="signUpBtn" />
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
