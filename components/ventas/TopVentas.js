import React from "react";

const TopVentas = () => {
  return (
    <div className="mt-10 grid grid-cols-3 gap-12">
      <div className="">
        <h3 className="bg-gray-100 px-12 py-4 font-bold">Top Sales products</h3>
        <ul className="px-12 py-4">
          <li>Wild rice</li>
          <li>Black rice</li>
          <li>White rice</li>
          <li>Red rice</li>
        </ul>
      </div>
      <div className="">
        <h3 className="bg-gray-100 px-12 py-4 font-bold">Top Income Products</h3>
        <ul className="px-12 py-4">
          <li>Wild rice</li>
          <li>Black rice</li>
          <li>White rice</li>
          <li>Red rice</li>
        </ul>
      </div>
      <div className="">
        <h3 className="bg-gray-100 px-12 py-4 font-bold">Products with less sales</h3>
        <ul className="px-12 py-4">
          <li>Wild rice</li>
          <li>Black rice</li>
          <li>White rice</li>
          <li>Red rice</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default TopVentas;
