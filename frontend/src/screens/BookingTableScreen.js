import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveBookingTable } from '../actions/cartTableActions';
import CheckoutSteps from '../components/CheckoutTableSteps';
import { validName, validPhoneNumber} from '../regex.js';
import MessageBox from '../components/MessageBox';
import '../scss/bookTableAddress.css'
export default function BookingTableScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cartTable = useSelector((state) => state.cartTable);
  const { bookingTable } = cartTable;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(bookingTable.fullName);
  const [phoneNumber, setPhoneNumber] = useState(bookingTable.phoneNumber);
  const [date, setDate] = useState(bookingTable.date);
  const [hour, setHour] = useState(bookingTable.hour);
  const [numberPlace, setNumberPlace] = useState(bookingTable.numberPlace);
  const [description, setDescription] = useState(bookingTable.description);

  const [fullNameErr, setFullNameErr] = useState(false);
  const [phoneNumberError, setPhoneNumberErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

     let moveOn = true;

    if (moveOn) {
      dispatch(
        saveBookingTable({
          fullName,
          phoneNumber,
          date,
          hour,
          numberPlace,
          description
        })
      );
      console.log(date);
      props.history.push('/paymentTable');
    }
  };
//   const validDay = (date) => {
//     const splitTime = date.split('-');
//     const year = parseInt(splitTime[0]);
//     const month = parseInt(splitTime[1]);
//     const day = parseInt(splitTime[2]);
//     const dayCurrent = new Date().getDate();
//     const monthCurrent = new Date().getMonth();
//     const yearCurrent = new Date().getFullYear();
//     return year >= yearCurrent && month >= monthCurrent && day >= dayCurrent;
// }
// const validate = (date) => {
//   if (!validName.test(fullName)) {
//      setFullNameErr(true);
//   }
//   if (!validPhoneNumber.test(phoneNumber)) {
//     setPhoneNumberErr(true);
//   }
//   if(validDay(date)){
//       setDateErr(true);
//   }
// }
  
  ////fullName, phoneNumber, date, hour, numberPlace, description
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form form-shipping" onSubmit={submitHandler}>
        <div>
          <h1>Booking Table</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        {fullNameErr &&<MessageBox variant="danger">For example: Duong Van Tu. Name starting with a capital letter and up to four letters</MessageBox>}
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          ></input>
        </div>
        {phoneNumberError && <MessageBox variant="danger"> For example: +84 868 060 635. Up to 11 numbers</MessageBox>}
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          ></input>
          {dateErr &&<MessageBox variant="danger">current date month year or later</MessageBox>}
        </div>
        <div>
          <label htmlFor="hour">hour</label>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          >
            <option value="7PM">7PM</option>
            <option value="8PM">8PM</option>
            <option value="9PM">9PM</option>
            <option value="10PM">10PM</option>
          </select>
        </div>
        <div>
          <label htmlFor="numberPlace">Number Place</label>
          <select
            value={numberPlace}
            onChange={(e) => setNumberPlace(e.target.value)}
            required
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>
        </div>
        <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" cols="50"  placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required >
           
        </textarea>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" 
          // onClick={!validate(date)}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
