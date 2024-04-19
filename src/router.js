// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Route, Switch, useRouteMatch } from "react-router-dom";
// import ProductsTable from "../components/Table/ProductsTable";
// // import BlankBody from "../components/Body/BlankBody";
// import HomePage from "../pages/HomePage";
// import AdminAccounts from "../components/Accounts/Accounts";

// function SidebarRoute() {
//   const { path } = useRouteMatch();

//   return (
//     <>
//       <Switch>
//         <Route exact path="/" render={() => <HomePage />} />
//          <Route
//           exact
//           path={`${path}/products`}
//           render={() => <ProductsTable />}
//         />
//         <Route
//           exact
//           path={`${path}/adm-accounts`}
//           render={() => <AdminAccounts />}
//         />
//       </Switch>
//     </>
//   );
// }

// // export default SidebarRoute;