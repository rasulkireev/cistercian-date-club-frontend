import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import CistercianDates from './CistercianDates'

const WalletCardEthers = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [web3Provider, setWeb3Provider] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
			setWeb3Provider(new ethers.providers.Web3Provider(window.ethereum));

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else if (!window.ethereum){
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  useEffect(() => {
    if(defaultAccount){
      web3Provider.getBalance(defaultAccount)
      .then(balanceResult => {
        setUserBalance(ethers.utils.formatEther(balanceResult));
      })
    };
  }, [defaultAccount, web3Provider]);

	if (defaultAccount) {
    return (
      <div className='walletCard'>
        <p>Address: {defaultAccount}</p>
        <CistercianDates walletAddress={defaultAccount} />
      </div>
    );
  }
  return (
    <div className='walletCard'>
      <h4> Connection to MetaMask using ethers.js </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className='accountDisplay'>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className='balanceDisplay'>
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
}

export default WalletCardEthers;