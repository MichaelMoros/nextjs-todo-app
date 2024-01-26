import { NextRequest, NextResponse } from 'next/server'
import axiosInstance from '@/lib/axios'
import { HandleReturnNextResponse, getAccessToken, shouldProcessRequest } from '../../serverHelper'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	const body = await request.formData()
	const status = await shouldProcessRequest()

	if (!status) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

	try {
		const response = await axiosInstance.post(`/habits/${params.id}`, body, {
			headers: {
				'Cookie': `accessToken=${getAccessToken()}`,
				'Content-Type': "multipart/form-data"
			}
		})
		return NextResponse.json(response.data)
	} catch (err: unknown) {
		return HandleReturnNextResponse(err)
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const status = await shouldProcessRequest()

	if (!status) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

	try {
		const response = await axiosInstance.delete(`/habits/${params.id}`, {
			headers: {
				'Cookie': `accessToken=${getAccessToken()}`,
			}
		})
		return NextResponse.json(response.data)
	} catch (err: unknown) {
		return HandleReturnNextResponse(err)
	}
}