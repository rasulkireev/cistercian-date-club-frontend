import React from 'react';
import Web3 from 'web3';
import {cistercianDateNftContractABI} from '../config'

export default class CistercianDate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      metadata: null
    }
  }

  render() {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/d4cab23e70c34cd49fb5c101662a4339"));
    const contractAddress = web3.utils.toChecksumAddress("0x459e4b6e8F02b89E1Ad93D52CD0FF6d9d88a6d7D")
    const nftContract = new web3.eth.Contract(cistercianDateNftContractABI, contractAddress)
    nftContract.methods.tokenURI(this.props.tokenID).call({from: this.props.walletAddress})
    .then(result => {
      fetch(result)
        .then(response => {
          return response.json()
        })
        .then(metadata => {
          this.setState({metadata})
        })
    })

    const { metadata } = this.state;

    if(metadata) {
        return (
          <div>
            <img src={metadata.image} alt={metadata.name}/>
            <p>{metadata.name}</p>
          </div>
      );
    }
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}