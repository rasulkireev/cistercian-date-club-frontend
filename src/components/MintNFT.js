import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MintNFT = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [dateResponse, setDateResponse] = useState();
  const [dateURL, setDateURL] = useState();
  const [responseStatus, setResponseStatus] = useState();

  useEffect(() => {
      const dateString = `${startDate.getFullYear()}-${String(startDate.getMonth()+1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`

      fetch(`http://127.0.0.1:8000/date/${dateString}`)
        .then((response) => {
            setResponseStatus(response.status)
            return response.json();
          })
          .then((data) => {
            setDateResponse(data)
            if (responseStatus === 404) {
              setDateURL("mint")
            }
            else {
              setDateURL(data.date)
            }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        })
  }, [startDate]);

  if (dateResponse && responseStatus) {
    return(
       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-4 space-y-2 bg-white shadow sm:rounded-lg sm:px-10">
        <h2 className="text-2xl font-extrabold text-center text-gray-900">Select a Date to Mint</h2>
          <DatePicker
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <Link to={`/${dateURL}`} className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {responseStatus===404 ? "Mint NFT" : "See NFT"}
          </Link>
        </div>
      </div>
    );
  }
  else {
    return ("")
  }

};

export default MintNFT;