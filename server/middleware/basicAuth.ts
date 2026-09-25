import { Buffer } from 'node:buffer';
import { timingSafeEqual } from 'node:crypto';

const safeEqual = (a: string, b: string) => {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    return left.length === right.length && timingSafeEqual(left, right);
};

export default defineEventHandler((event) => {
    const { basicAuthUser, basicAuthPassword } = useRuntimeConfig();

    // bypass if basic auth is not configured
    if (!basicAuthUser || !basicAuthPassword) return;

    const authHeader = getRequestHeader(event, 'authorization');
    const base64Credentials = authHeader?.split(' ')?.[1];
    if (base64Credentials) {
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, ...passwordParts] = credentials.split(':');
        const password = passwordParts.join(':');
        if (
            username !== undefined &&
            safeEqual(username, String(basicAuthUser)) &&
            safeEqual(password, String(basicAuthPassword))
        )
            return;
    }

    setResponseHeader(event, 'WWW-Authenticate', 'Basic realm="ACCESS CONTROL"');
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
});