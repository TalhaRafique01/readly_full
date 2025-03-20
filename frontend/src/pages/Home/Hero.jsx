import React from 'react';
import { library } from '../../assets';
import Feature from '../../components/feature Category';
import Recently from '../../components/Recently added';
import Contact from './Contact';
import { Link } from 'react-router-dom'; // Importing Link for navigation

export default function HeroSection() {
  return (
    <div className="bg-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="">
            <div className="bg-orange-400 p-4 rounded-lg mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search Book by name"
                className="border border-gray-300 rounded-lg px-4 py-2 md:w-1/2"
              />
              <Link to="/search">
                <button className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg ml-4">
                  Search
                </button>
              </Link>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4 italic">
                Pakistan's Largest Online Books Marketplace!
              </h1>
              <Link to="/reservation">
                <button className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/3">
            {/* Image of Books Stack */}
            <img src={library} alt="Books Stock" className="w-[200px] object-contain" />
          </div>
        </div>
      </div>
      <div>
        <Feature />
        <Recently />
        <Contact />
      </div>
    </div>
  );
}
