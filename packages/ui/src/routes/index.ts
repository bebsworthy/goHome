import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import TrainIcon from '@mui/icons-material/Train';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';

const routes: Routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Departure')),
    path: '/departures',
    title: 'Departures',
    icon: TrainIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/LocalEvents')),
    path: '/local-events',
    title: 'Local Events',
    icon: HistoryIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/about',
    title: 'About',
    icon: InfoIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
];

export default routes;
