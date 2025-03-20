import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import hooks

import { business, environmental, European, Bill, jewish } from '../../assets';

const books = [
  {
    id: 1,
    title: 'The Routledge Atlas of Jewish History',
    image: jewish,
    rentalPrice: 5, // Rental price per day
    description: 'A comprehensive history of the Jewish people and their journey through time.',
  },
  {
    id: 2,
    title: 'European Warfare, 1660-1815',
    image: European,
    rentalPrice: 6,
    description: 'An in-depth look into European wars between 1660 and 1815, a time of great military innovation.',
  },
  {
    id: 3,
    title: 'The Earthscan Reader in Business and Sustainable Development',
    image: business,
    rentalPrice: 7,
    description: 'A collection of pivotal readings in sustainable business practices and environmental ethics.',
  },
  {
    id: 4,
    title: 'A Short History of Nearly Everything',
    image: Bill,
    rentalPrice: 4.5,
    description: 'A fascinating exploration of the wonders of the universe, from biology to astronomy.',
  },
];

export default function BookDetails() {
  const { bookId } = useParams(); // Get bookId from URL
  const [book, setBook] = useState(null); // State to store book details
  const navigate = useNavigate(); // Navigate function

  // Find the selected book from the book list
  useEffect(() => {
    const selectedBook = books.find((book) => book.id === parseInt(bookId));
    setBook(selectedBook);
  }, [bookId]);

  // Add book to cart
  const handleAddToCart = (book) => {
    // Logic for adding to cart (could use context or state management here)
    console.log('Added to cart:', book);
  };

  // Add book to wishlist
  const handleAddToWishlist = (book) => {
    // Logic for adding to wishlist (could use context or state management here)
    console.log('Added to wishlist:', book);
  };

  // Go back to the previous page
  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  if (!book) {
    return <div>Loading...</div>; // Show loading if book data is not yet available
  }

  return (
    <div className="w-full py-12">
      <button
        onClick={handleBack}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded mb-6"
      >
        Back
      </button>
      <div className="flex flex-col items-center">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-96 object-cover mb-6"
        />
        <h2 className="text-4xl font-semibold mb-4">{book.title}</h2>
        <p className="text-lg text-gray-600 mb-6">{book.description}</p>
        <p className="text-xl font-semibold text-blue-500 mb-6">Rs{book.rentalPrice} / day</p>

        {/* Buttons to Add to Cart and Add to Wishlist */}
        <div className="flex gap-6">
          <button
            onClick={() => handleAddToCart(book)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleAddToWishlist(book)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
