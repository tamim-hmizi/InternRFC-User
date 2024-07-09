"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "./loading";

export default function Home() {
  const [state, setState] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(true);
     
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-full w-full">
      {state ? (
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure>
            <Image
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
              width={500}
              height={500}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
