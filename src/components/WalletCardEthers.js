import React from 'react'
import CistercianDates from './CistercianDates'

function WalletCardEthers(props) {

  var truncate = function (fullStr, strLen, separator) {
      if (fullStr.length <= strLen) return fullStr;

      separator = separator || '...';

      var sepLen = separator.length,
          charsToShow = strLen - sepLen,
          frontChars = Math.ceil(charsToShow/2),
          backChars = Math.floor(charsToShow/2);

      return fullStr.substr(0, frontChars) +
            separator +
            fullStr.substr(fullStr.length - backChars);
  };

	if (props.defaultAccount) {
    return (
        <button className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
          {truncate(props.defaultAccount, 15)}
        </button>
    );
  }
  return (
      <button
        className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        onClick={props.connectWalletHandler}
      >
          {props.connButtonText}
      </button>
  );
}

export default WalletCardEthers;