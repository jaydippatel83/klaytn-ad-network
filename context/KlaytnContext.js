import React, { createContext, useEffect, useState, useContext } from "react";
import { db } from "../components/firebase";
import { AuthContext } from "./AuthConext";
import axios from "axios";
import { nftABI, nftMarketABI, nftaddress, nftmarketaddress, rentAbi, rentFactoryABI, rentFactoryAddress } from "../klaytn";
import { ethers } from "ethers";
import Web3 from "web3";

export const KlaytnContext = createContext(undefined);

export const KlaytnContextProvider = (props) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const web3 = new Web3()

  const [nfts, setNfts] = useState([]);
  const [myNFTs, setMyNFTs] = useState([]);
  const [rentLoading, setRentLoading] = useState(false);

  const setupUser = async () => {

  };

  const createNFT = async (_metadataUrl) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let tokencontract = new ethers.Contract(nftaddress, nftABI, signer);
    let transaction = await tokencontract.createToken(_metadataUrl);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    return tokenId;
  };

  const getNFTs = async () => {

  };

  const getMyNFTS = async () => {

  };

  const rentNFTs = async (data) => {
    setRentLoading(true);
    console.log(data, "data");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftmarketaddress, nftMarketABI, signer);
   const transaction = await contract.createMarketItem(nftaddress, data.nftId);
    var rentingAmount;
    var rentCont;
    const listingPriceofRent = web3.utils.toWei(data.Price, "ether");
    let rentFactoryContract = new ethers.Contract(
      rentFactoryAddress,
      rentFactoryABI,
      signer
    );
    rentingAmount =
      parseInt(listingPriceofRent) +
      (parseInt(listingPriceofRent) * parseInt(10)) / 100; 

     const sdate = new Date(data.StartDate);
     const edate = new Date(data.EndDate);
     const stimestamp = sdate.getTime() / 1000;
     const etimestamp = daedatete.getTime() / 1000; 

    let rentTransaction = await rentFactoryContract.createContract(
      user,
      parseInt(rentingAmount),
      nftaddress,
      "Wrapped KAN",
      "WKAN",
      tokenId,
      stimestamp,
      etimestamp
    );
    let rentTx = await rentTransaction.wait();
    let rentEvent = rentTx.events[0];
    rentCont = rentEvent.args[1];
    const contractRent = new ethers.Contract(rentCont, rentAbi, signer);
    await tokencontract.approve(await contractRent.wrappedToken(), tokenId);
    await tokencontract.wait();

    
    setRentLoading(false);
  };

  return (
    <KlaytnContext.Provider
      value={{
        createNFT,
        setupUser,
        getNFTs,
        nfts,
        rentNFTs,
        getMyNFTS,
        myNFTs,
        rentLoading
      }}
      {...props}
    >
      {props.children}
    </KlaytnContext.Provider>
  );
};
