import {ROUTES} from "../config/routes"

type RoutesType = typeof ROUTES;

export const paths: RoutesType = Object.keys(ROUTES).reduce((acc, key) => {
    acc[key as keyof RoutesType] = key === 'HOME' ? ROUTES[key as keyof RoutesType] : ROUTES[key as keyof RoutesType] + '/*';
    return acc;
  }, {} as RoutesType);