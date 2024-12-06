import { TokenManager, cognitoClient } from "@/services/authService.ts";
import config from "../config/awsCognito.json";

export const apiClient = async (url: string, options: RequestInit = { method: 'GET' }) => {
    try {
        // Check and refresh token if needed before making the API call
        const isValid = await TokenManager.refreshTokenIfNeeded(cognitoClient, config);
        if (!isValid) {
            throw new Error("Authentication required");
        }

        const idToken = TokenManager.getIdToken();

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
                Authorization: `Bearer ${idToken}`,
            },
        });

        if (response.status === 401) {
            TokenManager.clearTokens();
            throw new Error("Authentication required");
        }

        return response;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};