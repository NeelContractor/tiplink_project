'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PublicKey } from "@solana/web3.js";
import { createQR, encodeURL } from "@solana/pay";
import { useEffect, useRef, useState } from "react";

export default function DialogDemo() {
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch {
      // optionally handle copy failure
    }
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
            <button 
              className="text-sm font-mono break-all hover:cursor-pointer hover:underline" 
              title="Click to Copy"
                onClick={() => {
                  handleCopy(userWallet)
                }}
                  >{userWallet}</button>
          </div>
        ) : (
          <div className="text-red-500">No wallet found for user.</div>
        )}
        <DialogFooter>
          <Button type="button">Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
