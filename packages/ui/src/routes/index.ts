import HomeIcon from '@mui/icons-material/Home';
import TrainIcon from '@mui/icons-material/Train';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';

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
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/trains',
    title: 'Trains',
    icon: TrainIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/history',
    title: 'History',
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
