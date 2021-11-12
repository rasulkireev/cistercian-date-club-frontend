import React, { useState, useEffect } from 'react';
import CistercianDate from './CistercianDate'

function CistercianDates(props) {

  const [tokenIDs, setTokenIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api-testnet.polygonscan.com/api?module=account&action=tokennfttx&address=${props.walletAddress}&startblock=0&endblock=999999999&sort=asc&apikey=PNT7KZVXFHKTH6UB4H3C7ABDQ841CN3ITY`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        const resultArray = data.result
        const cistercianDataTokenIDsArray = resultArray.map(function(datum) {
          if(datum.tokenName === "Cistercian Date") {
            return Number(datum.tokenID);
          }
          return []
        })
        setTokenIDs(cistercianDataTokenIDsArray)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.walletAddress]);

  if (loading) return "Loading...";
  if (error) return "Error!";

  if (tokenIDs.length === 0) {
    return ("You don't have any Cistercian Date NFTs")
  }
  else if (tokenIDs.length > 0) {
    return (
      <div className="border border-solid border-green-500">
        <p>Array Length: {tokenIDs.length}</p>
          {tokenIDs.map(
              tokenID => {
                return (
                <CistercianDate key={tokenID} tokenID={tokenID} walletAddress={props.walletAddress} />
                )
              }
          )}
      </div>
    )
  }

};

export default CistercianDates;