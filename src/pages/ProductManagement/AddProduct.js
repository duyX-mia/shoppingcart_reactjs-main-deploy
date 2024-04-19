import React, { useEffect } from "react";

import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProduct } from "../../redux/reducer/productSlice";
import {
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";

const AddProduct = () => {
  const { categories } = useSelector(selectCategories);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label htmlFor="name">Name:</label>
          <input
            className={styles.formControl}
            type="text"
            name="name"
            id="name"
            {...register("name", {
              required: "Vui lòng nhập tên sản phẩm",
            })}
          />

          {errors.name?.message && (
            <p className={styles.errorMsg}>{errors.name?.message}</p>
          )}
        </p>

        <p>
          <label htmlFor="image">Image:</label>
          <input
            className={styles.formControl}
            type="text"
            name="image"
            id="image"
            {...register("image", {
              required: "Vui lòng nhập link ảnh sản phẩm",
            })}
          />

          {errors.image?.message && (
            <p className={styles.errorMsg}>{errors.image?.message}</p>
          )}
        </p>

        <p>
          <label htmlFor="price">Price:</label>
          <input
            className={styles.formControl}
            type="text"
            name="price"
            id="price"
            {...register("price", {
              required: "Vui lòng nhập giá sản phẩm",
            })}
          />

          {errors.price?.message && (
            <p className={styles.errorMsg}>{errors.price?.message}</p>
          )}
        </p>

        <p>
          <label htmlFor="categoryId">Category:</label>

          <select
            name="categoryId"
            {...register("categoryId", {
              required: "Vui lòng chọn danh mục SP",
            })}
          >
            <option value="">Chọn danh mục sản phẩm</option>
            {categories.map((it) => (
              <option key={`category-item-${it.id}`} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>

          {errors.categoryId?.message && (
            <p className={styles.errorMsg}>{errors.categoryId?.message}</p>
          )}
        </p>

        <p>
          <label htmlFor="description">Description:</label>
          <textarea
            className={styles.formControl}
            type="text"
            name="description"
            id="description"
            {...register("description", {
              required: "Vui lòng nhập mô tả sản phẩm",
            })}
          />

          {errors.description?.message && (
            <p className={styles.errorMsg}>{errors.description?.message}</p>
          )}
        </p>

        <p className={styles.btnWrap}>
          <input type="submit" value="Add" className={styles.addBtn} />
        </p>
      </form>
    </div>
  );
};

export default AddProduct;
