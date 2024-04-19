import React, { useEffect } from "react";

import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccount,
  fetchAccounts,
} from "../../redux/reducer/AccountsSlide";

const ListAccount = () => {
  const { accounts } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const onDeleteAccount = (id) => {
    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn xoá tài khoản này?"
    );

    if (isConfirm) {
      dispatch(deleteAccount(id));
    }
  };

  return (
    <>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Danh sách tài khoản</h1>

        <Link to="/admin/account/add">
          <button className={styles.button}>Add account</button>
        </Link>
      </div>

      <table border={1} className={styles.table}>
        <thead>
          <th>STT</th>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </thead>

        <tbody>
          {accounts?.map((it, index) => (
            <tr key={`user-item-${it.id}`}>
              <td>{++index}</td>
              <td>{it.id}</td>
              <td>{it.username}</td>
              <td>{it.email}</td>
              <td>
                <div className={styles.actions}>
                  <Link
                    to={`/admin/account/${it.id}/edit`}
                    className={styles.actionItem}
                  >
                    Sửa
                  </Link>
                  <p
                    onClick={() => onDeleteAccount(it.id)}
                    className={styles.actionItem}
                  >
                    Xoá
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListAccount;
