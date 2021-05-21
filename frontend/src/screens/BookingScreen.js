import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverBooking, detailsBooking, payBooking } from '../actions/bookingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  BOOKING_DELIVER_RESET,
  BOOKING_PAY_RESET,
} from '../constants/bookingConstants';

export default function BookingScreen(props) {
  const bookingId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { booking, loading, error } = bookingDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const bookingPay = useSelector((state) => state.bookingPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = bookingPay;
  const bookingDeliver = useSelector((state) => state.bookingDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = bookingDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !booking ||
      successPay ||
      successDeliver ||
      (booking && booking._id !== bookingId)
    ) {
      dispatch({ type: BOOKING_PAY_RESET });
      dispatch({ type: BOOKING_DELIVER_RESET });
      dispatch(detailsBooking(bookingId));
    } else {
      if (!booking.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, bookingId, sdkReady, successPay, successDeliver, booking]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payBooking(booking, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverBooking(booking._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Bill Booking{booking._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Booking</h2>
                <p>
                  <strong>Name:</strong> {booking.bookingTable.fullName} <br />
                  <strong>Phone Number: </strong> {booking.bookingTable.phoneNumber} <br />
                  <strong>Hour: </strong> {booking.bookingTable.hour} <br />
                  <strong>Date: </strong> {booking.bookingTable.date} <br />
                  <strong>Number Place: </strong> {booking.bookingTable.numberPlace} <br />
                  <strong>Description: </strong> {booking.bookingTable.description} <br />
                </p>
                {booking.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {booking.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {booking.paymentMethod}
                </p>
                {booking.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {booking.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Booking Items</h2>
                <ul>
                  {booking.bookingItems.map((item) => (
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
                <h2>Table reservation Payment</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${booking.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${booking.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Booking Total</strong>
                  </div>
                  <div>
                    <strong>${booking.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!booking.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={booking.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && booking.isPaid && !booking.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Booking
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
