import React from "react";

import styles from "./Category.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCategory } from "../../redux/reducer/categorySlice";
import * as Yup from "yup";
import { Formik } from "formik";

export const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên danh mục"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(addCategory(data)).unwrap();
      navigate("/admin/category");
      toast.success("Thêm danh mục thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Thêm danh mục</h1>

        <Link to="/admin/category">
          <button className={styles.button}>List category</button>
        </Link>
      </div>

      <Formik
        initialValues={{ name: "" }}
        onSubmit={onSubmit}
        validationSchema={CategorySchema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <p>
              <label htmlFor="name">Name:</label>
              <input
                className={styles.formControl}
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              {errors.name && touched.name && (
                <p className={styles.errorMsg}>{errors.name}</p>
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

export default AddCategory;
