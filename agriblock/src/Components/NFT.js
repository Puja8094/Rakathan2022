import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from "ethers"
import { Loading } from "./Loading";
import { Footer } from "./Footer";
import './loading.css';
import { Button } from 'react-bootstrap';
import { NftContext } from '../frontend/NftContext/NftProvider';

export const NFT = () => {
    const { account, marketplace, nft, balance,isLoading } = useContext(NftContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const [nftData, setNftData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const loadMarketplaceItems = async () => {
        // Load all unsold items
        const itemCount = await marketplace.itemCount()
        let items = []
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i)
            if (!item.sold) {
                // get uri url from nft contract
                const uri = await nft.tokenURI(item.tokenId)
                // use uri to fetch the nft metadata stored on ipfs 
                const response = await fetch(uri)
                const metadata = await response.json()
                // get total price of item (item price + fee)
                const totalPrice = await marketplace.getTotalPrice(item.itemId)
                // Add item to items array
                items.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                    price: parseFloat(ethers.utils.formatEther(totalPrice))
                })
            }
        }
        setLoading(false)
        setItems(items)
        setNftData(items)
    }
    const buyMarketItem = async (item) => {
        await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
        loadMarketplaceItems()
    }

    const handleSearch = () => {
        if (searchText) {
            const data = nftData.filter(val => val.name.includes(searchText) || val.description.includes(searchText) || searchText.includes(val.name) || searchText.includes(val.description));
            setItems(data);
        } else {
            setItems(nftData);
        }
    };

    useEffect(() => {
        if(isLoading) {
            loadMarketplaceItems()
        }
    }, [isLoading]);

    const sortFilterHandler = (e) => {
        const sortFlag = e.target.value === 'true';
        const items1 = items.sort((a, b) => {
            if ((sortFlag && a.price < b.price) || (!sortFlag && a.price > b.price)) {
                return -1;
            }
            if ((sortFlag && a.price > b.price) || (!sortFlag && a.price < b.price)) {
                return 1;
            }
            return 0;
        })
        setItems(items1.map(val => val));
    };

    if (loading) return (
        <Loading />
    )

    return (
        <><div className="container mt-4 mb-4">
            <div className="row">
                <div className="col-md-9">
                    <h2 className="mb-0">NFTs</h2>
                    <p className="text-muted type-6 mt-0"> Your favourite NFTs are here</p>
                </div>
                <div className="col-md-3">
                    <div className="form-group row mt-2">
                        <div className="col-md-11 mt-1" style={{ paddingRight: "0px !important" }}><input className="form-control" placeholder="Search Product..." value={searchText} onChange={(e) => setSearchText(e.target.value)} /></div>
                        <div className="col-md-1" style={{ paddingLeft: "0px !important" }} >
                            <div className="mt-1">
                                <Button onClick={handleSearch}><i className="fas fa-search"></i></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="mx-3 mt-3 mb-4">
                                    <div className="card border-secondary  mb-3" >
                                        <div className="card-header">{account.slice(0, 12) + '...' + account.slice(29,)}</div>
                                        <div className="card-body text-success ">
                                            <h5 className="card-title"><i className="fab fa-ethereum"> </i>   {balance.slice(0, 6)} </h5>
                                            <p className="card-text">Invest in the Greener Future, but buying NFT from farmers, and providing them resources to invest in sustainable farming methods</p>
                                        </div>
                                    </div>
                                    <br />

                                    <h6 className="text-muted">PRICE SORTING</h6>
                                    <div className="ml-2">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="low-to-high" value={true} onChange={sortFilterHandler} />
                                            <label className="form-check-label" htmlFor="low-to-high">Low to High</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="high-to-low" value={false} onChange={sortFilterHandler} />
                                            <label className="form-check-label" htmlFor="high-to-low">High to Low</label>
                                        </div>
                                    </div>
                                    {/*<div className="form-group my-4">*/}
                                    {/*    <h6 className="text-muted">PRICE RANGE</h6>*/}
                                    {/*    <input type="range" className="form-control-range" />*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="row no-gutters">
                                {items.length > 0 && items.map((item, idx) => (
                                    <div className="col-6 col-sm-4 col-md-4" key={idx}>
                                        <div className="card mx-1 mb-3">
                                            <img src={item.image} className="w-full" alt='nft icon' />
                                            <div className="card-body">

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <p className="text-muted type-6 my-0">{item.name}</p>
                                                        <h5 className="my-0">
                                                            <a onClick={() => navigate('/nft-details', { state: { nfts: item } })}>{item.description}</a>
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-md-6">
                                                        <p className="text-success type-6 my-0">
                                                            <i className="fab fa-ethereum"> </i> {ethers.utils.formatEther(item.totalPrice)}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="text-end float-end mt-1">
                                                            <button onClick={() => buyMarketItem(item)} type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#nft1">Buy Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {items.length <= 0 && (<div className="col-12 col-sm-12 col-md-12">
                                    <div className="card mx-1 mb-3">
                                        <div className="card-body">
                                            <p className="text-danger text-center type-6 my-0">No Records found!</p>
                                        </div>
                                    </div>
                                </div>)}
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
