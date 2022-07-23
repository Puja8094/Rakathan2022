import React, { useReducer } from "react";
import { createContext } from "react";
import { SET_ACCOUNT, SET_ACCOUNT_TYPE, SET_BALANCE, SET_LOADING, SET_MARKETPLACE, SET_NFT } from "./nftActions";
import nftReducer from "./nftReducer";

export const NftContext = createContext();


const NftProvider = ({ children }) => {
    const initialState = {
        marketplace: {},
        nft: {},
        account: '',
        balance: 0,
        isLoading: false,
        accountType: false
    };
    const [state, dispatch] = useReducer(nftReducer, initialState);
    const setAccount = (payload) => {
        dispatch({ type: SET_ACCOUNT, payload })
    }
    const setMarketplace = (payload) => {
        dispatch({ type: SET_MARKETPLACE, payload })
    }
    const setNFT = (payload) => {
        dispatch({ type: SET_NFT, payload })
    }
    const setBalance = (payload) => {
        dispatch({ type: SET_BALANCE, payload })
    }
    const setIsLoading = (payload) => {
        dispatch({ type: SET_LOADING, payload })
    }
    const setAccountType = (payload) => {
        dispatch({ type: SET_ACCOUNT_TYPE, payload })
    }
    return (
        <NftContext.Provider value={{
            account: state.account,
            marketplace: state.marketplace,
            nft: state.nft,
            balance: state.balance,
            isLoading: state.isLoading,
            accountType: state.accountType,
            setAccount,
            setMarketplace,
            setNFT,
            setBalance,
            setIsLoading,
            setAccountType
        }}>
            {children}
        </NftContext.Provider>
    )
};

export default NftProvider;
