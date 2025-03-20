import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  // Get cart data and total price from BooksListPage
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalPrice } = location.state || { cart: [], totalPrice: 0 };

  const [updatedCart, setUpdatedCart] = useState(cart);
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card'); // Default payment method
  const [deliveryCharges, setDeliveryCharges] = useState(150); // Set a fixed delivery charge (can be dynamically calculated)

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Handle the change in rental days for each book
  const handleDaysChange = (index, event) => {
    const updatedBooks = [...updatedCart];
    const days = parseInt(event.target.value, 10);
    if (days < 1) {
      updatedBooks[index].rentalDays = 1;
    } else {
      updatedBooks[index].rentalDays = days;
    }

    // Recalculate the total price
    const newTotalPrice = updatedBooks.reduce(
      (acc, item) => acc + (item.rentalPrice * (item.rentalDays || 1)),
      0
    );

    setUpdatedCart(updatedBooks);
    setUpdatedTotalPrice(newTotalPrice);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation: Check if all required fields are filled
    if (!address || !contactNumber || !cardNumber || !cardHolderName || !expiryDate || !cvv) {
      alert("Please fill in all the required fields.");
      return; // Stop the form submission if fields are missing
    }

    // If validation passes, proceed with the order confirmation
    alert(`
      Your order has been confirmed! 
      Total Price: Rs${updatedTotalPrice + deliveryCharges}
      Payment Method: ${paymentMethod}
      Delivery Charges: Rs${deliveryCharges}
      Books:
      ${updatedCart.map((item) => `${item.title} (${item.rentalDays} days)`).join(', ')}
      Address: ${address}
      Contact: ${contactNumber}
      
    `);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Checkout</h1>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Cart</h2>
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            Return to Homepage
          </button>
        </div>
        <div className="space-y-4">
          {updatedCart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <div>
                <span className="font-semibold">{item.title}</span> - Rs{item.rentalPrice} / day
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor={`daysRented-${index}`} className="text-gray-700">Days</label>
                <input
                  type="number"
                  id={`daysRented-${index}`}
                  required
                  value={item.rentalDays || 1}
                  onChange={(e) => handleDaysChange(index, e)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between text-lg font-semibold text-gray-700">
          <span>Total Rental Price</span>
          <span className="text-blue-500">Rs{updatedTotalPrice}</span>
        </div>
      </div>

      {/* Delivery Charges Section */}
      <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Delivery Charges</h2>
        <div className="flex justify-between text-lg font-semibold text-gray-700">
          <span>Delivery Charges</span>
          <span className="text-blue-500">Rs{deliveryCharges}</span>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Payment Method</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700" htmlFor="paymentMethod">Choose Payment Method</label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Jazzcash">Jazzcash</option>
              <option value="Easypaisa">Easypaisa</option>
            </select>
          </div>

          {/* Credit Card Fields (shown only when paymentMethod is Credit Card or Debit Card) */}
          {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700" htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your card number"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="cardHolderName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardHolderName"
                  required
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the name on your card"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700" htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-gray-700" htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Jazzcash and Easypaisa Fields (shown when paymentMethod is Jazzcash or Easypaisa) */}
          {(paymentMethod === 'Jazzcash' || paymentMethod === 'Easypaisa') && (
            <div>
              <p className="text-gray-700">You will be redirected to the respective payment gateway to complete the payment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Delivery Address</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700" htmlFor="addressLine1">Address Line 1</label>
            <input
              type="text"
              id="addressLine1"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="addressLine2">Address Line 2</label>
            <input
              type="text"
              id="addressLine2"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="zipcode">Zip Code</label>
            <input
              type="text"
              id="zipcode"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              required
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      {/* Confirm Order Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
