import React, {useState} from 'react'
// import Web3 from 'web3';
import {ethers} from 'ethers'
import {cistercianDateNftContractABI} from '../config'

function CistercianDate(props) {

  const [metadata, setMetadata] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const nftContract = new ethers.Contract("0x459e4b6e8F02b89E1Ad93D52CD0FF6d9d88a6d7D", cistercianDateNftContractABI, provider)
  nftContract.tokenURI(props.tokenID)
    .then(result => {
      fetch(result)
        .then(response => {
          return response.json()
        })
        .then(metadata => {
          setMetadata(metadata)
        })
    })


  if(metadata) {
      return (
        <div>
          <img src={metadata.image} alt={metadata.name}/>
          <p>{metadata.name}</p>
        </div>
    );
  }
  return(
    <div className="border border-red-500 border-solid">
      <p>Token ID: {props.tokenID}</p>
    </div>
  )
}

export default CistercianDate;