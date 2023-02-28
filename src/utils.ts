const isLocalHost = (url: string) => {
    return url.includes("localhost") || url.includes("127.0.0.1")
}


export const getApiUrl = (href: string) => {
    if (isLocalHost(href)) {
        return "https://monte.api.pagopeople.com"
    }
    const subdomain = href.split(".")[0]
    return `${subdomain}.api.pagopeople.com`
}

export const getAuthRedirectUrl = (href: string) => {
    if (isLocalHost(href)) {
        return "https://monte.pagopeople.com"
    }
    const subdomain = href.split(".")
    return `${subdomain}.pagopeople.com`

}