import React from "react";

import styles from "./Account.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addAccount } from "../../redux/reducer/AccountsSlide";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label htmlFor="username">Username:</label>
          <input
            className={styles.formControl}
            type="text"
            name="username"
            id="username"
            {...register("username", {
              required: "Vui lòng nhập username",
            })}
          />

          {errors.username?.message && (
            <p className={styles.errorMsg}>{errors.username?.message}</p>
          )}
        </p>

        <p>
          <label htmlFor="email">Email:</label>
          <input
            className={styles.formControl}
            type="text"
            name="email"
            id="email"
            {...register("email", {
              required: "Vui lòng nhập email",
            })}
          />

          {errors.email?.message && (
            <p className={styles.errorMsg}>{errors.email?.message}</p>
          )}
        </p>

        <p>
          <label htmlFor="password">Password:</label>
          <input
            className={styles.formControl}
            type="password"
            name="password"
            id="password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
            })}
          />

          {errors.password?.message && (
            <p className={styles.errorMsg}>{errors.password?.message}</p>
          )}
        </p>

        <p>
          <input type="submit" value="Add" />
        </p>
      </form>
    </div>
  );
};

export default AddAccount;
