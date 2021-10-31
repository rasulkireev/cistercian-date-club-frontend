import React, { useState, useEffect } from 'react';
import CistercianDate from './CistercianDate'

const CistercianDates = (walletAddress) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&address=${walletAddress.walletAddress}&startblock=0&endblock=999999999&sort=asc&apikey=PNT7KZVXFHKTH6UB4H3C7ABDQ841CN3ITY`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const resultArray = data.result
        const cistercianDateTokenIDs = resultArray.map(function(datum) {
          if(datum.tokenName === "Cistercian Date") {
            return datum.tokenID
          }
        })
        setData(cistercianDateTokenIDs);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [walletAddress]);

  if (loading) return "Loading...";
  if (error) return "Error!";

  if (data) {
    return (
      <div>
          {data.map(
              tokenID => <CistercianDate key={tokenID} tokenID={tokenID} walletAddress={walletAddress.walletAddress} />
          )}
      </div>
    )
  }
};

export default CistercianDates;