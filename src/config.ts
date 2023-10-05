export type Config = {
    backend: {
        url: string,
        endpoints: {[key: string]: string}
    }
};

export const config: Config = {
    backend: {
        url: "https://imagestopdf.onrender.com",
        endpoints: {
            upload: "/upload"
        }
    }
};