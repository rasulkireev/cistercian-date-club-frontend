import React, {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';
import {ethers} from 'ethers'

import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import CistercianDates from './components/CistercianDates';
import CistercianDateProfile from './components/CistercianDateProfile';
import Home from './components/Home';
import MintNFT from './components/MintNFT';

function App() {

	const [defaultAccount, setDefaultAccount] = useState(null);
  const [tokenIDs, setTokenIDs] = useState([]);
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

  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_POLYGONSCAN_API_URL}/api?module=account&action=tokennfttx&address=${defaultAccount}&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const resultArray = data.result
        const reducedResultsArray = resultArray.filter(data =>
          (data.tokenName === "Cistercian Date")
        )
        const cistercianDataTokenIDsArray = reducedResultsArray.map(item =>
          {return item['tokenID']}
        )
        setTokenIDs(cistercianDataTokenIDsArray)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
  }, [defaultAccount]);

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
            <Route path="/" element={<CistercianDates defaultAccount={defaultAccount} tokenIDs={tokenIDs} />}/>
            <Route path="mint" element={<MintNFT />}/>
            <Route path=":date" element={<CistercianDateProfile />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>

        </div>
      </div>
    );
  }
}

export default App;
