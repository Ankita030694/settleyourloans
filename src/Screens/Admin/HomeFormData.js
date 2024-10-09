import React from "react";

function HomeFormData({ person, personIdx, deleteBtnClick, viewBtnClick }) {
  const d = new Date(person.date);
  return (
    <tr
      key={person.email}
      className={personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {person.date 
          ? `${d.toDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}` 
          : "No Date"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {person.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ₹{person.debtAmount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.monthlyIncome}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.settlementProcess}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.areYouFacing === true ? "Yes" : "No"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {person.address ? person.address : "No Address"}
      </td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <a
          href="#"
          id={person.id}
          onClick={viewBtnClick}
          className="text-indigo-600 font-bold hover:text-indigo-900"
        >
          View
        </a>
      </td> */}
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
  );
}

export default HomeFormData;
