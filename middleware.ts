import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { redirect } from 'next/navigation'
import axiosInstance from './lib/axios'
import { clearCookies } from './app/api/serverHelper'

interface DecodedAccessToken {
	sub: number,
	email: string
	iat: number
	exp: number
	aud: string
	iss: string
}

const protectedRoutes = [
	"/dashboard",
	"/settings",
	"/settings/password",
	"/settings/avatar",
	"/settings/theme",
	"/resend-confirmation"
]

const unProtectedRoutes = [
	"/sign-in",
	"/sign-up",
	"/forgot-password",
	"/reset-password",
]

const allRoutes = protectedRoutes.concat(unProtectedRoutes)

const protectedRoutesMap = protectedRoutes.map((item) => process.env.NEXT_PUBLIC_BASE_URL + item)
const unProtectedRoutesMap = unProtectedRoutes.map((item) => process.env.NEXT_PUBLIC_BASE_URL + item)

export async function middleware(request: NextRequest, response: NextResponse) {
	const accessToken = cookies().get('accessToken')?.value ?? ""
	const refreshToken = cookies().get('refreshToken')?.value ?? ""

	if (protectedRoutesMap.includes(request.url)) {
		if (accessToken && refreshToken) {
			return NextResponse.next()
		} else {
			return NextResponse.redirect(new URL('/sign-in', request.url))
		}
	}

	if (unProtectedRoutesMap.includes(request.url)) {
		if (accessToken && refreshToken) {
			return NextResponse.redirect(new URL('/dashboard', request.url))
		} else {
			return NextResponse.next()
		}
	}
}

const config = {
	matcher: allRoutes
}

export default config