'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PublicKey } from "@solana/web3.js";
import { createQR, encodeURL } from "@solana/pay";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function DialogDemo() {
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const fetchUserWallet = async () => {
        const res = await fetch("/api/user"); 
        const data = await res.json();
        setUserWallet(data.publicKey); 
    };

    fetchUserWallet();
  }, []);

  useEffect(() => {
      if (!userWallet || !qrRef.current) return;

      const recipient = new PublicKey(userWallet);
      const url = encodeURL({ recipient });
      const qr = createQR(url, 256, 'white');
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current as HTMLElement);
  }, [userWallet]);

  const handleCopy = (text: string) => {
    navigator.clipboard
      .writeText(text)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-full h-full">Wallet Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex text-2xl font-bold justify-center">Your Wallet Address</DialogTitle>
          <DialogDescription className="flex text-sm font-medium justify-center">
            You can deposit crypto or NFTs into your account via this Solana wallet address:
          </DialogDescription>
        </DialogHeader>
        {userWallet ? (
          <div className="grid justify-center items-center gap-4 py-4">
            <div className="flex justify-center" ref={qrRef} />
            <div 
              className="flex w-full text-sm font-mono break-all " 
            >
              <span className='font-medium pr-2'>{userWallet.slice(0, 30) + "..."}</span>
              <Image width="20" height="20" src="/copy_icon.png" alt="copy" onClick={() => handleCopy(userWallet)} className='hover:cursor-pointer' title='Copy' />
            </div>
          </div>
        ) : (
          <div className="text-red-500">No wallet found for user.</div>
        )}
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
