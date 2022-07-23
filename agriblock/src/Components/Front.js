import React from 'react'
import carbon from './assets/carbon.mp4'
import mint from './assets/mint.svg'
import data from './assets/data.png'
import security from './assets/security.png'

import './loading.css';
import { Footer } from "./Footer";


export const Front = () => {
    return (
        <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="row mt-4 pt-4 pb-4 bg-faint-blue">
                        <div className="col-md-12">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="video-load">
                                            

                                                    <video className="img-fluid" id="home-video" loop muted autoPlay controls=''>
                                                <source src={carbon} type="video/mp4" />
                                                    </video>
                                            
                                            </div>
                                    </div>
                                    

                                    <div className="col-md-6">
                                        <div className="container">
                                            <div className="row pt-4 pb-3">
                                                <div className="col-md-12 text-center">
                                                    <h1 className="super-bold display-4 home-head">Sustainable Development</h1>
                                                    <p className="p-lg text-blue">Invest in Farmers for a Greener Future.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center text-sm-center text-md-left">
                                            <p className="p-lg">
                                                
                                                    Invest in the Greener Future,
                                                    buy buying NFT from farmers and ,
                                                    providing them resources to Invest in sustainable farming methods.
                                                </p>

                                                <br />

                                            <a href="/front">Read More <i className="fa fa-arrow-right fa-fw"></i></a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div className="container">
                        <div className="row pt-3 pb-4 text-center">
                            <div className="col-md-4">
                                <div className="mt-1">
                                    <h3 className="mt-4 mb-2 super-bold">Buy/MINT NFT</h3>
                                    <p>
                                        You can buy the minted NFT from Farmers, who adopted sustainable farming practices.
                                    </p>

                                    <img className="img-fluid" src={mint} />
                                           
                                    </div>
                                </div>
                            <div className="col-md-4">
                                <div className="mt-1">
                                    <h3 className="mt-4 mb-2 super-bold">Real Time Data</h3>
                                        <p>
                                            Monitor the real time pollution data coming from IOT devices installed in farmland for verification.
                                        </p>

                                    <img className="img-fluid" src={data} />
                                                
                                        </div>
                                    </div>
                            <div className="col-md-4">
                                <div className="mt-1">
                                    <h3 className="mt-4 mb-2 super-bold">Security and Transparency</h3>
                                            <p>
                                                All data stored in blockchain and user can buy minted Green NFT Anonymously.
                                            </p>

                                    <img className="img-fluid" src={security} />
                                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>

                    <div className="container">
                        <div className="row mt-3 text-center">
                            <div className="col-md-12">
                                <h4>
                                    In this Modern Era, then why you're behind to protect the future ?
                                </h4>
                                <p className="p-large px-3">
                                    Buy NFT direct from farmers,
                                    so that they can invest the profits directy in adopting more sustainable farming practices.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    <Footer />
        </>
    )
}


