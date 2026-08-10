export const APP_ROUTES = {
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  PRIVACY: '/privacy',
};

export const VIEW_TO_ROUTE = {
  dashboard: APP_ROUTES.DASHBOARD,
  profile: APP_ROUTES.PROFILE,
  settings: APP_ROUTES.SETTINGS,
  privacy: APP_ROUTES.PRIVACY,
};

export const ROUTE_TO_VIEW = {
  [APP_ROUTES.DASHBOARD]: 'dashboard',
  [APP_ROUTES.PROFILE]: 'profile',
  [APP_ROUTES.SETTINGS]: 'settings',
  [APP_ROUTES.PRIVACY]: 'privacy',
};

export function getViewFromPath(pathname) {
  return ROUTE_TO_VIEW[pathname] || 'dashboard';
}
