"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import checkoutAction from "./checkout-action";
import Breadcrumb from "@/components/breadcrumb";

function CheckoutPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <p>Your Cart is Empty.</p>
      </div>
    );
  }

  console.log(items);

  return (
    <>
      <Breadcrumb customTitle="Checkout" />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center font-bold">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {items.map((item) => (
                <li className="flex flex-col gap-2 border-b pb-2 last:border-b-0" key={item.id}>
                  <div className="flex items-center justify-between h-38">
                    <div className="relative h-full w-full md:w-1/2 rounded-lg overflow-hidden basis-[25%]">
                      <Image
                        className="transition duration-300 hover:opacity-90"
                        fill={true}
                        objectFit="contain"
                        alt={item.name}
                        src={item.imageUrl || ""}
                      />
                    </div>
                    <div className="flex flex-col justify-evenly h-full basis-[50%]">
                      <span className="font-medium text-center">{item.name}</span>
                      <div className="flex items-center justify-center gap-2">
                        <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                          -
                        </Button>
                        <span className="text-lg font-semibold ">{item.quantity}</span>
                        <Button className="cursor-pointer" size="sm" onClick={() => addItem({ ...item, quantity: 1 })}>
                          +
                        </Button>
                      </div>
                    </div>
                    <span className="font-semibold text-right basis-[15%]">${((item.price * item.quantity) / 100).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-2 text-lg text-right font-semibold">Total: ${(total / 100).toFixed(2)}</div>
          </CardContent>
        </Card>

        <form className="max-w-md mx-auto" action={checkoutAction}>
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button className="w-full mb-5 cursor-pointer" type="submit" variant="default">
            Proceed to Payment
          </Button>

          <Button className="w-full cursor-pointer" variant="outline" onClick={() => clearCart()}>
            Clear Cart
          </Button>
        </form>
      </div>
    </>
  );
}

export default CheckoutPage;
