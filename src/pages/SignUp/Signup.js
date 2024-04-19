import React from "react";
import { useForm } from "react-hook-form";

import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../redux/reducer/authSlice";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(signUp(data)).unwrap();
      navigate("/sign-in");
      toast.success("Đăng ký tài khoản thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="form-container">
      <style>
        {/* {`
          body {
            background-color: #f0f8ea;
            font-family: "Arial", sans-serif;
          }

          h1 {
            color: #354259;
            text-align: center;
          }

          form {
            max-width: 300px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }

          label {
            display: block;
            margin-bottom: 8px;
            color: #354259;
          }

          input {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
          }

          input[type="submit"] {
            background-color: #354259;
            color: #fff;
            cursor: pointer;
          }

          input[type="submit"]:hover {
            background-color: #1e2a38;
          }
        `} */}
      </style>
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <h1>SignUp</h1>
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
          <input type="submit" value="SignUp" id="signUpBtn" />
        </p>
      </form>
    </div>
  );
}

export default SignUp;
