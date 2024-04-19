import React from "react";

import styles from "./Account.module.css";
import { Link, useNavigate } from "react-router-dom";
import { addAccount } from "../../redux/reducer/AccountsSlide";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { SignUpSchema } from "../SignUp/Signup";

const AddAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(addAccount(data)).unwrap();
      navigate("/admin/account");
      toast.success("Thêm tài khoản thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Thêm tài khoản</h1>

        <Link to="/admin/account">
          <button className={styles.button}>List account</button>
        </Link>
      </div>

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
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form
            className={styles.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <p>
              <label htmlFor="username">Username:</label>
              <input
                className={styles.formControl}
                type="text"
                name="username"
                id="username"
                onBlur={handleBlur}
                onChange={handleChange}
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
                onBlur={handleBlur}
                onChange={handleChange}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />

              {errors.password && touched.password && (
                <p className={styles.errorMsg}>{errors.password}</p>
              )}
            </p>

            <p className={styles.btnWrap}>
              <input type="submit" value="Add" className={styles.addBtn} />
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddAccount;
