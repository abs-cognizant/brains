"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"; //nextjs
import { useState } from "react";
//import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBasket,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo_ie.png";
import Image from "next/image";

const categories = [
  {
    name: "Home & Garden",
    links: ["Clothing", "Shoes", "Accessories", "New In"],
  },
  {
    name: "Furniture & Lights",
    links: ["Clothing", "Shoes", "Accessories", "Grooming"],
  },
  {
    name: "Electricals",
    links: ["Furniture", "Decor", "Kitchen", "Outdoor"],
  },
  {
    name: "Women",
    links: ["TVs", "Laptops", "Phones", "Appliances"],
  },
  {
    name: "Men",
    links: ["Makeup", "Skincare", "Fragrance"],
  },
  {
    name: "Beauty",
    links: ["Clothing", "Toys", "Nursery"],
  },
  {
    name: "Baby & Kids",
    links: ["Fitness", "Outdoor", "Footwear"],
  },
  {
    name: "Sports & Travel",
    links: ["For Her", "For Him", "For Kids"],
  },
  {
    name: "Gifts",
    links: ["All Sale", "Women", "Men", "Home"],
  },
  {
    name: "Holiday Shop",
    links: ["All Sale", "Women", "Men", "Home"],
  },
  {
    name: "Brands",
    links: ["All Sale", "Women", "Men", "Home"],
  },
  {
    name: "Sale & Offers",
    links: ["All Sale", "Women", "Men", "Home"],
  },
];

export default function HeaderComponent() {
  const [search, setSearch] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { user, logout } = useAuth();
  return (
    <header className="border-b shadow-sm relative z-50">
      <div className="flex items-center justify-end px-2 py-1 text-xs bg-[#f3f2f1]">
        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            About Us
          </Link>
          {/* <Link href="/" className="hover:underline">
            John Lewis Brands
          </Link> */}
          <Link href="/" className="hover:underline">
            Brand A-Z
          </Link>
          <Link href="/" className="hover:underline">
            Our shops
          </Link>
          <Link href="/" className="hover:underline">
            Cushrefmer services
          </Link>
          <Link href="/" className="hover:underline">
            Our services
          </Link>
          <Link href="/" className="hover:underline">
            Track order
          </Link>
          {/* <Link href="/" className="hover:underline">
            My John Lewis
          </Link> */}
          <Link href="/" className="hover:underline">
            Partnership Credit Card
          </Link>
          <Link href="/" className="hover:underline">
            Insurance
          </Link>
        </div>
        {/* <div>
          <Link href="/sign-in" className="flex items-center gap-1 hover:underline">
            <User className="w-4 h-4" /> Sign In
          </Link>
        </div> */}
      </div>

      <div className="flex items-center justify-between p-[24px] bg-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
          <Link href="/" className="text-xl font-bold">
            <Image priority className="h-auto w-[12rem]" src={logo} alt="" />
          </Link>
        </div>

        {/* <div className="hidden md:flex flex-1 max-w-md mx-4">
          <Button className="rounded-l-none">
            <Search className="w-5 h-5" />
          </Button>
          <Input
            type="text"
            placeholder="Search product or brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-r-none"
          />
        </div> */}

        <div className="hidden md:flex mx-4 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none"
            color="black"
            style={{ scale: 1.25 }}
          />
          <Input
            type="text"
            placeholder="Search product or brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border-[#6f6f6f] hover:border-2  hover:border-black rounded-none lg:w-[560px] md:w-[480px] h-[48px] !text-base placeholder:text-center" // Add left padding to make space for the icon
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/account"
                className="flex items-center gap-1 hover:underline"
              >
                <User className="w-5 h-5" /> John
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1 hover:underline"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                href="/"
                className="flex items-center gap-1 hover:underline"
              >
                <ShoppingBasket className="w-5 h-5" />
              </Link>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 hover:underline"
            >
              Sign In <User className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>

      <nav className="hidden md:flex justify-center gap-6 px-4 py-2 text-sm relative">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="relative"
            onMouseEnter={() => setHoveredCategory(cat.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              href={`/${cat.name.toLowerCase().replace(/ & /g, "-")}`}
              className={`text-base py-4 hover:underline ${
                cat.name === "Sale & Offers" ? "text-red-600" : ""
              }`}
            >
              {cat.name}
            </Link>

            {hoveredCategory === cat.name && (
              <div className="absolute left-0 top-full mt-2 min-w-[300px] bg-white shadow-xl border rounded p-6 z-50">
                <h3 className="text-base mb-4">{cat.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {cat.links.map((sub) => (
                    <Link
                      key={sub}
                      href={`/${cat.name
                        .toLowerCase()
                        .replace(/ & /g, "-")}/${sub
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="hover:underline text-sm"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
