export const EnvironmentConstants = {
    HOST: 
        process.env.VUE_APP_HOST +
        ':' +
        process.env.VUE_APP_PORT +
        process.env.VUE_APP_BASE_API_URL,
    SOCKET_HOST:
        process.env.VUE_APP_HOST +
        ':' +
        process.env.VUE_APP_PORT     
};
