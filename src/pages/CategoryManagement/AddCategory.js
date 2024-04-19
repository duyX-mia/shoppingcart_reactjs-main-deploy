import React from "react";

import styles from "./Category.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCategory } from "../../redux/reducer/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label htmlFor="name">Name:</label>
          <input
            className={styles.formControl}
            type="text"
            name="name"
            id="name"
            {...register("name", {
              required: "Vui lòng nhập tên danh mục",
            })}
          />

          {errors.name?.message && (
            <p className={styles.errorMsg}>{errors.name?.message}</p>
          )}
        </p>

        <p className={styles.btnWrap}>
          <input type="submit" value="Add" className={styles.addBtn} />
        </p>
      </form>
    </div>
  );
};

export default AddCategory;
