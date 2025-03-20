import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { islamic, urdu, history, english, law, it, business, science, math } from "../../assets";

export default function Feature() {
  const categories = [
    { name: "Islamic", image: islamic, link: "/islamic" },
    { name: "Urdu", image: urdu, link: "/urdu" },
    { name: "History", image: history, link: "/history" },
    { name: "English", image: english, link: "/english" },
    { name: "Law", image: law, link: "/law" },
    { name: "IT", image: it, link: "/it" },
    { name: "Business", image: business, link: "/business" },
    { name: "Science", image: science, link: "/science" },
    { name: "Mathematics", image: math, link: "/mathematics" },
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
      <div className="grid px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, i) => (
          <Link to={category.link} key={i} className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={category.image} alt={category.name} className="w-full object-contain" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
