'use server'
import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse } from "../serverHelper"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tokenId = searchParams.get("token")

    if (!tokenId) {
        return NextResponse.json({ message: "Missing query param token." }, { status: 400 })
    }

    try {
        await axiosInstance.get('/auth/reset-password?token=' + tokenId)
        return NextResponse.json({ success: true })
    } catch (err: any) {
        return HandleReturnNextResponse(err)
    }
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tokenId = searchParams.get("token")
    const { newPassword: password } = await request.json()

    if (!password) {
        return NextResponse.json({ message: "Password is required" }, { status: 400 })
    }

    if (!tokenId) {
        return NextResponse.json({ message: "Missing query param token." }, { status: 400 })
    }

    try {
        await axiosInstance.post('/auth/reset-password?token=' + tokenId, { password })
        return NextResponse.json({ success: true })
    } catch (err: any) {
        return HandleReturnNextResponse(err)
    }
}

