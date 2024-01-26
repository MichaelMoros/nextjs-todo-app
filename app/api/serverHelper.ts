"use server"

import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function getDecodedAccessToken() {
    const accessToken = cookies().get('accessToken')?.value ?? ""

    let decodedAccessToken;

    if (accessToken) decodedAccessToken = jwtDecode(accessToken)

    return decodedAccessToken
}

function clearCookies() {
    cookies().delete("accessToken")
    cookies().delete("refreshToken")
}

function getAccessToken() {
    return cookies().get("accessToken")?.value ?? ""
}

function getRefreshToken() {
    return cookies().get("refreshToken")?.value ?? ""
}

function setToken(name: string, value: string) {
    cookies().set({
        name: name,
        value: value,
        httpOnly: true,
        path: '/',
    })
}

function HandleReturnNextResponse(err: any) {
    const error = err as AxiosError

    if (error.response) {
        const { message, statusCode } = error?.response.data as any
        return NextResponse.json({ message }, { status: statusCode })
    }

    if (!error.response) {
        const message = error.message
        return NextResponse.json({ message }, { status: 500 })
    }
}

function isAccessTokenExpired() {
    const decodedAccessToken = getDecodedAccessToken()
    const exp = decodedAccessToken?.exp ?? 0

    if (exp === 0) return true

    return new Date().getTime() > (new Date(exp * 1000).getTime())
}

async function getNewTokens(s: string) {
    if (!s) return { success: false, at: null, rt: null }

    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_ROUTE + '/auth/refresh-tokens', {
            method: "GET",
            headers: {
                'Cookie': `refreshToken=${s}`
            },
            credentials: 'include'
        })

        if (res.status === 401) throw 1

        const data = await res.json()
        return { success: true, at: data.accessToken, rt: data.refreshToken }
    } catch (e: any) {
        return { success: false, at: null, rt: null }
    }
}


async function shouldProcessRequest() {
    const decodedAccessToken = getDecodedAccessToken()

    if (decodedAccessToken) {
        if (isAccessTokenExpired()) {
            const refreshToken = getRefreshToken()
            const didRefresh = await getNewTokens(refreshToken)

            if (!didRefresh.success) {
                clearCookies()
                return false
            }

            if (didRefresh.success) {
                setToken("accessToken", didRefresh.at)
                setToken("refreshToken", didRefresh.rt)
            }
        }

        return true
    }

    if (!decodedAccessToken) {
        clearCookies()
        return false
    }

}

export {
    clearCookies,
    getDecodedAccessToken,
    getAccessToken,
    getRefreshToken,
    setToken,
    HandleReturnNextResponse,
    isAccessTokenExpired,
    getNewTokens,
    shouldProcessRequest
}