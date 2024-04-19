import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import styles from "./Admin.module.css";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/reducer/authSlice";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <>
      <div className={styles.headerWrap}>
        <div className={styles.menuLeft}>
          <Link to="/" className={styles.menuItem}>
            Home
          </Link>
          <Link className={styles.menuItem}>About</Link>
          <Link className={styles.menuItem}>Department Management</Link>
          <Link to="/admin/account" className={styles.menuItem}>
            Account Management
          </Link>
          <Link to="/admin/category" className={styles.menuItem}>
            Category Management
          </Link>
          <Link to="/admin/product" className={styles.menuItem}>
            Product Management
          </Link>
        </div>

        <p className={styles.menuItem} onClick={onSignOut}>
          Đăng xuất
        </p>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
