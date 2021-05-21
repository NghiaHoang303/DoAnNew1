import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBooking } from '../actions/bookingActions';
import CheckoutSteps from '../components/CheckoutTableSteps';
import { BOOKING_CREATE_RESET } from '../constants/bookingConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function PlaceBookingScreen(props) {
  const cartTable = useSelector((state) => state.cartTable);
  if (!cartTable.paymentMethod) {
    props.history.push('/paymentTable');
  }
  const bookingCreate = useSelector((state) => state.bookingCreate);
  const { loading, success, error, booking } = bookingCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cartTable.itemsPrice = toPrice(
    cartTable.cartTableItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cartTable.taxPrice = toPrice(0.15 * cartTable.itemsPrice);
  cartTable.totalPrice = cartTable.itemsPrice + cartTable.taxPrice;
  const dispatch = useDispatch();
  const placeBookingHandler = () => {
    dispatch(createBooking({ ...cartTable, bookingItems: cartTable.cartTableItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/booking/${booking._id}`);
      dispatch({ type: BOOKING_CREATE_RESET });
    }
  }, [dispatch, booking, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Booking Table</h2>
                <p>
                <strong>Name:</strong> {cartTable.bookingTable.fullName} <br />
                  <strong>Phone Number: </strong> {cartTable.bookingTable.phoneNumber} <br />
                  <strong>Hour: </strong> {cartTable.bookingTable.hour} <br />
                  <strong>Date: </strong> {cartTable.bookingTable.date} <br />
                  <strong>Number Place: </strong> {cartTable.bookingTable.numberPlace} <br />
                  <strong>Description: </strong> {cartTable.bookingTable.description} <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cartTable.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Booking Items</h2>
                <ul>
                  {cartTable.cartTableItems.map((item) => (
                    <li key={item.table}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/table/${item.table}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Table Reservation Payment</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cartTable.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cartTable.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Booking Total</strong>
                  </div>
                  <div>
                    <strong>${cartTable.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeBookingHandler}
                  className="primary block"
                  disabled={cartTable.cartTableItems.length === 0}
                >
                  Place Booking
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
