import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse, clearCookies, getAccessToken, getRefreshToken, shouldProcessRequest } from '../serverHelper'

export async function GET(request: NextRequest, response: NextResponse) {
	const status = await shouldProcessRequest()

	if (!status) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	try {
		await axiosInstance.get('auth/logout', {
			headers: {
				'Cookie': `accessToken=${getAccessToken()}; refreshToken=${getRefreshToken()}`
			}
		})
		clearCookies()
		return NextResponse.json({ success: true })
	} catch (err: any) {
		return HandleReturnNextResponse(err)
	}
}
