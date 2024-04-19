import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/reducer/authSlice";

function Header({ soluong, setShowCart }) {
  const { isLogged, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onShowCartHandler = () => {
    setShowCart(true);
  };

  const onSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <div className={classes.row}>
      <div className={classes.logo}>My Shop</div>

      {isLogged ? (
        <p>
          Xin chào,{" "}
          <Link to="/admin" className={classes.userName}>
            {userInfo.username}
          </Link>{" "}
          (
          <span className={classes.signOutBtn} onClick={onSignOut}>
            Đăng xuất
          </span>
          )
        </p>
      ) : (
        <>
          <Link to="/sign-in" className={classes.login}>
            SignIn
          </Link>
          <Link to="/sign-up" className={classes.signup}>
            SignUp
          </Link>
        </>
      )}

      <div className={classes.cart} onClick={onShowCartHandler}>
        <i className="fa fa-shopping-bag" aria-hidden="true"></i>

        <span className={classes.cartamount}>
          <sup>{soluong}</sup>
        </span>
      </div>
    </div>
  );
}

export default Header;
