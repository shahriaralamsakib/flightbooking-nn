const flightRoutes = [
  {
    path: '/',
    name: 'flights.home',
    meta: {
      title: 'Home - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/flights/Home/index.vue')
  },
  {
    path: '/flights/list',
    name: 'flights.list',
    meta: {
      title: 'List - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/flights/List/index.vue')
  },
  {
    path: '/flights/detail',
    name: 'flights.details',
    meta: {
      title: 'Details - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/flights/Details/index.vue')
  },
  {
    path: '/flights/booking',
    name: 'flights.booking',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/flights/Booking/index.vue')
  }
]

const agentRoutes = [
  {
    path: '/agent/dashboard',
    name: 'agent.dashboard',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Dashboard/index.vue')
  },
  {
    path: '/agent/listings',
    name: 'agent.listings',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Listings/index.vue')
  },
  {
    path: '/agent/bookings',
    name: 'agent.bookings',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Bookings/index.vue')
  },
  {
    path: '/agent/activities',
    name: 'agent.activities',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Activities/index.vue')
  },
  {
    path: '/agent/earnings',
    name: 'agent.earnings',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Earnings/index.vue')
  },
  {
    path: '/agent/reviews',
    name: 'agent.reviews',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Reviews/index.vue')
  },
  {
    path: '/agent/settings',
    name: 'agent.settings',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme',
      authRequired: true
    },
    component: () => import('@/views/agent/Settings/index.vue')
  }
]

const authRoutes = [
  {
    path: '/sign-in',
    name: 'auth.sign-in',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/auth/SignIn/index.vue')
  },
  {
    path: '/sign-up',
    name: 'auth.sign-up',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/auth/SignUp/index.vue')
  },
  {
    path: '/forgot-password',
    name: 'auth.forgot-password',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/auth/ForgotPassword/index.vue')
  },
  {
    path: '/two-factor',
    name: 'auth.two-factor',
    meta: {
      title: 'Booking - Multipurpose Online Booking Theme'
    },
    component: () => import('@/views/auth/TwoFactor/index.vue')
  }
]

export const allRoutes = [
  ...flightRoutes,
  ...agentRoutes,
  ...authRoutes,
]
