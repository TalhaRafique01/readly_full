import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importing the back arrow icon
import { business, jewish } from "../../../assets";

const Technology = () => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  const books = [
    {
      title: "The Sealed Nectar",
      image: jewish,
      rentalPrice: 50,
      description:
        "A comprehensive biography of Prophet Muhammad (PBUH) by Saif-ur-Rahman al-Mubarakpuri.",
    },
    {
      title: "Stories of the Prophets",
      image: business,
      rentalPrice: 40,
      description:
        "An engaging account of the lives of the prophets by Ibn Kathir.",
    },
    {
      title: "The Quran",
      image: jewish,
      rentalPrice: 30,
      description:
        "English translation of the Quran by Abdullah Yusuf Ali, offering clarity and depth.",
    },
  ];

  const addToCart = (book) => {
    setCart([...cart, book]);
    navigate("/cart", { state: { cart: [...cart, book] } });
  };

  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    navigate("/wishlist", { state: { wishlist: [...wishlist, book] } });
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
  };

  const handleReturnBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full py-12 flex flex-col items-center bg-gradient-to-br from-green-200 to-blue-200">
      {/* Return Back Button */}
      <button
        type="button"
        onClick={handleReturnBack}
        className="absolute-fix top-10 left-6 text-green-600 hover:text-green-800"
      >
        <FaArrowLeft size={30} />
      </button>

      <h1 className="text-3xl font-bold text-green-700 mb-8">Information Technology Books</h1>

      <div className="flex flex-wrap justify-center gap-4 mx-10">
        {books.map((book, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-xl font-semibold mb-2 text-green-700">
                {book.title}
              </p>
              <p className="text-sm text-gray-600 mb-2">{book.description}</p>
              <p className="text-lg font-semibold text-blue-500">
                Rs {book.rentalPrice} / day
              </p>

              <button
                onClick={() => addToCart(book)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleViewDetails(book)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/cart", { state: { cart } })}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          View Cart ({cart.length} items)
        </button>
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">{selectedBook.title}</h3>
            <img
              src={selectedBook.image}
              alt={selectedBook.title}
              className="w-full h-64 object-cover mb-4"
            />
            <p className="text-lg mb-4">{selectedBook.description}</p>
            <p className="text-lg font-semibold text-blue-500">
              Rs {selectedBook.rentalPrice} / day
            </p>

            <button
              onClick={() => addToCart(selectedBook)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Add to Cart
            </button>
            <button
              onClick={() => addToWishlist(selectedBook)}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Add to Wishlist
            </button>
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-500"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Technology;
