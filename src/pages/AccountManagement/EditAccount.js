import React, { useEffect } from "react";

import styles from "./Account.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  editAccount,
  fetchAccount,
  resetAccount,
  selectAccountState,
} from "../../redux/reducer/AccountsSlide";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { SignUpSchema } from "../SignUp/Signup";

const EditAccount = () => {
  const { account } = useSelector(selectAccountState);
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccountById();

    return () => {
      dispatch(resetAccount());
    };
  }, [params?.id]);

  const fetchAccountById = () => {
    dispatch(fetchAccount(params?.id));
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(editAccount({ id: params?.id, ...data })).unwrap();
      navigate("/admin/account");
      toast.success("Cập nhật tài khoản thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Cập nhật tài khoản</h1>

        <Link to="/admin/account">
          <button className={styles.button}>List account</button>
        </Link>
      </div>

      <Formik
        enableReinitialize
        initialValues={account}
        onSubmit={onSubmit}
        validationSchema={SignUpSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
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
              <input type="submit" value="Update" className={styles.addBtn} />
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditAccount;
