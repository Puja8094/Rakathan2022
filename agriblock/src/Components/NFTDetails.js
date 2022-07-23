import React, { useContext } from 'react'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ethers } from "ethers"
import {
    
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import axios from 'axios';

import aqix from './assets/aqix.png'
import aqi_gases from './assets/aqi_gases.png'

import { Line } from 'react-chartjs-2';
import { Loading } from "./Loading";
import { Footer } from "./Footer";
import { NftContext } from '../frontend/NftContext/NftProvider';


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Live CO2 in PPM IOT Data',
        },
    },
};

export const options2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Live Pollution Data',
        },
    },
};

const labels = [];

export const data = {
    labels,
    datasets: [
        {
            label: 'Loding Data',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ],
};




export const NFTDetails = () => {
	const {marketplace, isLoading } = useContext(NftContext);
    const { state } = useLocation();
    const { nfts } = state;
    const [farmername, setfarmername] = useState('')
    const [govtid, setgovtid] = useState('')
    const [location, setlocation] = useState('')
    const [area, setarea] = useState('')
    const [map, setmap] = useState('')
    const [contact, setcontact] = useState('')
    const [iotdeviceid, setiotdeviceid] = useState('')
    const [loading, setLoading] = useState(true)
    const [IOT, setIOT] = useState(data)
    const [aqi, setaqi] = useState(data)
    const [avgco2, setavgco2] = useState(data)
    const [avgno, setavgno] = useState(data)
    const [avgno2, setavgno2] = useState(data)
    const [avgo3, setavgo3] = useState(data)
    const [avgso2, setavgso2] = useState(data)
    const [avgpm25, setavgpm25] = useState(data)
    const [avgpm10, setavgpm10] = useState(data)
    const [avgnh3, setavgnh3] = useState(data)

    const LoadFarmer = async () => {

        const fam = await marketplace.farmers(nfts.seller)
        setfarmername(fam.name)
        setgovtid(fam.govtId)
        setlocation(fam.location)
        setcontact(fam.contact)
        setarea(fam.landarea)
        /*LoadPollutionData()*/
        setTimeout(() => { LoadPollutionIOTData() }, 10000);
        setiotdeviceid(fam.iotid)
        setLoading(false)
    }

    const LoadPollutionIOTData = () => {
        api.get('GetIotData?limit=100').then(({ data }) => {
        //console.log(data)
        //console.log(typeof data)
        const labelsx = data.map(val => val.localDateTime.replace('T', ' ').replace('Z','').slice(0, -4))
        const datax = data.map(val => val.co2InPpm)
        //console.log(labelsx)
        //console.log(datax)
        const dataxx = {
            labels: labelsx,
            datasets: [
                {
                    label: 'Live CO2 IOT Data',
                    data: datax,
                    borderColor: 'rgb(255, 99, 132, 0.4)',
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                }
            ],
        }
        setIOT(dataxx)
        /*console.log(IOT)*/
    });

    
}


    useEffect(()=> {
        const locationarr = location.split(" ");
        locationarr[0] && LoadPollutionData();
    }, [location])
    

    const LoadPollutionData = () => {
        const datex = new Date().getDate() + '%2F' + new Date().toLocaleString("en-US", { month: "long" }) + '%2F' + new Date().getFullYear()
        /*console.log(datex)*/
        /*console.log(location);*/
        const locationarr = location.split(" ");
        const lat = locationarr[0];
        const log = locationarr[1];
        /*console.log(lat, log);*/
        setmap('https://www.google.com/maps/embed/v1/view?key='+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+'&center=' + lat + ',' + log+'&zoom=20&maptype=satellite');
        api.get('GetPollutionHistory?lat='+lat+'&lon='+log+'&currentDate='+datex).then(({ data }) => {
            const labelsx = data.map(val => val.DateTime.split('T')[0])
            const dataxAQI = data.map(val => val.AverageAQI)
            const dataxCO = data.map(val => val.AverageCO)
            const dataxNO = data.map(val => val.AverageNO)
            const dataxNO2 = data.map(val => val.AverageNO2)
            const dataxO3 = data.map(val => val.AverageO3)
            const dataxSO2 = data.map(val => val.AverageSO2)
            const dataxPM25 = data.map(val => val.AveragePM25)
            const dataxPM10 = data.map(val => val.AveragePM10)
            const dataxNH3 = data.map(val => val.AverageNH3)
            //const datapol = {
            //    labels: labelsx,
            //    datasets: [
            //        {
            //            label: 'AverageAQI',
            //            data: dataxAQI,
            //            borderColor: 'rgb(255, 99, 132, 0.4)',
            //            backgroundColor: 'rgba(255, 99, 132, 1)',
            //        },
            //        {
            //            label: 'AverageCO',
            //            data: dataxCO,
            //            borderColor: 'rgba(75, 192, 192, 0.4)',
            //            backgroundColor: 'rgba(75, 192, 192, 1)',
            //        },
            //        {
            //            label: 'AverageNO',
            //            data: dataxNO,
            //            borderColor: 'rgba(153, 102, 255, 0.4)',
            //            backgroundColor: 'rgba(153, 102, 255, 1)',
            //        },
            //        {
            //            label: 'AverageNO2',
            //            data: dataxNO2,
            //            borderColor: 'rgba(255, 159, 64, 0.4)',
            //            backgroundColor: 'rgba(255, 159, 64, 1)',
            //        },
            //        {
            //            label: 'AverageO3',
            //            data: dataxO3,
            //            borderColor: 'rgba(255, 99, 132, 0.4)',
            //            backgroundColor: 'rgba(255, 99, 132, 1)',
            //        },
            //        {
            //            label: 'AverageSO2',
            //            data: dataxSO2,
            //            borderColor: 'rgba(54, 162, 235, 0.4)',
            //            backgroundColor: 'rgba(54, 162, 235, 1)',
            //        },
            //        {
            //            label: 'AveragePM25',
            //            data: dataxPM25,
            //            borderColor: 'rgba(255, 206, 86, 0.4)',
            //            backgroundColor: 'rgba(255, 206, 86, 1)',
            //        },
            //        {
            //            label: 'AveragePM10',
            //            data: dataxPM10,
            //            borderColor: 'rgba(134, 220, 50, 0.4)',
            //            backgroundColor: 'rgba(134, 220, 50, 1)',
            //        },
            //        {
            //            label: 'AverageNH3',
            //            data: dataxNH3,
            //            borderColor: 'rgba(134, 156, 200, 0.4)',
            //            backgroundColor: 'rgba(134, 156, 200, 1)',
            //        },
            //    ],
            //}
            //setPollution(datapol)
            //console.log(setPollution)
            const datapol0 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageAQI',
                        data: dataxAQI,
                        borderColor: 'rgb(255, 99, 132, 0.4)',
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                    }
                ],
            }
            setaqi(datapol0)

            const datapol1 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageCO',
                        data: dataxCO,
                        borderColor: 'rgba(75, 192, 192, 0.4)',
                        backgroundColor: 'rgba(75, 192, 192, 1)',
                    }
                ],
            }
            setavgco2(datapol1)

            const datapol2 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageNO',
                        data: dataxNO,
                        borderColor: 'rgba(153, 102, 255, 0.4)',
                        backgroundColor: 'rgba(153, 102, 255, 1)',
                    }
                ],
            }
            setavgno(datapol2)

            const datapol3 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageNO2',
                        data: dataxNO2,
                        borderColor: 'rgba(255, 159, 64, 0.4)',
                        backgroundColor: 'rgba(255, 159, 64, 1)',
                    }
                ],
            }
            setavgno2(datapol3)

            const datapol4 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageO3',
                        data: dataxO3,
                        borderColor: 'rgba(255, 99, 132, 0.4)',
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                    }
                ],
            }
            setavgo3(datapol4)

            const datapol5 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageSO2',
                        data: dataxSO2,
                        borderColor: 'rgba(54, 162, 235, 0.4)',
                        backgroundColor: 'rgba(54, 162, 235, 1)',
                    }
                ],
            }
            setavgso2(datapol5)

            const datapol6 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AveragePM25',
                        data: dataxPM25,
                        borderColor: 'rgba(255, 206, 86, 0.4)',
                        backgroundColor: 'rgba(255, 206, 86, 1)',
                    }
                ],
            }
            setavgpm25(datapol6)

            const datapol7 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AveragePM10',
                        data: dataxPM10,
                        borderColor: 'rgba(134, 220, 50, 0.4)',
                        backgroundColor: 'rgba(134, 220, 50, 1)',
                    }
                ],
            }
            setavgpm10(datapol7)

            const datapol8 = {
                labels: labelsx,
                datasets: [
                    {
                        label: 'AverageNH3',
                        data: dataxNH3,
                        borderColor: 'rgba(134, 156, 200, 0.4)',
                        backgroundColor: 'rgba(134, 156, 200, 1)',
                    }
                ],
            }
            setavgnh3(datapol8)
            
        });
    }

    

    

    const buyMarketItem = async (nfts) => {
        await (await marketplace.purchaseItem(nfts.itemId, { value: nfts.totalPrice })).wait()
    }
    useEffect(() => {
        if(isLoading) {
            LoadFarmer()
        }
    }, [isLoading])
    if (loading) return (
        <Loading />
    )
    return (
        <React.Fragment>
        <div className="container mt-4">
            <br />
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div className="card zoom">
                         <img className="img-fluid" src={nfts.image} />
                        </div>
                        <h2 className="mb-0 text-center">{nfts.name}</h2>
                        <h4 className="text-blue type-6 text-center mb-0 mt-1"><span className="bold">Seller: </span>{nfts.seller}</h4>
                        <br />
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">Name :</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{farmername}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">Contact No.:</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{contact}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">Aadhar No. :</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{govtid}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">Co-ordinates :</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{location}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">Total Farm Land Area:</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{area}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">IOT Device ID :</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{iotdeviceid}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-md-4">
                                <p className="my-0">
                                    <span className="semi-bold">Description :</span>
                                </p>
                            </div>
                            <div className="col-8 col-md-8">
                                <p className="text-muted my-0">{nfts.description}</p>
                            </div>
                        </div>
                </div>
                    <div className="col-md-6">



                   <div className="mt-4 mt-md-0 mx-4">
                       
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h2 className="text-info super-bold mt-2 mb-0">Carbon Credit Certificate</h2>
                                            <p className="text-muted mt-0 mb-0">{nfts.seller}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-5">
                                            <iframe src={map} width="200" height="200"></iframe>
                                                {/*<img className="img-fluid" src={nfts.image} />*/}
                                                {/*<p className="text-muted text-center semi-bold">{nfts.name}</p>*/}
                                            <br />
                                            <br />
                                            <br />
                                                <p className="text-muted type-7 my-0 mx-2">
                                                    Contact No.: {contact}
                                                    <br />
                                                    Aadhar No.: {govtid}
                                                    <br />
                                                    Co-ordinates: {location}
                                                    <br />
                                                    Farm Land: {area}
                                                    <br />
                                                    IOT Device ID: {iotdeviceid}
                                                </p>
                                            

                                        </div>
                                        <div className="col-md-7">
                                            <div className="mx-4 mt-4 mt-md-0">
                                                <h3 className="bold mb-0">{farmername}</h3>
                                                <h6 className="text-grey bold mt-1">{nfts.name}</h6>
                                                <h6 className="text-blue bold mt-1">{nfts.seller}</h6>

                                                <p className="type-6 mt-4">
                                                    This is to Certify that the owner of the NFT has contributed money to of the famers to
                                                    adopt sustainable farming methods.
                                                </p>

                                                <p className="text-success type-6 mt-4">
                                                    {nfts.description}
                                                </p>

                                                

                                                <p className="text-info type-7 mt-4">
                                                    This certificate is issued by Agrochain.
                                                    <br />
                                                    Verify at <span className="bold">www.agrochain.com/verify-cert/{nfts.name}</span>
                                                </p>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <br />
                            <br />
                        <h4 className="text-success mb-0">Current Price:</h4>
                        <h2 className="text-success my-0">
                                <i className="fab fa-ethereum"> </i> {ethers.utils.formatEther(nfts.totalPrice)}
                        </h2>
                        <h4 className="text-danger mt-1">
                                Last <i className="fab fa-ethereum"> </i> {ethers.utils.formatEther(nfts.totalPrice)}
                            </h4>



                        <br />
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-grid gap-2">
                                    <button onClick={() => buyMarketItem(nfts)} className="btn btn-lg btn-primary">
                                        <i className="fas fa-wallet fa-fw"></i> Confirm Buy
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-lg btn-secondary">
                                        <i className="fas fa-tag fa-fw"></i> Make an Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <br />
                    </div>
                    </div>
                </div>
                <div className="row">


                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options1} data={IOT} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/*    <div className="col-md-6">*/}
                    {/*        <div className="card zoom">*/}
                    {/*            <img className="img-fluid" src={aqi} />*/}
                    {/*        </div>*/}
                    {/*</div>*/}
                    </div>

                    <div className="row">
                       
                            <div className="col-md-6">
                                <br />
                                <br />
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <Line options={options2} data={aqi} />
                                        </div>
                                    </div>
                            </div>
                            <br />
                            <div className="card zoom">
                                <img className="img-fluid" src={aqix} />
                            </div>
                            </div>
                            <div className="col-md-6">
                                <br />
                            <br />
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <br />
                                    <div className="card zoom">
                                        <img className="img-fluid" src={aqi_gases} />
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgco2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgno} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgno2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgo3} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgso2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgpm25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgpm10} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <br />
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <Line options={options2} data={avgnh3} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        <Footer />
      </React.Fragment>
    )
}
