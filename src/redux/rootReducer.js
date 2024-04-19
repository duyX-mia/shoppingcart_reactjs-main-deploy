import { combineReducers } from "redux";
import AccountSlice from "./reducer/AccountsSlide";
import authSlice from "./reducer/authSlice";
import categorySlice from "./reducer/categorySlice";
import productSlice from "./reducer/productSlice";

export const rootReducer = combineReducers({
  accounts: AccountSlice.reducer,
  // products: productSlice.reducer,
  // homepage: HomepageSlice.reducer,
  auth: authSlice.reducer,
  category: categorySlice,
  product: productSlice,
});
