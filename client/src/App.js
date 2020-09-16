import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/form";
import Leads from "./components/leads";
import KeyBuyingIndicators from "./components/keyBuyingIndicators";

function App() {
  const [leads, setLeads] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isEligible, setIsEligible] = useState(true);

  useEffect(() => {
    fetch("http://localhost:7777/api/leads")
      .then((res) => res.json())
      .then((leads) => setLeads(leads));
  }, [formSubmitted]);

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  const handleIsEligibleLead = (isEligible) => {
    setIsEligible(!isEligible);
  };

  return (
    <>
      <h1 className="text-center text-5xl text-gray-800">
        Sales Leads Project
      </h1>
      <div className="flex flex-col lg:grid lg:grid-cols-3">
        <Form onSubmit={handleSubmit} />
        <div>
          <Leads
            onEligibleLeadChange={handleIsEligibleLead}
            leads={leads}
            isEligible={isEligible}
          />
          <KeyBuyingIndicators />
        </div>
      </div>
    </>
  );
}

export default App;
