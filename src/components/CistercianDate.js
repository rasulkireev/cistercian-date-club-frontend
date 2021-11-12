import React, {useState} from 'react'
// import Web3 from 'web3';
import {ethers} from 'ethers'
import {cistercianDateNftContractABI} from '../config'

function CistercianDate(props) {

  const [metadata, setMetadata] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const nftContract = new ethers.Contract(process.env.REACT_APP_ERC721_CONTRACT, cistercianDateNftContractABI, provider)
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
    const openseaUrl = `https://${process.env.REACT_APP_OPENSEA_URL}/${process.env.REACT_APP_ERC721_CONTRACT}/${props.tokenID}`


  if(metadata) {
    return (
      <article className="flex flex-col justify-start bg-white border border-solid rounded shadow">
        <div className="border-b border-gray-300 border-solid rounded-t-lg">
          <img className="object-cover object-left-top w-full h-auto p-6 border-0 rounded-t" src={metadata.image} alt={metadata.name} />
        </div>
        <div className="flex flex-row h-full p-4 space-x-1 border-b border-gray-300 border-solid">
          <h3 className="font-bold">{metadata.name}</h3>
          <a className="hover:underline hover:text-blue-700 " href={openseaUrl}>(Link)</a>
        </div>
      </article>
    )
  }
  else {
    return ("Loading...")
  }
}

export default CistercianDate;