import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountComponent() {
  return (
    <>
      <main className="flex-grow bg-white py-10 px-4 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-800">
            Account
          </h1>

          <p className="mb-6 text-gray-600">
            We’re here to help. Choose the topic below that best describes your
            issue and we’ll point you to the best solution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg cursor-pointer transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Online Orders
                </h2>
                <p className="text-gray-600 mb-4">
                  Get help with recent orders, deliveries, returns and refunds.
                </p>
                <Button>View help options</Button>
              </CardContent>
            </Card>

            <Link href="/chat">
              <Card className="hover:shadow-lg cursor-pointer transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Chat Support
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Assistance with website issues, app support or technical
                    queries.
                  </p>

                  <Button className="cursor-pointer">View help options</Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg cursor-pointer transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Product Queries
                </h2>
                <p className="text-gray-600 mb-4">
                  Learn more about specific products or check stock
                  availability.
                </p>
                  <Button>View help options</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg cursor-pointer transition-shadow">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Feedback & Complaints
                </h2>
                <p className="text-gray-600 mb-4">
                  Share your thoughts or let us know if something went wrong.
                </p>
                <Button>View help options</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
