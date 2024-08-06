export function timeOutJwt(error: any) {
    if(!error) {
        return
    }
    if (parseInt(error.response.status) === 401) {
        return window.location.href = '/login'
    }
    if (error.message !== "timeout of 5000ms exceeded") {
        return window.location.href = '/login'
    }
    if (parseInt(error.response.data.statusCode) === 401) {
        return window.location.href = '/login'
    }
}