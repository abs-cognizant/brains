"use client";

import { useRouter } from 'next/navigation'; // ✅ correct in App Router
import Link from "next/link";
import { useState } from 'react';
//import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { Input } from '@/components/ui/input'; // Shadcn UI Input (or your custom input)
import { Button } from '@/components/ui/button'; // Shadcn UI Button (or your custom button)
import { ShoppingCart } from 'lucide-react'; // Example icon library
import { User } from 'lucide-react';
import { Search } from 'lucide-react';
import { Menu } from 'lucide-react'; // For mobile navigation
import logo from "@/assets/logo.png";

const HeaderComponent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Optional Promotional Bar */}
      {/* <div className="bg-primary-500 text-white text-center py-2">
        Free Shipping on Orders Over $50!
      </div> */}

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
            <img className="h-8" src={logo.src} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex items-center ml-4">
          <Input type="text" placeholder="Search products..." className="w-64 rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-300" />
          <Button variant="outline" size="sm" className="ml-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Account & Cart (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login" className="text-gray-600 hover:text-gray-800 flex items-center">
            <User className="h-5 w-5 mr-1" />
            Account
          </Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-gray-800 flex items-center">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-[-0.5rem] right-[-0.5rem] bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              0 {/* Replace with actual cart item count */}
            </span>
            <span className="ml-1">Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-gray-600 hover:text-gray-800 focus:outline-none focus:ring focus:ring-primary-200">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 p-4">
          <Link href="/products" className="block py-2 text-gray-600 hover:text-gray-800">Products</Link>
          <Link href="/categories" className="block py-2 text-gray-600 hover:text-gray-800">Categories</Link>
          <Link href="/about" className="block py-2 text-gray-600 hover:text-gray-800">About Us</Link>
          <Link href="/contact" className="block py-2 text-gray-600 hover:text-gray-800">Contact</Link>
          <div className="mt-4">
            <Input type="text" placeholder="Search products..." className="w-full rounded-md shadow-sm focus:ring focus:ring-primary-200 focus:border-primary-300" />
          </div>
          <div className="mt-4 space-y-2">
            <Link href="/account" className="py-2 text-gray-600 hover:text-gray-800 flex items-center">
              <User className="h-5 w-5 mr-1" />
              Account
            </Link>
            <Link href="/cart" className="relative py-2 text-gray-600 hover:text-gray-800 flex items-center">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                0
              </span>
              <span className="ml-1">Cart</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;