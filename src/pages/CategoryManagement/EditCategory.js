import React, { useEffect } from "react";

import styles from "./Category.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editCategory, getCategory } from "../../redux/reducer/categorySlice";

const EditCategory = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    params?.id && fetchCategoryById();
  }, [params?.id]);

  const fetchCategoryById = async () => {
    try {
      const data = await dispatch(getCategory(params?.id)).unwrap();
      reset(data);
    } catch (error) {
      console.log(error);
    }
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
          <input type="submit" value="Update" className={styles.addBtn} />
        </p>
      </form>
    </div>
  );
};

export default EditCategory;
