/**
 * REST paths aligned with `Exsample/src/component/api/*.js`
 * (base URL: `Exsample/src/constant.js` → API_URL).
 */
export const BackendRoutes = {
  auth: {
    register: 'auth/register',
    login: 'auth/login',
    logout: 'auth/logout',
  },
  user: {
    list: 'user',
    byId: (id: string) => `user/${id}`,
    me: 'user/me',
    chats: 'user/chats',
  },
  message: {
    list: 'message',
    byId: (id: string) => `message/${id}`,
    chatHistory: (otherUserId: string) => `message/chat/${otherUserId}`,
  },
} as const;

/** Socket (same host as in Exsample) — for future `socket.io` wiring. */
export const BackendSocket = {
  url: 'https://brahmadzen.space',
  path: '/socket.io',
} as const;
