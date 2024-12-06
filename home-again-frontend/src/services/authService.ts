// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import config from "../config/awsCognito.json";
import { jwtDecode } from "jwt-decode";

export const cognitoClient = new CognitoIdentityProviderClient({
    region: config.region,
});

interface TokenData {
    exp: number;
    sub: string;
}

export class TokenManager {
    private static readonly TOKEN_REFRESH_THRESHOLD = 5 * 60; // 5 minutes in seconds

    static setTokens(AuthenticationResult: any) {
        if (!AuthenticationResult) return;

        sessionStorage.setItem("idToken", AuthenticationResult.IdToken || '');
        sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || '');
        sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || '');
    }

    static clearTokens() {
        sessionStorage.removeItem("idToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
    }

    static getIdToken(): string | null {
        return sessionStorage.getItem("idToken");
    }

    static isTokenExpired(token: string | null): boolean {
        if (!token) return true;

        try {
            const decoded = jwtDecode<TokenData>(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp <= currentTime;
        } catch {
            return true;
        }
    }

    static async refreshTokenIfNeeded(cognitoClient: any, config: any): Promise<boolean> {
        const idToken = this.getIdToken();
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!refreshToken) {
            this.clearTokens();
            return false;
        }

        try {
            const decoded = jwtDecode<TokenData>(idToken!);
            const currentTime = Math.floor(Date.now() / 1000);

            // Refresh if token will expire in the next 5 minutes
            if (decoded.exp - currentTime <= this.TOKEN_REFRESH_THRESHOLD) {
                const params = {
                    AuthFlow: "REFRESH_TOKEN_AUTH",
                    ClientId: config.clientId,
                    AuthParameters: {
                        REFRESH_TOKEN: refreshToken
                    }
                };

                const command = new InitiateAuthCommand(params as any);
                const { AuthenticationResult } = await cognitoClient.send(command);

                if (AuthenticationResult) {
                    // Keep the existing refresh token as it's still valid
                    const existingRefreshToken = sessionStorage.getItem("refreshToken");
                    this.setTokens({ ...AuthenticationResult, RefreshToken: existingRefreshToken });
                    return true;
                }
            }
            return true;
        } catch (error) {
            console.error("Error refreshing token:", error);
            this.clearTokens();
            return false;
        }
    }
}

// Updated signIn function
export const signIn = async (username: string, password: string) => {
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: config.clientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    };
    try {
        const command = new InitiateAuthCommand(params as any);
        const { AuthenticationResult } = await cognitoClient.send(command);
        if (AuthenticationResult) {
            TokenManager.setTokens(AuthenticationResult);
            return AuthenticationResult;
        }
    } catch (error) {
        console.error("Error signing in: ", error);
        throw error;
    }
};

export const signUp = async (email: string, password: string) => {
    const params = {
        ClientId: config.clientId,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: "email",
                Value: email,
            },
        ],
    };
    try {
        const command = new SignUpCommand(params);
        const response = await cognitoClient.send(command);
        console.log("Sign up success: ", response);
        return response;
    } catch (error) {
        console.error("Error signing up: ", error);
        throw error;
    }
};

export const confirmSignUp = async (username: string, code: string) => {
    const params = {
        ClientId: config.clientId,
        Username: username,
        ConfirmationCode: code,
    };
    try {
        const command = new ConfirmSignUpCommand(params);
        await cognitoClient.send(command);
        console.log("User confirmed successfully");
        return true;
    } catch (error) {
        console.error("Error confirming sign up: ", error);
        throw error;
    }
};
