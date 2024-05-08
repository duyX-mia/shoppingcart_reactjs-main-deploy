import React, { useEffect, useState } from "react";

import styles from "./Product.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
  selectProduct,
} from "../../redux/reducer/productSlice";
import { formatCurrency } from "../../utils/common";
import { Table } from "react-bootstrap";
import { useDebounce } from "../../hook/useDebounce";
import Pagination from "../../components/pagination/Pagination";
import {
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";

const ListProducts = () => {
  const [params, setParams] = useState({
    page: 1,
    search: "",
  });
  const { products, meta } = useSelector(selectProduct);
  const { totalCategories } = useSelector(selectCategories);
  const dispatch = useDispatch();

  const searchStr = useDebounce(params.search, 500);

  useEffect(() => {
    dispatch(getProducts(params));
  }, [params.page, searchStr]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const renderCategoryName = (categoryId) => {
    const foundCategory = totalCategories?.find((it) => it.id === categoryId);

    return foundCategory?.name;
  };

  const onDeleteProduct = (id) => {
    const isConfirm = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");

    if (isConfirm) {
      dispatch(deleteProduct(id));
    }
  };

  const onInputFieldChange = (e) => {
    const value = e.target.value;
    setParams({ page: 1, search: value });
  };

  return (
    <>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>Danh sách sản phẩm</h1>

        <Link to="/admin/product/add">
          <button className={styles.button}>Add product</button>
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
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Category Id</th>
          <th>Category Name</th>
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
              <td>{renderCategoryName(it.categoryId)}</td>
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
      </Table>

      <Pagination meta={meta} setParams={setParams} />
    </>
  );
};

export default ListProducts;
