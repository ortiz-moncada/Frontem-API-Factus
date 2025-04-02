import axios from "axios";

const apiClient = axios.create({
        baseURL: "http://localhost:3999/factus" 
    /*  baseURL: "https://backen-api-factus.onrender.com/factus"   */
});

apiClient.interceptors.request.use(
    (config) => {
        const dataStore = JSON.parse(localStorage.getItem("admin"));
        const token = dataStore?.token || "";

        // 🚨 No agregar "token" en la autenticación
        if (!config.url.includes("/oauth/token")) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;