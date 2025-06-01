// components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Customer Services</h3>
          <ul className="space-y-1">
            <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
            <li><Link href="#" className="hover:underline">Delivery</Link></li>
            <li><Link href="#" className="hover:underline">Returns & Refunds</Link></li>
            <li><Link href="#" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Shopping with Us</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Track Your Order</Link></li>
            <li><Link href="#" className="hover:underline">Store Finder</Link></li>
            <li><Link href="#" className="hover:underline">Gift Cards</Link></li>
            <li><Link href="#" className="hover:underline">Price Match</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Our Story</Link></li>
            <li><Link href="#" className="hover:underline">Careers</Link></li>
            <li><Link href="#" className="hover:underline">Sustainability</Link></li>
            <li><Link href="#" className="hover:underline">Press</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:underline">Instagram</Link></li>
            <li><Link href="#" className="hover:underline">Facebook</Link></li>
            <li><Link href="#" className="hover:underline">Twitter/X</Link></li>
            <li><Link href="#" className="hover:underline">Pinterest</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t text-center py-4 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} YourBrandName. All rights reserved.
      </div>
    </footer>
  );
}
