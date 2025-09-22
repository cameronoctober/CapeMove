# Token storage strategies

Preferred approach: httpOnly refresh cookie
1. Client sends credentials to POST /api/auth/login
2. Server responds with:
   - Set-Cookie: refresh=<token>; HttpOnly; Path=/api/auth/refresh; Secure; SameSite=Strict
   - body: { accessToken, user }
3. Client stores accessToken in memory (Redux) and uses it on Authorization header.
4. When accessToken expires, axios interceptor calls POST /api/auth/refresh with `withCredentials: true`.
5. Server validates refresh cookie and returns a new accessToken.

Fallback approach: refresh token in response body (less secure)
- If server returns refreshToken in body, store it securely (avoid localStorage if possible). If you must persist, use 'cape_refresh' localStorage key and ensure XSS protections.

Axios interceptor pseudocode:
- On 401:
  - If not refreshing, call /api/auth/refresh (withCredentials)
  - Queue pending requests until refresh resolves
  - Retry queued requests with new access token
  - On refresh failure, clear credentials and redirect to login
