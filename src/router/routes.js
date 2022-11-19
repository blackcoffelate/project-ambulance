
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'Map', component: () => import('src/pages/Map.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('pages/Acces/Login.vue'),
    children: [
      { path: 'Login', component: () => import('pages/Acces/Login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
