
import * as motion from "motion/react-client"
import Image from "next/image"

export default function Gestures() {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            style={box}
            className="shadow-xl p-5"
        >
            <div>
                <h1 className=" text-[#007cbf] font-bold">TipLink Wallet</h1>
                <p className="text-sm font-light text-gray-700">The world&apos;s simplest wallet</p>
            </div>
            <div className="relative">
                <Image src={"/tiplink_pic1.webp"} alt={"TipLink pic"} width={700} height={600} className="w-full h-full" />
            </div>
        </motion.div>
    )
}

const box = {
    width: 800,
    height: 500,
    backgroundColor: "#ffffff",
    borderRadius: 5,
}