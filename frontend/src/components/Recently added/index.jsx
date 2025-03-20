import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { business, environmental, European, Bill, jewish } from '../../assets';

export default function Recently() {
  const [cart, setCart] = useState([]); // State to store the cart
  const [wishlist, setWishlist] = useState([]); // State to store the wishlist
  const [selectedBook, setSelectedBook] = useState(null); // State to manage selected book
  const navigate = useNavigate(); // Set up navigate function from React Router

  // Sample book data with rental price and description
  const books = [
    {
      title: 'The Routledge Atlas of Jewish History',
      image: jewish,
      rentalPrice: 5,
      description: 'A comprehensive history of the Jewish people and their journey through time.',
    },
    {
      title: 'European Warfare, 1660-1815',
      image: European,
      rentalPrice: 6,
      description: 'An in-depth look into European wars between 1660 and 1815, a time of great military innovation.',
    },
    {
      title: 'The Earthscan Reader in Business and Sustainable Development',
      image: business,
      rentalPrice: 7,
      description: 'A collection of pivotal readings in sustainable business practices and environmental ethics.',
    },
    {
      title: 'A Short History of Nearly Everything',
      image: Bill,
      rentalPrice: 4.5,
      description: 'A fascinating exploration of the wonders of the universe, from biology to astronomy.',
    },
  ];

  // Function to add books to the cart
  const addToCart = (book) => {
    setCart([...cart, book]);
    navigate('/cart', { state: { cart: [...cart, book] } }); // Temporarily store cart state
  };

  // Function to add books to the wishlist
  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    navigate('/wishlist', { state: { wishlist: [...wishlist, book] } }); // Temporarily store wishlist state
  };

  // Handle opening the modal with book details
  const handleViewDetails = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="w-full py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">Recently Added</h2>

      {/* Responsive Wrapper */}
      <div className="flex flex-wrap justify-center gap-4 mx-10">
        {books.map((book, index) => (
          <div key={index} className="bg-gray-100 rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <p className="text-xl max-w-[300px] font-semibold mb-2">{book.title}</p>
              <p className="text-sm text-gray-600 mb-2">{book.description}</p>
              <p className="text-lg font-semibold text-blue-500">Rs{book.rentalPrice} / day</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(book)} // Adds the book to cart
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
              >
                Add To Cart
              </button>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(book)} // View details on click
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
        {/* View Cart Button */}
        <button
          onClick={() => navigate('/cart', { state: { cart } })} // Navigate to cart page
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          View Cart ({cart.length} items)
        </button>
      </div>

      {/* Book Details Page */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-semibold mb-4">{selectedBook.title}</h3>
            <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-64 object-cover mb-4" />
            <p className="text-lg mb-4">{selectedBook.description}</p>
            <p className="text-lg font-semibold text-blue-500">Rs{selectedBook.rentalPrice} / day</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(selectedBook)} // Adds the selected book to cart
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Add to Cart
            </button>

            {/* Add to Wishlist Button */}
            <button
              onClick={() => addToWishlist(selectedBook)} // Adds the selected book to wishlist
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Add to Wishlist
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedBook(null)} // Close the book details page
              className="absolute top-2 right-2 text-xl font-bold text-gray-500"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
