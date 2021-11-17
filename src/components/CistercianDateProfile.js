import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import {ethers} from 'ethers';
import {cistercianDateNftContractABI} from '../config'

function CistercianDateProfile() {
  let params = useParams();

  const [dateResponse, setDateResponse] = useState();
  const [metadata, setMetadata] = useState(null);
  const [openSeaURL, setOpenSeaURL] = useState(null);

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const nftContract = new ethers.Contract(process.env.REACT_APP_ERC721_CONTRACT, cistercianDateNftContractABI, provider)

  fetch(`http://127.0.0.1:8000/date/${params.date}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      setDateResponse(data)
      nftContract.tokenURI(data.tokenID)
        .then(result => {
          fetch(result)
            .then(response => {
              return response.json()
            })
            .then(metadata => {
              setMetadata(metadata)
            })
        })
        setOpenSeaURL(`https://${process.env.REACT_APP_OPENSEA_URL}/${process.env.REACT_APP_ERC721_CONTRACT}/${data.tokenID}`)
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    })


  if (metadata) {
    return (
      <div>
        <article className="flex flex-col justify-start bg-white border border-solid rounded shadow">
          <div className="border-b border-gray-300 border-solid rounded-t-lg">
            <img className="object-cover object-left-top w-full h-auto p-6 border-0 rounded-t" src={metadata.image} alt={metadata.name} />
          </div>
          <div className="flex flex-row h-full p-4 space-x-1 border-b border-gray-300 border-solid">
            <h3 className="font-bold">{metadata.name}</h3>
            <a className="hover:underline hover:text-blue-700 " href={openSeaURL}>(Link)</a>
          </div>
        </article>
      </div>
    )
  }
  else {
    return ("")
  }
}

export default CistercianDateProfile;