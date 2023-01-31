/**
 * payload for access to verify that the user is who they claim to be
 */
export interface JWTPayload {
    email: string;
}