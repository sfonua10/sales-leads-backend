import React, { useState } from "react";
import KeyBuyingIndicators from "./KeyBuyingIndicators";
import Modal from "./modal";

const Leads = ({ leads, isEligible, onEligibleLeadChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [executeDelete, setExecuteDelete] = useState(false);
  const [targetLead, setTargetLead] = useState("");

  const handleEligibleLead = (e) => {
    onEligibleLeadChange(e.target.checked);
  };

  const rows = [];

  leads.forEach((lead) => {
    if (!isEligible && !lead.eligibleLead) {
      return;
    }
    rows.push(lead);
  });

  const handleDelete = () => {
    fetch(`http://localhost:7777/api/leads/${targetLead}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  const handleModal = (leadId) => {
    setTargetLead(leadId);
    setShowModal(true);
  };

  return (
    <div className="flex-col">
      <table className="border-separate border-2 border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              <input type="checkbox" onChange={handleEligibleLead} />
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              Name
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              Phone
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              City
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              State
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              Zip
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              Preferred Contact Method
            </th>
            <th className="border border-gray-400 px-4 py-2 text-gray-800">
              Update/Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((lead) => {
            return (
              <tr
                key={lead._id}
                className={`${lead.state === "Ohio" ? "bg-gray-300" : ""} ${
                  lead.eligibleLead === false ? "text-red-700 bg-red-200" : null
                }`}
              >
                <td className="border border-gray-400 px-4 py-2">
                  {lead.highleyLikelyToBuy ? (
                    <div className="text-xs px-3 bg-yellow-200 text-yellow-800 rounded-full">
                      HLB
                    </div>
                  ) : null}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lead.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lead.phone}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lead.city}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {lead.state}
                </td>
                <td className="border border-gray-400 px-4 py-2">{lead.zip}</td>
                <td
                  className={`${
                    lead.preferredContactMethod === "phone"
                      ? "text-green-600"
                      : lead.preferredContactMethod === "carrier pigeon"
                      ? "text-red-600"
                      : null
                  } border border-gray-400 px-4 py-2`}
                >
                  {lead.preferredContactMethod}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="mr-10">U</button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleModal(lead._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <KeyBuyingIndicators />
      {showModal ? (
        <Modal onDelete={handleDelete} onModal={setShowModal} />
      ) : null}
    </div>
  );
};

export default Leads;
