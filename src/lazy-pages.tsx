import { lazy } from 'react';

export const Home = lazy(
  () => import(/* webpackChunkName: "home" */ './pages/Home')
);
export const AboutPage = lazy(
  () => import(/* webpackChunkName: "about-page" */ './pages/AboutPage')
);
