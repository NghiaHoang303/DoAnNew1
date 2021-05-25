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
import {
  InfoWindow,
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";
import AOS from "aos";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDVGjDTneZNSjh91mqVpqVmEshIYnxZhnI");

export default function HomeScreen() {

  AOS.init({
    offset: 400,
    duration: 1000,
  });

   //google map

   React.state = {
    address: "",
    city: "",
    area: "",
    state: "",
    zoom: 15,
    height: 400,
    mapPosition: {
      lat: 0,
      lng: 0,
    },
    markerPosition: {
      lat: 0,
      lng: 0,
    },
  };

  React.onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();

    Geocode.fromLatLng(newLat, newLng).then((response) => {
      const address = response.results[0].formatted_address,
        addressArray = response.results[0].address_components,
        city = this.getCity(addressArray),
        area = this.getArea(addressArray),
        state = this.getState(addressArray);
    });
    console.log(newLat);
  };


  function Map() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 10.83136, lng: 106.66875 }}
      >
        <Marker
          draggable={true}
          onDragEnd={React.onMarkerDragEnd}
          position={{ lat: 10.83136, lng: 106.66875 }}
        >
          <InfoWindow>
            <div>hello</div>
          </InfoWindow>
        </Marker>
      </GoogleMap>
    );
  }

  const WrappedMap = withScriptjs(withGoogleMap(Map));
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
      }} >Vị trí bàn nổi bật</p>
 
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {tables.length === 0 && <MessageBox>không tìm thấy bàn</MessageBox>}
          <div className="row center">
            {tables.map((table) => (
              <Table key={table._id} table={table}></Table>
            ))}
          </div>
        </>
      )}
       <h2>google map</h2>

      <div>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDVGjDTneZNSjh91mqVpqVmEshIYnxZhnI&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `300px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        ></WrappedMap>
      </div>
      <div style={{ marginBottom: "10rem" }}></div>
          
    </div>
  );
}
