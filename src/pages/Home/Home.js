import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Giohang from "../../components/Giohang";
import Advertisement from "../../components/Advertisement";
import HomeBanner from "../../components/HomeBanner";
import Benefit from "../../components/Benefit";
import Footer from "../../components/Footer";

import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";
import { getProducts, selectProduct } from "../../redux/reducer/productSlice";
import { formatCurrency } from "../../utils/common";
import Pagination from "../../components/pagination/Pagination";
import classNames from "classnames";
import { useDebounce } from "../../hook/useDebounce";

function Home() {
  const [params, setParams] = useState({
    page: 1,
    limit: 8,
    name: "",
    categoryId: "",
  });
  const dispatch = useDispatch();
  const { totalCategories } = useSelector(selectCategories);
  const { products, meta } = useSelector(selectProduct);

  const [isShowModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [isShowCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = (paramsFetchData) => {
    dispatch(getProducts(paramsFetchData));
  };

  const searchStr = useDebounce(params.name, 500);

  useEffect(() => {
    fetchProducts(params);
  }, [params.page, params.categoryId, searchStr]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onClickCategoryHandler = (categoryId) => {
    setParams((prev) => ({ ...prev, page: 1, name: "", categoryId }));
  };

  const onClickProductHandler = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddToCartHandler = (product) => {
    if (cart.indexOf(product) !== -1) return null;
    const arr = [...cart];
    arr.push({
      ...product,
      amount: 1,
    });
    setCart([...arr]);
  };

  const onInputFieldChange = (e) => {
    const value = e.target.value;
    setParams((prev) => ({ ...prev, page: 1, name: value, categoryId: "" }));
  };

  return (
    <div className={classes.container}>
      <Header soluong={cart.length} setShowCart={setShowCart} />

      <div className="text-center pt-5">
        <h1 className="my-3">Duy Shopping Cart</h1>
      </div>

      <HomeBanner />

      <div className={classes.row}>
        {/* <button onClick={() => setShowModal(true)}>Test show Modal</button> */}
        {isShowModal && (
          <Modal closeModal={closeModal}>
            <div className={classes.row}>
              <div className={classes.left}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className={classes.productImage}
                />
              </div>
              <div className={classes.right}>
                <h3>{selectedProduct.name}</h3>
                <h4>{formatCurrency(+selectedProduct.price)}</h4>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* products */}
      {!isShowCart && (
        <>
          <div className={classes.categories}>
            <h2>Categories</h2>

            <div className={classes.listCategories}>
              {totalCategories.map((cate) => (
                <div
                  className={classNames(classes.cat, {
                    [classes.active]: cate.id === params?.categoryId,
                  })}
                  key={cate.id}
                  onClick={() => onClickCategoryHandler(cate.id)}
                >
                  {cate.name}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center">Products</h2>

              <div style={{ width: 300 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập từ khoá tìm kiếm"
                  value={params.name}
                  onChange={onInputFieldChange}
                />
              </div>
            </div>

            <div className={classes.boxes}>
              {products.map((product) => (
                <div className={classes.product} key={product.id}>
                  <h3 className="fs-5 my-3">{product.name}</h3>
                  <img
                    src={product.image}
                    alt={product.name} // Provide meaningful text related to the image
                    className={classes.productImage}
                  />
                  <h4 className="fs-6 my-3">
                    {formatCurrency(+product.price)}
                  </h4>
                  <button
                    className={classes.button}
                    onClick={() => onClickProductHandler(product)}
                  >
                    Detail
                  </button>{" "}
                  &nbsp;
                  {cart.indexOf(product) !== -1 ? (
                    <span className={classes.datontai}>
                      Sản phẩm đã có trong giỏ
                    </span>
                  ) : (
                    <button
                      className={classes.button}
                      onClick={() => onAddToCartHandler(product)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Pagination meta={meta} setParams={setParams} />
        </>
      )}

      {isShowCart && (
        <Giohang setShowCart={setShowCart} cart={cart} setCart={setCart} />
      )}
      <Benefit />
      <Advertisement />
      <Footer />
    </div>
  );
}

export default Home;
