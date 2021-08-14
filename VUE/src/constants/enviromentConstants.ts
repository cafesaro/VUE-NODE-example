export const EnvironmentConstants = {
    HOST: 
        process.env.VUE_APP_HOST +
        ':' +
        process.env.VUE_APP_PORT +
        process.env.BASE_API_URL
};
