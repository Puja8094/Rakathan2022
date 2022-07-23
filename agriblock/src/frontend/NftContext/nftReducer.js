import { SET_ACCOUNT, SET_ACCOUNT_TYPE, SET_BALANCE, SET_LOADING, SET_MARKETPLACE, SET_NFT } from "./nftActions";

const nftReducer = (state, action) => {
    switch (action.type) {
        case SET_ACCOUNT:
            return { ...state, account: action.payload };
        case SET_MARKETPLACE:
            return { ...state, marketplace: action.payload };
        case SET_NFT:
            return { ...state, nft: action.payload };
        case SET_BALANCE:
            return { ...state, balance: action.payload };
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_ACCOUNT_TYPE:
            return { ...state, accountType: action.payload };
        default:
            return state;
    }
};

export default nftReducer;
