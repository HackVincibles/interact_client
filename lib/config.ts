// ============================================================================
// CONFIG: Centralized Configuration for Production Deployment
// ============================================================================

/**
 * This file centralizes all environment-dependent configurations.
 * Update these values based on your deployment environment.
 */

// ─── Base URLs ────────────────────────────────────────────────────────────
export const CONFIG = {
  // Client base URL
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  
  // Server/API base URL
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Feature flags
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_MONITORING: process.env.NEXT_PUBLIC_ENABLE_MONITORING === 'true',
};

// ─── API Endpoints ────────────────────────────────────────────────────────
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify',
  },
  
  // User
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/profile',
    STATS: '/api/users/stats',
    LEADERBOARD: '/api/users/leaderboard',
  },
  
  // Chat
  CHAT: {
    SEND_MESSAGE: '/api/chat/send',
    GET_HISTORY: '/api/chat/history',
    CREATE_SESSION: '/api/chat/session',
  },
  
  // Interviews
  INTERVIEWS: {
    CREATE: '/api/interviews/create',
    GET: '/api/interviews/:id',
    GET_USER: '/api/interviews/user/:userId',
    UPDATE: '/api/interviews/:id',
    GET_FEEDBACK: '/api/interviews/:id/feedback',
  },
  
  // Code Execution
  CODE: {
    EXECUTE: '/api/execute',
    REVIEW: '/api/code/review',
  },
  
  // Group Discussion
  GD: {
    CREATE_ROOM: '/api/gd/create',
    JOIN_ROOM: '/api/gd/join',
    GET_ROOM: '/api/gd/room/:roomId',
    END_SESSION: '/api/gd/end/:sessionId',
  },
  
  // Playlists
  PLAYLISTS: {
    GET_ALL: '/api/playlists',
    GET_ONE: '/api/playlists/:id',
    CREATE: '/api/playlists',
  },
  
  // Analytics
  ANALYTICS: {
    LOG_EVENT: '/api/analytics/event',
    GET_STATS: '/api/analytics/stats',
  },
  
  // Uploads
  UPLOAD: {
    RESUME: '/api/upload/resume',
    AVATAR: '/api/upload/avatar',
  },
  
  // Stats
  STATS: {
    DASHBOARD: '/api/stats/dashboard',
  },
};

// ─── Vapi Configuration ────────────────────────────────────────────────────
export const VAPI_CONFIG = {
  WEB_TOKEN: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || '',
  ASSISTANTS: {
    DEFAULT: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || '',
    INTERVIEW: process.env.NEXT_PUBLIC_VAPI_INTERVIEW_ASSISTANT_ID || '',
    TECH_HELPER: process.env.NEXT_PUBLIC_VAPI_TECH_HELPER_ASSISTANT_ID || '',
    GROUP_DISCUSSION: process.env.NEXT_PUBLIC_VAPI_GD_ASSISTANT_ID || '',
  },
};

// ─── External Services ────────────────────────────────────────────────────
export const EXTERNAL_SERVICES = {
  ZOOM: {
    SDK_KEY: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY || '',
  },
  VIDEOSDK: {
    TOKEN: process.env.NEXT_PUBLIC_VIDEOSDK_TOKEN || '',
  },
  GOOGLE: {
    CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  },
};

// ─── Utility Functions ────────────────────────────────────────────────────
/**
 * Get full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${CONFIG.SERVER_URL}${endpoint}`;
};

/**
 * Check if in production
 */
export const isProduction = (): boolean => {
  return CONFIG.NODE_ENV === 'production';
};

/**
 * Check if all required configs are set
 */
export const validateConfig = (): string[] => {
  const errors: string[] = [];
  
  if (!CONFIG.SERVER_URL) {
    errors.push('NEXT_PUBLIC_SERVER_URL is not set');
  }
  
  if (!CONFIG.BASE_URL) {
    errors.push('NEXT_PUBLIC_BASE_URL is not set');
  }
  
  if (!VAPI_CONFIG.WEB_TOKEN) {
    errors.push('NEXT_PUBLIC_VAPI_WEB_TOKEN is not set');
  }
  
  if (isProduction()) {
    if (!EXTERNAL_SERVICES.GOOGLE.CLIENT_ID) {
      errors.push('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set in production');
    }
  }
  
  return errors;
};

// ─── Runtime Validation ────────────────────────────────────────────────────
if (typeof window !== 'undefined') {
  // Client-side only validation
  const errors = validateConfig();
  if (errors.length > 0 && isProduction()) {
    console.error('❌ Configuration errors:', errors);
  }
}

export default CONFIG;
