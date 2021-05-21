import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import AboutUsScreen from "./screens/AboutUsScreen";
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import BookServiceScreen from "./screens/BookServiceScreen";

//Table
import CartTableScreen from './screens/CartTableScreen';
import HomeTableScreen from './screens/HomeTableScreen';
import TableListScreen from './screens/TableListScreen';
import TableScreen from './screens/TableScreen';
import TableEditScreen from './screens/TableEditScreen';
import SellerTableScreen from './screens/SellerTableScreen';
import SearchTableScreen from './screens/SearchTableScreen';
import { listTableCategories } from './actions/tableActions';
import DashboardTableScreen from './screens/DashboardTableScreen';

//bookingTable
import BookingHistoryScreen from './screens/BookingHistoryScreen';
import BookingScreen from './screens/BookingScreen';
import PaymentMethodBookingScreen from './screens/PaymentMethodBookingScreen';
import PlaceBookingScreen from './screens/PlaceBookingScreen';
import BookingListScreen from './screens/BookingListScreen';
import BookingTableScreen from './screens/BookingTableScreen';

import logo from "./scss/images/logo_v2.png";



function App() {
  const cart = useSelector((state) => state.cart);
  const cartTable = useSelector((state) => state.cartTable);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const { cartTableItems } = cartTable;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const tableCategoryList = useSelector((state) => state.tableCategoryList);
  const {
    loading: loadingCategoriesTable,
    error: errorCategoriesTable,
    categoriesTable,
  } = tableCategoryList;
  useEffect(() => {
    dispatch(listTableCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row-home"  style={{ height: "75px" }}>
          <div className="btn-header" style={{ width: "30%", float: "left" }}>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
             Restaurant
            </Link>
          </div>
          <div
          className="option-navbar"
          style={{ width: "30%", float: "left", lineHeight: "30px" }}
          >
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className=""
            style={{ width: "40%", float: "left", lineHeight: "80px" }}>
              <div
              className="navbar-option"
              style={{ float: "left", width: "20%", lineHeight: "80px" }}
            >
            <Link to="/cart">
            <i className="fas fa-shopping-cart mr-3"></i>
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            </div>



            <Link to="/cartTable">
            <i class="fas fa-gift"></i>
              Table
              {cartTableItems.length > 0 && (
                <span className="badge">{cartTableItems.length}</span>
              )}
            </Link>


            {userInfo ? (
              <div className="dropdown navbar-option" style={{ width: "30%" }}>
                <Link to="#">
                <i className="fas fa-user mr-3"></i>
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>

                <ul className="dropdown-content "style ={{marginTop:'-2rem' , width :'300px'}}>
                  <li>
                    <Link to="/profile">
                    <i class="far fa-user-circle mr-3"></i>
                      User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">
                    <i className="fas fa-history mr-3"></i>
                      
                      Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                    <i class="fas fa-sign-out-alt mr-3"></i>

                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin" className="navbar-option">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                  <li>
                    <Link to="/tablelist/seller">Tables</Link>
                  </li>
                  <li>
                    <Link to="/bookinglist/seller">Bookings</Link>
                  </li>
                  <li>
                     <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div  className="dropdown navbar-option"
              style={{ lineHeight: "30px", width: "30%" }}
              >
                <Link to="#admin">
                <i className="fas fa-users-cog mr-3"></i>
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content text-white" style ={{width :' 300px '}}>
                  <li>
                    <i className="fas fa-chart-line mr-3  "></i>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <i className="fas fa-cookie-bite mr-3 "></i>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                     <i className="fas fa-dollar-sign mr-3"></i>
                     <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>

                    <Link to="/dashboardTable">DashboardTable</Link>
                  </li>
                  <li>
                    <i class="fas fa-gift"></i>
                    <Link to="/tablelist">Tables</Link>
                  </li>
                  <li>
                    <Link to="/bookinglist">Bookings</Link>
                  </li>
                  <li>
                  <i className="fas fa-user-friends mr-3"></i>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                  <i className="far fa-comments mr-3"></i>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
          <ul>
            <li>
              <Link
                path="/aboutUs"
                to="/aboutUs"
                onClick={() => setSidebarIsOpen(false)}
              >
                {" "}
                about us
              </Link>
            </li>
          </ul>
        </aside>
        <main>
        <Route path="/aboutUs" component={AboutUsScreen}></Route>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/seller/:id" component={SellerTableScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/cartTable/:id?" component={CartTableScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/table/:id" component={TableScreen} exact></Route>
          <Route path="/booking/:id" component={BookingScreen}></Route>
          <Route path="/bookinghistory" component={BookingHistoryScreen}></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
           <Route
            path="/table/:id/edit"
            component={TableEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/bookingTable" component={BookingTableScreen}></Route>
          <Route path="/paymentTable" component={PaymentMethodBookingScreen}></Route>
          <Route path="/placebooking" component={PlaceBookingScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/BookServiceScreen"
            component={BookServiceScreen}
          ></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
           <AdminRoute
            path="/tablelist"
            component={TableListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/tablelist/pageNumber/:pageNumber"
            component={TableListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
           <AdminRoute
            path="/bookinglist"
            component={BookingListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
           <AdminRoute
            path="/dashboardTable"
            component={DashboardTableScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>

            <SellerRoute
            path="/tablelist/seller"
            component={TableListScreen}
          ></SellerRoute>

          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

           <SellerRoute
            path="/bookinglist/seller"
            component={BookingListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/" component={HomeTableScreen} exact></Route>
        </main>
        <footer className=" center">
          <div>
            <div>
            {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
            <ChatBox userInfo={userInfo}></ChatBox>
            {/* <div style={{ textAlign: "center", marginTop: "-5rem" }}>
                <img className="img-footer" src={logo}></img>
            </div> */}
            <div className="row">
                <div className="col-4" style = {{ textAlign :''}}>
                  <h2>DIAMOND PLACE</h2>
                  <p>Chỉ từ 4.100.000đ/bàn</p>
                  <p>Địa chỉ: 15A Hồ Văn Huê, P. 9, Q. Phú Nhuận</p>
                  <p>Điện thoại: (028) 7109 8710</p>
                  <p>Email: info@diamondplace.com.vn</p>
                  <p>Hotline: 0979 80 80 80 - (028) 2229 2222</p>
                  <p>Website: dp1.diamondplace.vn</p>
                </div>{" "}
                <div className="col-4">
                  <h2>GIỜ LÀM VIỆC</h2>
                  <p>Thứ Hai – Chủ Nhật: 09:00 sáng – 09:30 tối</p>
                </div>
                <div className="col-4">
                  <h2> DIAMOND PLACE II</h2>
                  <p>Chỉ từ 2.990.000đ/bàn</p>
                  <p>Địa chỉ: 584 Âu Cơ, P. 10, Q. Tân Bình</p>
                  <p>Điện thoại: (028) 6290 2222</p>
                  <p>Email: info.dp2@diamondplace.com.vn</p>
                  <p>Hotline: 0902 68 00 22</p>

                  <p>Website: dp2.diamondplace.vn</p>
                </div>
              </div>
              <Link
                className="codepen-link"
                to="/screens/homeScreen.js"
                target="_blank"
              />
            </div>
          </div>
          
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;






