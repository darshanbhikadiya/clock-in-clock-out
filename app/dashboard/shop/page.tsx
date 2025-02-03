"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const rewards = [
  {
    id: 1,
    name: "Spotify Premium (1 Month)",
    points: 20,
    actualPrice: "$9.99",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
  },
  {
    id: 2,
    name: "Amazon Gift Card",
    points: 50,
    actualPrice: "$25",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    points: 40,
    actualPrice: "$15.99",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
  },
];

export default function ShopPage() {
  const userPoints = 75; // This would come from your user data

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Rewards Shop</h1>
        <p className="text-gray-600">
          Your Points Balance: <span className="font-bold">{userPoints}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id}>
            <img
              src={reward.image}
              alt={reward.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle>{reward.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Market Price</p>
                  <p className="font-bold">{reward.actualPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Points Required</p>
                  <p className="font-bold text-green-600">{reward.points} pts</p>
                </div>
              </div>
              <Button
                className="w-full"
                disabled={userPoints < reward.points}
              >
                Redeem
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}