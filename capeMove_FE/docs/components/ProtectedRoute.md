# ProtectedRoute

Props:
- roles?: Array<'user' | 'moderator' | 'admin'> (optional) - allowed roles
- redirectTo?: string (optional) - redirect target for unauthenticated users (defaults to /login)

Behavior:
- If the user is not authenticated (no auth.user or auth.accessToken), redirects to `redirectTo` preserving the `from` location in state.
- If the user is authenticated but their role isn't included in `roles`, redirects to `/`.
- When access checks pass, renders nested routes via `<Outlet />`.

Example:
