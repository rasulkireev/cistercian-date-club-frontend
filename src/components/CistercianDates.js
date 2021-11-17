import React from 'react';
import CistercianDate from './CistercianDate'
import MintNFT from './MintNFT'

function CistercianDates(props) {

  if (props.tokenIDs.length === 0) {
    return (
      <div>
        <MintNFT />
      </div>
      )
  }
  else if (props.tokenIDs.length > 0) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          {props.tokenIDs.map(
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