import React, { useEffect } from "react";

import styles from "./Category.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";

const ListCategory = () => {
  const { categories } = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onDeleteCategory = (id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xoá danh mục này?");

    if (isConfirm) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Danh sách danh mục</h1>

        <Link to="/admin/category/add">
          <button className={styles.button}>Add category</button>
        </Link>
      </div>

      <table border={1} className={styles.table}>
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
      </table>
    </>
  );
};

export default ListCategory;
