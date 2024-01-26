'use server'
import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse, setToken } from '../serverHelper'

export async function POST(request: NextRequest, response: NextResponse) {
	const { email, password } = await request.json()

	try {
		const result = await axiosInstance.post('/auth/sign-in', { email, password })
		setToken("accessToken", result.data.accessToken)
		setToken("refreshToken", result.data.refreshToken)

		return NextResponse.json(result.data.data, { status: 200 })
	} catch (err: any) {
		return HandleReturnNextResponse(err)
	}
}

