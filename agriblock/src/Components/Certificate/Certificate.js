import React, { useContext } from 'react'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import jsPDF from "jspdf";
import { ethers } from "ethers"
import "./certificate.css";

export const Certificate = () => {

  const { state } = useLocation();
  const { nfts } = state;
  const downloadPdf = () => {
    var doc = new jsPDF("l", "pt", "a4");
    doc.html(document.querySelector("#container"), {
      callback: function (pdf) {
        pdf.save("certificate.pdf");
        
      },
    })
  }
  return (
    <>
      <button
        onClick={downloadPdf}
        type="button"
        className="btn btn-success btn-lg"
        style={{ textAlign: "center" }}>
        Get Certificate
      </button>
      <div className="pm-certificate-container" id="container">
        <div className="outer-border"></div>
        <div className="inner-border"></div>
        <div className="pm-certificate-border col-xs-12">
          <div className="row pm-ceritifcate-header">
            <div className="pm-certificate-title  col-xs-12 text-center">
                <h2>Certification of Minting NFT {/*{nfts.itemId}*/}</h2>
            </div>
          </div>
          <div className="row pm-ceritifcate-body">
            <div className="pm-certificate-block">
              <div className="col-xs-12">
                <div className="row">
                    <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                        {/*<h3>{nfts.name}</h3> <br />*/}
                    <span className="pm-name-text-bold">
                      This certificate is to acknowledege that{" "}
                    </span>
                    <br />
                    <br />
                    {/*<span className="block">has purchased </span>*/}
                    <h3>{nfts.name}</h3> <br />
                    <span className="pm-earned-text block">
                        was succcessfully purchased on ethreum value of  <i className="fab fa-ethereum"> </i> {ethers.utils.formatEther(nfts.totalPrice)}
                    </span>
                    <br />
                    <span className="block">For saving </span>
                    <span className="pm-credits-text bold block">
                        {nfts.description}
                    </span>
                    <br />
                    <br />
                    <span className="pm-credits-text bold block">
                      The above NFT is purchased via AgriBlock, a global market
                      leader for carbon credits
                    </span>
                    {/*<br />*/}
                    {/*<br />*/}
                    {/*<br />*/}
                    {/*<span style={{ textAlign: "center" }}>Dated</span>*/}
                    {/*<br />*/}
                    {/*<span style={{ textAlign: "center" }}>12/June/2022</span>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Certificate;
