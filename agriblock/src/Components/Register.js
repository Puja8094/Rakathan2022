import { Form } from 'react-bootstrap'
import { useState, React, useContext, useEffect } from 'react'
import { usePlacesWidget } from "react-google-autocomplete";
import { Loader } from '@googlemaps/js-api-loader';
import { Footer } from "./Footer";
import wheat from './assets/wheat.jpg'
import { NftContext } from '../frontend/NftContext/NftProvider';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
    
    const { account, marketplace, setAccountType } = useContext(NftContext);
    const navigate = useNavigate();
    const [farmerId, setfarmerId] = useState('')
    const [name, setname] = useState('')
    const [govtid, setgovtid] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [area, setarea] = useState('')
    const [contact, setcontact] = useState('')
    const [iotdeviceid, setiotdeviceid] = useState('')

    const mapOptions = {
        center: {
          lat: longitude,
          lng: longitude
        },
        zoom: 11 
      };

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        }
    },[]);
    
    useEffect(()=>{
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            version: "weekly",
            libraries: ["places"]
            });

        loader.load().then(loadMap)
                    .catch(e => {
                        console.log(e,'error in loading map')
                    });
    },[latitude,longitude])

    const options = Object.assign({
        types: [],
        componentRestrictions: { country: [] }

    }, (latitude && longitude ?
        {
            PlaceGeometry: {
                location: {
                    "lat": latitude,
                    "lng": longitude
                }
            }
        }
        : {}))

    const { ref: bootstrapRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        options:{...options},
        onPlaceSelected: (place) => {
            setLatitude(place.geometry.location.lat());
            setLongitude(place.geometry.location.lng());
            /*console.log(place);*/
        },
    });

    const RegisterFarmer = async () => {

        console.log(farmerId, name, govtid, latitude, longitude, area, contact, iotdeviceid);

        const lat_log = latitude.toString() + ' ' + longitude.toString();

        /*console.log(lat_log);*/

        await (await marketplace.create_Farmer(account, name, govtid, lat_log, area, contact, iotdeviceid)).wait();
        setAccountType(true);
        navigate('/profile');
    }


    const loadMap = (google) =>{
        let map = new google.maps.Map(document.getElementById("map"), mapOptions);
        let marker = new google.maps.Marker({
            position: {
                lat: latitude,
                lng: longitude
            },
            map,
            title: "Location!",
            draggable:true
          });
          marker.setMap(map);
          map.setCenter(marker.getPosition());
          google.maps.event.addListener(marker, 'click', ()=> {
            map.setCenter(marker.getPosition());
          });

          google.maps.event.addListener(marker, 'dragend', ()=>{
            setLatitude(marker.position.lat());
            setLongitude(marker.position.lng());
            map.setCenter(marker.getPosition());
           });
    } 

    return (
        <>
            <div className="container mt-4 mb-4">
                <br />
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-5 d-sm-none d-none d-md-block">
                                    <div className="card-body sidebar-image-card-body">
                                        <img className="img-fluid sidebar-image" src={wheat} height="1200" />
                                    </div>
                                </div>
                                <div className="col-md-7 col-sm-12 col-12">
                                    <div className="card-body form-contents">
                                        <h3 className="no-td-space">Register the Account</h3>
                                        <p className="type-7-2 text-muted">
                                            If You already have a account then install and <a href="https://metamask.io/" target="_blank">Connect Metamask Wallet.</a>
                                        </p>
                                        <div className="form-group">
                                            <h6>Public Crypto Id  <a href="https://www.youtube.com/watch?v=LmWbDDaU5fE" target="_blank">(Create a Crypto Account using MetaMask) <span className="text-danger">*</span></a></h6>
                                            <Form.Control onChange={(e) => setfarmerId(e.target.value)} type="text" className="form-control" value={account} required disabled />
                                        </div>
                                        <div className="form-group">
                                            <h6>User Name  <span className="text-danger">*</span></h6>
                                            <Form.Control onChange={(e) => setname(e.target.value)} type="text" className="form-control" placeholder="Enter User Name" required />
                                        </div>
                                        <div className="form-group">
                                            <h6> AADHAR NUMBER/ PAN CARD  <span className="text-danger">*</span></h6>
                                            <Form.Control onChange={(e) => setgovtid(e.target.value)} className="form-control" placeholder="ENTER AADHAR NUMBER/ PAN CARD" required />
                                        </div>
                                        <div className="form-group">
                                            <h6> Farm Location <span className="text-success">*</span><span className="float-right"></span></h6>
                                            <Form.Control className="form-control" placeholder="Enter the Farm Location" ref={bootstrapRef} />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <h6> Farm Location : ( Latitude : {latitude}, Longitude: {longitude} )<span className="float-right"></span><span className="text-danger">*</span></h6>
                                            <div id='map' className='googlemap' />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <h6>Total Farm Land Area (In Hectare)<span className="text-danger">*</span> </h6>
                                            <Form.Control onChange={(e) => setarea(e.target.value)} className="form-control" id="validationDefault03" placeholder="Enter Total Farm Land Area" required />
                                        </div>
                                        <div className="form-group">
                                            <h6>Contact <span className="text-danger">*</span></h6>
                                            <Form.Control onChange={(e) => setcontact(e.target.value)} className="form-control" id="validationDefault03" placeholder="Enter Contact Details" required />
                                        </div>
                                        {/*<div className="form-group">*/}
                                        {/*    <h6>City :</h6>*/}
                                        {/*    <input type="text" className="form-control" id="validationDefault04" placeholder="Enter State" required />*/}
                                        {/*</div>*/}
                                        <div className="form-group">
                                            <h6>IOT DEVICE ID <span className="text-danger">*</span></h6>
                                            <Form.Control onChange={(e) => setiotdeviceid(e.target.value)} type="text" className="form-control" id="validationDefault05" placeholder="Enter IOT DEVICE ID" required />
                                        </div>
                                        <br />
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="type-7">
                                                    By clicking on the 'Update Account' button below, you agree that you have
                                                    read, understand, and accepted our <a href="">TERMS OF SERVICE</a>.
                                                </p>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row mt-2">
                                            <div className="col-md-12">
                                                <button onClick={RegisterFarmer} className="btn btn-success">
                                                    <i className="fa fa-user-plus fa-fw"></i>
                                                    Create Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            < Footer />
        </>
    )
}