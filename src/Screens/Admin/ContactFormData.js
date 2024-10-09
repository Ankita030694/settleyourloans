import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import PELoader from "../../Screens/Utils/PELoader";


function ContactFormData({ person, personIdx, deleteBtnClick }) {
  const [loader, setLoader] = useState(false);
  const d = new Date(person.created);
  return (
    <>
    {setLoader ? (<>
    
      <tr
      key={person.email}
      className={personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {person.created
          ? `${d.toDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` 
          : "No Date"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {person['Name']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Mobile Number']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.Email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.Queries}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.City}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.Language}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Monthly income']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Accomodation Status']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Employment status']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Past Settlement']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Payment to start settlement']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.Married ? 'yes':'no'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Total credit card dues']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['Total personal loan amount']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person['question11']}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <a
          href="#"
          id={person.id}
          onClick={deleteBtnClick}
          className="text-red-600 font-bold hover:text-red-900"
        >
          Delete
        </a>
      </td>
    </tr>
    
    </>):(<PELoader></PELoader>)}

    
    </>
  );
}

export default ContactFormData;
