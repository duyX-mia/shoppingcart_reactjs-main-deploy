import React, { useEffect } from "react";

import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct } from "../../redux/reducer/productSlice";
import {
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";
import * as Yup from "yup";
import { Formik } from "formik";
import { REG_LINK, REG_NUM } from "../../constant/constant";

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên SP"),
  image: Yup.string()
    .required("Vui lòng nhập link ảnh SP")
    .matches(REG_LINK, "Link ảnh SP không đúng định dạng"),
  price: Yup.string()
    .required("Vui lòng nhập giá SP")
    .matches(REG_NUM, "Vui lòng nhập số"),
  categoryId: Yup.string().required("Vui lòng chọn danh mục SP"),
  description: Yup.string().required("Vui lòng nhập mô tả SP"),
});

const AddProduct = () => {
  const { categories } = useSelector(selectCategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onSubmit = async (data) => {
    try {
      await dispatch(addProduct(data)).unwrap();
      navigate("/admin/product");
      toast.success("Thêm sản phẩm thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Thêm sản phẩm</h1>

        <Link to="/admin/product">
          <button className={styles.button}>List product</button>
        </Link>
      </div>

      <Formik
        initialValues={{
          name: "",
          image: "",
          price: "",
          categoryId: "",
          description: "",
        }}
        onSubmit={onSubmit}
        validationSchema={ProductSchema}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <p>
              <label htmlFor="name">Name:</label>
              <input
                className={styles.formControl}
                type="text"
                name="name"
                id="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
              />

              {errors.name && touched.name && (
                <p className={styles.errorMsg}>{errors.name}</p>
              )}
            </p>

            <p>
              <label htmlFor="image">Image:</label>
              <input
                className={styles.formControl}
                type="text"
                name="image"
                id="image"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.image}
              />

              {errors.image && touched.image && (
                <p className={styles.errorMsg}>{errors.image}</p>
              )}
            </p>

            <p>
              <label htmlFor="price">Price:</label>
              <input
                className={styles.formControl}
                type="text"
                name="price"
                id="price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
              />

              {errors.price && touched.price && (
                <p className={styles.errorMsg}>{errors.price}</p>
              )}
            </p>

            <p>
              <label htmlFor="categoryId">Category:</label>

              <select
                name="categoryId"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoryId}
              >
                <option value="">Chọn danh mục sản phẩm</option>
                {categories.map((it) => (
                  <option key={`category-item-${it.id}`} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>

              {errors.categoryId && touched.categoryId && (
                <p className={styles.errorMsg}>{errors.categoryId}</p>
              )}
            </p>

            <p>
              <label htmlFor="description">Description:</label>
              <textarea
                className={styles.formControl}
                type="text"
                name="description"
                id="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
              />

              {errors.description && touched.description && (
                <p className={styles.errorMsg}>{errors.description}</p>
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

export default AddProduct;
