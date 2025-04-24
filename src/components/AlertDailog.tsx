"use client"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import axios from "axios"
import Image from "next/image"
import React, { useEffect, useState } from "react"
  
export function AlertDialogDemo() {
    const [privateKey, setPrivateKey] = useState("")

    useEffect(() => {
        const fetchKey = async () => {
            try {
            const res = await axios.get("/api/keys")
            console.log(res.data?.address)
            setPrivateKey(res.data?.address || "No key found.")
            } catch (err) {
            console.error("Error fetching key:", err)
            setPrivateKey("Error fetching key")
        }
    }

    fetchKey()
    }, [])

    const handleCopy = (text: string) => {
        navigator.clipboard
          .writeText(text)
      };

return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
        <Button variant="outline">
            <Image src={"/setting_icon.png"} width={25} height={25} alt={"Setting Image"}  />
        </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>Your Private Key</AlertDialogTitle>
        <AlertDialogDescription className='font-medium'>
            Please keep it safe.
        </AlertDialogDescription>
        <AlertDialogDescription className='flex justify-center gap-4'>
            <span className='font-bold '>{privateKey.slice(0, 45) + "..."}</span>
            <Image width="20" height="20" src="/copy_icon.png" alt="copy" onClick={() => handleCopy(privateKey)} className='hover:cursor-pointer' title='Copy' />
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
)
}
