import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { list, Product } from "../db/product";

export default function MyCard() {

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() =>console.log("item pressed: " + (index + 1))}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[140px]"
              src={item.imageUrl}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">${item.price}</p>
          </CardFooter>
          <div className="flex items-center justify-between pt-1 px-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <p className="text-right px-1 text-gray-400">{item.shop.name}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
