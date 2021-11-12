import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom';
import {ethers} from 'ethers'

import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CistercianDates from './components/CistercianDates';
import Home from './components/Home';

function App() {

	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
  const [currentEthNetwork, setCurrentEthNetwork] = useState(null);

  const connectWalletHandler = () => {
		if (window.ethereum && defaultAccount == null) {
			// set ethers provider
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.getNetwork()
        .then(result => {
          setCurrentEthNetwork(result.name)
        })

			// connect to metamask
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
        setConnButtonText('Wallet Connected');
				setDefaultAccount(result[0]);
			})
			.catch(error => {
        alert(error.message);
			});

		} else if (!window.ethereum){
      alert('Need to install MetaMask');
		}
  }

  if (!defaultAccount) {
    return (
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header
            connectWalletHandler={connectWalletHandler}
            connButtonText={connButtonText}
            defaultAccount={defaultAccount}
        />
        <Home />
      </div>
    );
  }

  if (defaultAccount && currentEthNetwork !== process.env.REACT_APP_CURRENT_NETWORK) {
    return (
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header
            connectWalletHandler={connectWalletHandler}
            connButtonText={connButtonText}
            defaultAccount={defaultAccount}
        />

        <div className="screen">
          <p>
            Please swtich your wallet to the Polygon Network and reload the page. You current network is <b>{currentEthNetwork}</b>.
          </p>
        </div>
      </div>
    );
  }


  if (defaultAccount && currentEthNetwork === process.env.REACT_APP_CURRENT_NETWORK) {
    return (
      <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header
            connectWalletHandler={connectWalletHandler}
            connButtonText={connButtonText}
            defaultAccount={defaultAccount}
        />

        <div className="screen">
          <Routes>
            <Route path="/" element={<CistercianDates defaultAccount={defaultAccount} />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>

        </div>
      </div>
    );
  }
}

export default App;
