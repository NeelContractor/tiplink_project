import Appbar from "@/components/Appbar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function Page() {
    return <div className="bg-[#f0f8ff]">
        <Appbar />
        <div className="grid justify-center gap-5">
            <h1 className="flex justify-center items-center text-4xl font-bold">F.A.Q.</h1>
            <h1 className="flex justify-center text-3xl text-gray-500">Got question? We&apos;ve got answers!</h1>
        </div>
        <Questions />
    </div>
}


function Questions() {
    return <div className="flex justify-center items-center bg-[#f0f8ff] py-10">
    <div className="w-[60%]">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="rounded-lg bg-white p-2 shadow my-5 px-5 hover:bg-[#f6f8fa]">
                <AccordionTrigger className="font-bold text-lg ">What is TipLink?</AccordionTrigger>
                <AccordionContent className="font-semibold text-base text-gray-500">
                    TipLink is a lightweight wallet designed to make transferring digital assets as easy as sending a link. Someone with crypto can create a TipLink and send that link to anyone over any platform (text, discord, email, etc). The amazing thing is, the link is the wallet!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="rounded-lg bg-white p-2 shadow my-5 px-5 hover:bg-[#f6f8fa]">
                <AccordionTrigger className="font-bold text-lg">I just received a Tiplink. What can i do with it?</AccordionTrigger>
                <AccordionContent className="font-semibold text-base text-gray-500">
                    First, make sure you login with your Gmail account to secure your crypto. You now have a crypto wallet set up! You can now hold onto your crypto and hopefully it appreciates in value. You can send portions of it by creating other TipLinks which you can send the link or show the QR code to someone else. You can withdraw to a different crypto wallet if you&apos;d like.Over time, we will have more functionality for cool things you can do with your crypto. We will also be adding ways to add more crypto or withdraw your crypto to dollars. The good thing about TipLink is if you check back in, more and more functionality will be released without you needing to do anything. Stay tuned!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="rounded-lg bg-white p-2 shadow my-5 px-5 hover:bg-[#f6f8fa]">
                <AccordionTrigger className="font-bold text-lg">Does TipLink take Fee?</AccordionTrigger>
                <AccordionContent className="font-semibold text-base text-gray-500">
                    Currently, TipLink does not take any fees. Transactions do require various amounts of Solana so the user who receives the TipLink can freely move it without worrying about the complexity of paying transaction fees or opening token accounts.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="rounded-lg bg-white p-2 shadow my-5 px-5 hover:bg-[#f6f8fa]">
                <AccordionTrigger className="font-bold text-lg">Does TipLink store your crypto?</AccordionTrigger>
                <AccordionContent className="font-semibold text-base text-gray-500">
                    No, TipLink is a non-custodial wallet.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="rounded-lg bg-white p-2 shadow my-5 px-5 hover:bg-[#f6f8fa]">
                <AccordionTrigger className="font-bold text-lg">i don&apos;t have crypto. How do I create a Tiplink? </AccordionTrigger>
                <AccordionContent className="font-semibold text-base text-gray-500">
                    No, TipLink is a non-custodial wallet.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
</div>
}