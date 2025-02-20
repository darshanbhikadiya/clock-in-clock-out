"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { RootState } from '@/app/redux/store';
import { increaseQty, decreaseQty, remove } from '@/app/redux/cartSlice';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// const rewards = [
//     {
//       id: 1,
//       name: "Spotify Premium (1 Month)",
//       points: 20,
//       actualPrice: "$9.99",
//       image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400",
//     },
//     {
//       id: 2,
//       name: "Amazon Gift Card",
//       points: 50,
//       actualPrice: "$25",
//       image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400",
//     },
//     {
//       id: 3,
//       name: "Netflix Subscription",
//       points: 40,
//       actualPrice: "$15.99",
//       image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400",
//     },
// ];

interface CartItem {
  id: number;
  name: string;
  points: number;
  actualPrice: string;
  qty: number;
  image: string;
}



const Cart = () => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state:RootState) => state.cart);

  const [userPoints, setUserPoints] = useState(75); 
  const [redeemedRewards, setRedeemedRewards] = useState<number[]>([]);

  const handleRedeem = (rewardId: number, points: number) => {
    if (userPoints >= points) {
      setUserPoints((prev) => prev - points);
      setRedeemedRewards((prev) => [...prev, rewardId]);
    }
  };

  const router = useRouter();

  return (
    <div className="p-8">
      {cartItems.length === 0 ? (
        <div className="static flex flex-col justify-center mt-20 items-center w-full h-96">
          <iframe className="absolut w-96 h-96" src="https://lottie.host/embed/5d67c7ae-6343-418e-9f7f-b614759c02e4/YlSlwY1Jp6.lottie"></iframe>
          <button className='absolute mt-28 ml-28 bg-gradient-to-r from-transparent via-violet-500 to-violet-700 px-8 py-1 text-white rounded-md' onClick={()=>{router.push("/dashboard/shop")}}>Add Items</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((reward) => {
              const isRedeemed = redeemedRewards.includes(reward.id);
                return (
                <Card
                    key={reward.id}
                    className={`relative`}
                >
                    <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <CardHeader>
                    <CardTitle className="truncate w-50">{reward.name}</CardTitle>
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
                        <div className='flex flex-col justify-center items-center'>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="flex gap-2">
                          <button onClick={()=>{dispatch(decreaseQty(reward.id))}}>-</button>
                            <span className='font-bold'>{reward.qty}</span>
                          <button onClick={()=>{dispatch(increaseQty(reward.id))}}>+</button>
                        </p>
                        </div>
                    </div>
                    <div className="flex justify-around gap-2">
                      {isRedeemed ? (
                        <div className="absolute inset-0 flex items-center justify-center text-yellow-600 bg-black bg-opacity-80 text-3xl font-bold">
                          Redeemed
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          disabled={userPoints < reward.points}
                          onClick={() => handleRedeem(reward.id, reward.points)}
                        >
                          Redeem
                        </Button>
                      )}
                      <Button onClick={()=>{dispatch(remove(reward.id))}} className="w-full">Remove</Button>
                    </div>
                    </CardContent>
                </Card>
                );
            })}
        </div>
      )}
    </div>
  )
}

export default Cart
