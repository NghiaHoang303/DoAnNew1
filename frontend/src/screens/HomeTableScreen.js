import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Table from '../components/Table';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listTables } from '../actions/tableActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const tableList = useSelector((state) => state.tableList);
  const { loading, error, tables } = tableList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  useEffect(() => {
    dispatch(listTables({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <p className = 'menu-header  text-center' style={{
        color : 'yellowgreen'
      }} >Featured Tables</p>
 
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {tables.length === 0 && <MessageBox>No Table Found</MessageBox>}
          <div className="row center">
            {tables.map((table) => (
              <Table key={table._id} table={table}></Table>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
