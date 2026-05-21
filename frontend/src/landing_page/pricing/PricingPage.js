import React from "react";
import Hero from "./Hero";
// Check if Brokerage is inside a subfolder named 'Brokerage'
import Brokerage from "./Brokrage"; 
import OpenAccount from "../OpenAccount";

function PricingPage() {
  return (
    <>
      <Hero />
      <OpenAccount />
      <Brokerage />
    </>
  );
}

export default PricingPage;