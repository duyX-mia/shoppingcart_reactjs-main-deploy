import React, { useEffect } from "react";

import styles from "./Product.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";
import {
  editProduct,
  getProduct,
  resetProduct,
  selectProduct,
} from "../../redux/reducer/productSlice";
import { Formik } from "formik";
import { ProductSchema } from "./AddProduct";

const EditProduct = () => {
  const { totalCategories: categories } = useSelector(selectCategories);
  const { product } = useSelector(selectProduct);
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    params?.id && fetchProductById();

    return () => {
      dispatch(resetProduct());
    };
  }, [params?.id]);

  const fetchProductById = async () => {
    dispatch(getProduct(params?.id));
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(editProduct(data)).unwrap();
      navigate("/admin/product");
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Cập nhật sản phẩm</h1>

        <Link to="/admin/product">
          <button className={styles.button}>List product</button>
        </Link>
      </div>

      <Formik
        enableReinitialize
        initialValues={product}
        onSubmit={onSubmit}
        validationSchema={ProductSchema}
      >
        {({
          handleBlur,
          handleSubmit,
          handleChange,
          values,
          errors,
          touched,
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

            <p>
              <label htmlFor="image">Image:</label>
              <input
                className={styles.formControl}
                type="text"
                name="image"
                id="image"
                onChange={handleChange}
                onBlur={handleBlur}
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
                onChange={handleChange}
                onBlur={handleBlur}
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
                onChange={handleChange}
                onBlur={handleBlur}
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />

              {errors.description && touched.description && (
                <p className={styles.errorMsg}>{errors.description}</p>
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

export default EditProduct;
