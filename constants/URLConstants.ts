export enum URLConstants {
    BaseURL = "https://www.reddit.com/login",
    HomeURL = "https://www.reddit.com",
    NaviagationURL = "https://www.reddit.com/",
    oauthURL = "https://oauth.reddit.com",
    getCommunityEndpoint = oauthURL + "/r/{0}/about",
    getTopPostEndpoint = oauthURL + "/{0}",
}