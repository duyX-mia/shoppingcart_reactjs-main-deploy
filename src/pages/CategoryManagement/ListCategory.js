import React, { useEffect, useState } from "react";

import styles from "./Category.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";
import { Table } from "react-bootstrap";
import { useDebounce } from "../../hook/useDebounce";
import Pagination from "../../components/pagination/Pagination";

const ListCategory = () => {
  const [params, setParams] = useState({
    page: 1,
    search: "",
  });
  const { categories, meta } = useSelector(selectCategories);
  const dispatch = useDispatch();

  const searchStr = useDebounce(params.search, 500);

  useEffect(() => {
    dispatch(getCategories(params));
  }, [params.page, searchStr]);

  const onDeleteCategory = (id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xoá danh mục này?");

    if (isConfirm) {
      dispatch(deleteCategory(id));
    }
  };

  const onInputFieldChange = (e) => {
    const value = e.target.value;
    setParams({ page: 1, search: value });
  };

  return (
    <>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Danh sách danh mục</h1>

        <Link to="/admin/category/add">
          <button className={styles.button}>Add category</button>
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
          <th>Name</th>
          <th>Actions</th>
        </thead>

        <tbody>
          {categories?.map((it, index) => (
            <tr key={`user-item-${it.id}`}>
              <td>{++index}</td>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>
                <div className={styles.actions}>
                  <Link
                    to={`/admin/category/${it.id}/edit`}
                    className={styles.actionItem}
                  >
                    Sửa
                  </Link>
                  <p
                    onClick={() => onDeleteCategory(it.id)}
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

export default ListCategory;
