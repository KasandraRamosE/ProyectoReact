import React from "react";
import Categories from "../common/components/Categories";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Categorías</h1>
      <Categories />
    </div>
  );
};

export default HomePage;
