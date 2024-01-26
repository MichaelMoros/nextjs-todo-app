import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { getAccessToken, HandleReturnNextResponse, shouldProcessRequest } from '../serverHelper'

export async function GET(request: NextRequest, response: NextResponse) {
	const status = await shouldProcessRequest()

	if (!status) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

	try {
		const response = await axiosInstance.get('/habits', {
			headers: {
				'Cookie': `accessToken=${getAccessToken()}`
			}
		})

		return NextResponse.json(response.data)
	} catch (err: unknown) {
		return HandleReturnNextResponse(err)
	}
}

export async function POST(request: NextRequest, response: NextResponse) {
	const { routine, start, end, updateInterval } = await request.json()

	const status = shouldProcessRequest()

	if (!status) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

	try {
		const response = await axiosInstance.post('/habits', { routine, start, end, updateInterval }, {
			headers: {
				'Cookie': `accessToken=${getAccessToken()}`
			}
		})
		return NextResponse.json(response.data)
	} catch (err: unknown) {
		return HandleReturnNextResponse(err)
	}
}