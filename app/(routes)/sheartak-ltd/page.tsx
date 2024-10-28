import React from "react";

const SheartakPortfolio = () => {
  return (
    <div className="px-10 h-screen">
      <p>For Sheartak LTD interview</p>
      <object
        className="h-full"
        width="100%"
        data="/SheartakLTD.pdf"
        type="application/pdf"
      ></object>
    </div>
  );
};

export default SheartakPortfolio;
