'use server'
import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse, getAccessToken, setToken, shouldProcessRequest } from "../../serverHelper"

export async function POST(request: NextRequest, response: NextResponse) {
    const body = await request.formData()

    const status = await shouldProcessRequest()

    if (!status) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    try {
        await axiosInstance.post('/user/avatar', body, {
            headers: {
                'Cookie': `accessToken=${getAccessToken()}`,
                "Content-Type": "multipart/form-data"
            }
        })

        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.log(err)
        return HandleReturnNextResponse(err)
    }
}

