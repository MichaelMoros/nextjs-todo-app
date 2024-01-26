import { AxiosError } from "axios"

type TypeErrorMessage = {
    code: string | number
    message: string
}

function errorHelper(error: any): TypeErrorMessage {
    if (error instanceof AxiosError) {
        if (error.response?.status) {
            return { code: error.response?.status, message: error?.response?.data.message }
        }
    }

    return { code: error.code, message: error.message }
}


export default errorHelper