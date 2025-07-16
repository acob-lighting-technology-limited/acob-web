import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { client } from "@/sanity/lib/client"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Upload the file to Sanity
    const uploadedAsset = await client.assets.upload("image", file)

    return NextResponse.json({ assetId: uploadedAsset._id })
  } catch (error) {
    console.error("Error uploading image to Sanity:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
