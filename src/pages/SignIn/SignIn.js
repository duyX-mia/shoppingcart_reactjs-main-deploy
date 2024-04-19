import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SignIn.module.scss";
import { toast } from "react-toastify";
import { fetchAccounts } from "../../redux/reducer/AccountsSlide";
import { signIn } from "../../redux/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { REG_EMAIL } from "../../constant/constant";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Vui lòng nhập email")
    .matches(REG_EMAIL, "Email không đúng định dạng"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu")
    .min(4, "Mật khẩu tối thiểu 4 ký tự"),
});

function SignIn() {
  const { isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isLogged && navigate("/admin");
  }, [isLogged]);

  const onSubmit = async ({ email, password }) => {
    try {
      const accounts = await dispatch(fetchAccounts()).unwrap();

      const findUser = accounts.find(
        (it) => it.email === email && it.password === password
      );

      if (findUser) {
        dispatch(signIn(findUser));
        toast.success("Đăng nhập thành công");
      } else {
        toast.error("Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="form-container">
      <Formik
        onSubmit={onSubmit}
        validationSchema={SignInSchema}
        initialValues={{ email: "", password: "" }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form autoComplete="on" onSubmit={handleSubmit}>
            <h1>Login</h1>
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
              <input type="submit" value="Login" id="signInBtn" />
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
