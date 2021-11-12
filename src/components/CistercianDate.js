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
      <article class="flex flex-col justify-start bg-white border border-solid rounded shadow">
        <div class="border-b border-gray-300 border-solid rounded-t-lg">
          <img class="object-cover object-left-top w-full h-auto border-0 rounded-t" src={metadata.image} alt={metadata.name} />
        </div>
        <div class="flex-auto h-full p-4 border-b border-gray-300 border-solid">
          <h3>{metadata.name}</h3>
        </div>
      </article>
    )
  }
  return ("Loading...")
}

export default CistercianDate;