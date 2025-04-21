"use client"
import { PrimaryButton } from "@/components/Button";
import Footer from "@/components/Footer";
import Gestures from "@/components/HoverCard";
import OfferingSection from "@/components/OfferingSection";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between ">
      <div>
        <h1 className="text-6xl font-bold p-24 ">
          The crypto of tomorrow,
          <span className="text-[#007cbf]"> today</span>
        </h1>
        <h1 className="flex justify-center pt-4 text-2xl text-gray-500">Create a frictionless wallet with just a Google Account.</h1>
        <div className="flex justify-center pt-10">
          <PrimaryButton children={"Sign Up with Google"} onClick={() => {
            signIn()
          }} />
        </div>
      </div>
      <div className="py-20">
        <Gestures />
      </div>
      <div className="w-full m-0">
        <OfferingSection />
      </div>
      <div className="w-full m-0">
        <Footer />
      </div>
    </div>
  );
}
