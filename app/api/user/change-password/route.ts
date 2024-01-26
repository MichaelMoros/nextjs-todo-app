'use server'
import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse, getAccessToken, setToken, shouldProcessRequest } from "../../serverHelper"

export async function PATCH(request: NextRequest, response: NextResponse) {
    const { oldPassword, newPassword } = await request.json()

    if (!oldPassword || !oldPassword) return NextResponse.json({ message: "Bad Request" }, { status: 400 })

    const status = await shouldProcessRequest()

    if (!status) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    try {
        await axiosInstance.patch('/user/change-password', { oldPassword, newPassword }, {
            headers: {
                'Cookie': `accessToken=${getAccessToken()}`
            }
        })

        return NextResponse.json({ success: true })
    } catch (err: any) {
        return HandleReturnNextResponse(err)
    }
}

