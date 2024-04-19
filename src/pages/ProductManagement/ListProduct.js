import React, { useEffect } from "react";

import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  selectProduct,
} from "../../redux/reducer/productSlice";
import { formatCurrency } from "../../utils/common";

const ListProducts = () => {
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onDeleteProduct = (id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");

    if (isConfirm) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Danh sách sản phẩm</h1>

        <Link to="/admin/product/add">
          <button className={styles.button}>Add product</button>
        </Link>
      </div>

      <table border={1} className={styles.table}>
        <thead>
          <th>STT</th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Category Id</th>
          <th>Actions</th>
        </thead>

        <tbody>
          {products?.map((it, index) => (
            <tr key={`user-item-${it.id}`}>
              <td>{++index}</td>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>{it.description}</td>
              <td>{formatCurrency(+it.price)}</td>
              <td>
                <img
                  src={it.image}
                  alt={it.name}
                  className={styles.productImage}
                />
              </td>
              <td>{it.categoryId}</td>
              <td>
                <div className={styles.actions}>
                  <Link
                    to={`/admin/product/${it.id}/edit`}
                    className={styles.actionItem}
                  >
                    Sửa
                  </Link>
                  <p
                    onClick={() => onDeleteProduct(it.id)}
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

export default ListProducts;
