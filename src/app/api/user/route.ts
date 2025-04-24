// app/api/user/route.ts
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth"; // Adjust based on your actual file structure
import db from "@/db"; // Adjust based on your actual file structure

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.uid) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const userWallet = await db.solWallet.findFirst({
      where: {
        userId: session.user.uid,
      },
      select: {
        publicKey: true,
      },
    });

    if (!userWallet) {
      return new Response(JSON.stringify({ error: "No Solana wallet found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ publicKey: userWallet.publicKey }), { status: 200 });
  } catch (error) {
    console.error("Error fetching user wallet:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
