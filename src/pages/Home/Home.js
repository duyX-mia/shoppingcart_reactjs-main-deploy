import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import Modal from "../../components/Modal";
import Header from "../../components/Header";
import Giohang from "../../components/Giohang";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  selectCategories,
} from "../../redux/reducer/categorySlice";
import {
  getProductByCategoryId,
  getProducts,
  selectProduct,
} from "../../redux/reducer/productSlice";
import { formatCurrency } from "../../utils/common";

function Home() {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectCategories);
  const { productsFilter } = useSelector(selectProduct);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isShowModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [isShowCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getProductByCategoryId(selectedCategory));
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      await dispatch(getProducts()).unwrap();

      await dispatch(getCategories()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickCategoryHandler = (categoryId) => {
    setSelectedCategory(categoryId);
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

  return (
    <div className={classes.container}>
      <Header soluong={cart.length} setShowCart={setShowCart} />
      
      <div className={classes.row}>
        <h1>Duy Shopping Cart</h1>
      </div>

      <div className={classes.row}>
        <div class="sub-banner">
          <img
            src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2024/01/banner/1920x450--2--1920x450.jpg"
            alt="sub banner"
            width="100%"
            height="400px"
          />
        </div>
      </div>

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
      <div className={classes.row}>
        <div className={classes.left}>
          <h2>Categories</h2>
          {categories.map((cate) => (
            <div
              className={classes.cat}
              key={cate.id}
              onClick={() => onClickCategoryHandler(cate.id)}
            >
              {cate.name}
            </div>
          ))}
        </div>
        <div className={classes.right}>
          {!isShowCart && (
            <>
              <h2>Products</h2>
              <div className={classes.boxes}>
                {productsFilter.map((product) => (
                  <div className={classes.product} key={product.id}>
                    <h3>{product.name}</h3>
                    <img
                      src={product.image}
                      alt={product.name} // Provide meaningful text related to the image
                      className={classes.productImage}
                    />
                    <h4>{formatCurrency(+product.price)}</h4>
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
            </>
          )}

          {isShowCart && (
            <Giohang setShowCart={setShowCart} cart={cart} setCart={setCart} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
