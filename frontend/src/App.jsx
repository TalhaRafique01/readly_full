import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './pages/Home/Hero';
import Footer from './pages/Home/Footer';
import About from './pages/Home/About';
import Contact from './pages/Home/Contact';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import Forgot from './pages/auth/Forgot';
import BookReservationForm from './pages/Home/Reservation';
import BookSwappingForm from './pages/Home/Swaping';
import Dashboard1 from './pages/Home/Sidebar';
import CheckoutPage from './pages/Home/Checkout';
import BooksListPage from './pages/Home/Cart';
import RequestReviewPage from './pages/Home/Request';
import AddBookForm from './pages/Home/Dashboard';
import UserProfileSettings from './pages/Home/Setting';
import UserDashboard from './pages/Home/userdash';
import LibraryPage from './pages/Home/Library';
import Islamic from './pages/Home/Category/Islamic';
import Urdu from './pages/Home/Category/Urdu';
import History from './pages/Home/Category/History';
import English from './pages/Home/Category/English';
import Law from './pages/Home/Category/Law';
import Tech from './pages/Home/Category/IT';
import Business from './pages/Home/Category/Business';
import Science from './pages/Home/Category/Science';
import Math from './pages/Home/Category/Math';
import Wishlist from './pages/Home/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';
import Reset from './pages/auth/Reset';




function App() {
  return (
    <div>
      <div className="w-full overflow-hidden">
        <div>
          <Navbar />
        </div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HeroSection />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="reset-password/:token" element={<Reset />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="add-book" element={<AddBookForm />} />
            <Route path="reservation" element={<BookReservationForm />} />
            <Route path="swap" element={<BookSwappingForm />} />
            <Route path="sidebar" element={<Dashboard1 />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="cart" element={<BooksListPage />} />
            <Route path="request" element={<RequestReviewPage />} />
            <Route path="setting" element={<UserProfileSettings />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
