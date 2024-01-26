'use server'
import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse } from "../serverHelper"

export async function POST(request: NextRequest, response: NextResponse) {
    const { email } = await request.json()

    try {
        const response = await axiosInstance.post('/auth/create-password-reset', { email })
        return NextResponse.json(response.data)
    } catch (err: any) {
        return HandleReturnNextResponse(err)
    }
}

