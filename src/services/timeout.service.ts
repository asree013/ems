export function timeOutJwt(error: any) {
    if(!error) {
        return
    }
    if (parseInt(error.response.status) === 401) {
        localStorage.clear()
        return window.location.href = '/login'
    }
    if (error.message !== "timeout of 5000ms exceeded") {
        localStorage.clear()
        return window.location.href = '/login'
    }
    if (parseInt(error.response.data.statusCode) === 401) {
        localStorage.clear()
        return window.location.href = '/login'
    }
}