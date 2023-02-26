const isLocalHost = (url: string) => {
    return url.includes("localhost") || url.includes("127.0.0.1")
}


export const getApiUrl = (href: string) => {
    if (isLocalHost(href)) {
        return "https://testing.api.pagopeople.com"
    }
    const subdomain = href.split(".")
    return `${subdomain}.api.pagopeople.com`
}

export const getAuthRedirectUrl = (href: string) => {
    if (isLocalHost(href)) {
        return "https://testing.pagopeople.com"
    }
    const subdomain = href.split(".")
    return `${subdomain}.pagopeople.com`

}