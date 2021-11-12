import React, { useState, useEffect } from 'react';
import CistercianDate from './CistercianDate'

function CistercianDates(props) {

  const [tokenIDs, setTokenIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(props.defaultAccount)
    const url = `https://${process.env.REACT_APP_POLYGONSCAN_API_URL}/api?module=account&action=tokennfttx&address=${props.defaultAccount}&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`
    console.log(url)
    fetch(url)
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
  }, [props.defaultAccount]);

  if (loading) return "Loading...";
  if (error) return "Error!";

  if (tokenIDs.length === 0) {
    return ("You don't have any Cistercian Date NFTs")
  }
  else if (tokenIDs.length > 0) {
    return (
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          {tokenIDs.map(
              tokenID => {
                return (
                  <CistercianDate key={tokenID} tokenID={tokenID} />
                )
              }
          )}
      </div>
    )
  }

};

export default CistercianDates;