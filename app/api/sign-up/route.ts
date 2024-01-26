'use server'
import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse } from '../serverHelper'

export async function POST(request: NextRequest, response: NextResponse) {
    const { email, password } = await request.json()

    try {
        await axiosInstance.post('/auth/sign-up', { email, password })
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (err: any) {
        console.log(err)
        return HandleReturnNextResponse(err)
    }
}

