import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { NftContext } from '../frontend/NftContext/NftProvider';
import connectors from './connectors'
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import farmer from './farmer.png'
import udomain from './udomain.png'

const Navigation = ({ web3Handler }) => {
    const { accounts, setAccount, accountType, setAccountType } = useContext(NftContext);
    const { active, account, activate, deactivate } = useWeb3React()
    const navigate = useNavigate();

    const logout = () => {
        setAccount('')
        setAccountType(false);
        deactivate()
        localStorage.removeItem('account');
        navigate('/');
    }

    function createConnectHandler(connectorId: string) {
        return async () => {
            try {
                const connector = connectors[connectorId]

                // Taken from https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-817631654
                if (
                    connector instanceof WalletConnectConnector &&
                    connector.walletConnectProvider
                ) {
                    connector.walletConnectProvider = undefined
                }
                console.log(connector.walletConnectProvider)
                await activate(connector)
            } catch (error) {
                console.error(error)
            }
        }
    }

    //async function handleDisconnect() {
    //    try {
    //        deactivate()
    //    } catch (error) {
    //        console.error(error)
    //    }
    //}

    //if (active) {
    //    return (
    //        <>
    //            <div>Connected to {account}</div>
    //            <button onClick={handleDisconnect}>Disconnect</button>
    //        </>
    //    )
    //}

    return (
        <nav className="navbar navbar-expand-lg navbar-effects sticky-top">
            <NavLink className="navbar-brand super-bold" to={`/front`}><img src={farmer} style={{ width: "32px" }} /> AGRI BLOCK RAKATHON 2022 </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-bars fa-fw"></i>
            </button>

            <div className="collapse navbar-collapse justify-content-end text-center" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    {account &&
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? "active-route" : ""}`} to={`/profile`}>Profile</NavLink>
                        </li>}

                    {!account &&
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => `nav-link ${isActive ? "active-route" : ""}`} to={`/`}>Home</NavLink>
                        </li>
                    }
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? "active-route" : ""}`} to={`/nft`}> NFT</NavLink>
                    </li>
                    {!accountType && <li className="nav-item">
                        <NavLink className="nav-btn btn btn-secondary btn-sm btn-block" to={`/register`}><i className="fa fa-sign-in-alt fa-fw"></i> Register </NavLink>
                    </li>}
                    <li className="nav-item nav-item-btn mb-2">
                        {account ? (<><button className="nav-btn btn btn-secondary btn-sm btn-block"><a href={`https://rinkeby.etherscan.io/address/${account}`} target="_blank"
                            rel="noopener noreferrer" > {account.slice(0, 5) + '...' + account.slice(38, 42)}</a></button>
                            <button onClick={logout} className="nav-btn btn btn-danger btn-sm btn-block ms-2"><i className="fa fa-sign-out-alt fa-fw"></i> Disconnect Wallet </button></>) : (
                                <><>{Object.keys(connectors).map(v => (
                                    <><button className="nav-btn btn btn-primary btn-sm btn-block ms-2" key={v} onClick={createConnectHandler(v)}>
                                        Login with Metamask
                                    </button></>
                                ))}<img src={udomain} className="ms-2 mt-2" style={{ width: "38px" }} /></></>
                                                         )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;
