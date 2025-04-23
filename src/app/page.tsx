"use client"
import Appbar from "@/components/Appbar";
import { PrimaryButton } from "@/components/Button";
import Footer from "@/components/Footer";
import Gestures from "@/components/HoverCard";
import OfferingSection from "@/components/OfferingSection";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();

    if (session.data?.user) {
      router.push("/dashboard");
    }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full h-full">
        <Appbar />
      </div>
      <div>
        <h1 className="text-6xl font-bold pt-24 ">
          The crypto of tomorrow,
          <span className="text-[#007cbf]"> today</span>
        </h1>
        <h1 className="flex justify-center pt-4 text-2xl text-gray-500">Create a frictionless wallet with just a Google Account.</h1>
        <div className="flex justify-center pt-10">
          <PrimaryButton children={"Sign Up with Google"} onClick={() => {
            signIn("google", { callbackUrl: "/dashboard" })
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
