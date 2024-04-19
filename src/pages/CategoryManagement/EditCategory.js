import React, { useEffect } from "react";

import styles from "./Category.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  editCategory,
  getCategory,
  resetCategory,
  selectCategories,
} from "../../redux/reducer/categorySlice";
import { Formik } from "formik";
import { CategorySchema } from "./AddCategory";

const EditCategory = () => {
  const { category } = useSelector(selectCategories);
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    params?.id && fetchCategoryById();

    return () => {
      dispatch(resetCategory());
    };
  }, [params?.id]);

  const fetchCategoryById = () => {
    dispatch(getCategory(params?.id));
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(editCategory(data)).unwrap();
      navigate("/admin/category");
      toast.success("Cập nhật danh mục thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Cập nhật danh mục</h1>

        <Link to="/admin/category">
          <button className={styles.button}>List category</button>
        </Link>
      </div>

      <Formik
        enableReinitialize
        initialValues={category}
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
              <input type="submit" value="Update" className={styles.addBtn} />
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditCategory;
