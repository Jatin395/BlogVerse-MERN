const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
    AUTH: {
        SIGNUP: `${BASE_URL}/api/signup`,
        LOGIN: `${BASE_URL}/api/signin`,
        GET_INFO: `${BASE_URL}/api/getinfo`,
        LOGOUT: `${BASE_URL}/api/logout`
    },
    BLOG: {
        CREATE: `${BASE_URL}/blog/create`,
        DELETE: `${BASE_URL}/blog/delete/`,
        VIEW: `${BASE_URL}/blog/view/`,
        UPDATE: `${BASE_URL}/blog/update/`,
        USER_BLOGS: `${BASE_URL}/blog/user-get`,
        BLOGS: `${BASE_URL}/blog/gets`,
        LATEST: `${BASE_URL}/blog/latest-get`,
        POPULAR: `${BASE_URL}/blog/popular-get`,
        TRENDING: `${BASE_URL}/blog/trending-get`,
        GENRATE: `${BASE_URL}/blog/genrate`
    },
    COMMENT: {
        CREATE: `${BASE_URL}/message/create`,
        BLOG_COMMENT: `${BASE_URL}/message/view/`,
        MY_COMMENT: `${BASE_URL}/message/user-get`
    }
}

export default { API_PATHS };
