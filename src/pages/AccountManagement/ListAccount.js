import React, { useEffect, useState } from "react";

import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccount,
  fetchAccounts,
} from "../../redux/reducer/AccountsSlide";
import Table from "react-bootstrap/Table";
import Pagination from "../../components/pagination/Pagination";
import { useDebounce } from "../../hook/useDebounce";

const ListAccount = () => {
  const [params, setParams] = useState({
    page: 1,
    search: "",
  });
  const { accounts, meta } = useSelector((state) => state.accounts);
  const dispatch = useDispatch();

  const searchStr = useDebounce(params.search, 500);

  useEffect(() => {
    dispatch(fetchAccounts(params));
  }, [params.page, searchStr]);

  const onDeleteAccount = (id) => {
    const isConfirm = window.confirm(
      "Bạn có chắc chắn muốn xoá tài khoản này?"
    );

    if (isConfirm) {
      dispatch(deleteAccount(id));
    }
  };

  const onInputFieldChange = (e) => {
    const value = e.target.value;
    setParams({ page: 1, search: value });
  };

  return (
    <>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Danh sách tài khoản</h1>

        <Link to="/admin/account/add">
          <button className={styles.button}>Add account</button>
        </Link>
      </div>

      <div className="mt-3 justify-content-end d-flex">
        <div style={{ width: 300 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập từ khoá tìm kiếm"
            onChange={onInputFieldChange}
          />
        </div>
      </div>

      <Table bordered hover className={styles.table}>
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
      </Table>

      <Pagination meta={meta} setParams={setParams} />
    </>
  );
};

export default ListAccount;
