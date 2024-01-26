import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse, getAccessToken, shouldProcessRequest } from '../serverHelper'

export async function GET(request: NextRequest) {
    const status = await shouldProcessRequest()

    if (!status) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const response = await axiosInstance.get(`/user`, {
            headers: {
                'Cookie': `accessToken=${getAccessToken()}`,
            }
        })
        return NextResponse.json(response.data)
    } catch (err: unknown) {
        return HandleReturnNextResponse(err)
    }
}