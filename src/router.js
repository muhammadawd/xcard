/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store/store.js"

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {x: 0, y: 0}
  },
  routes: [

    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/dashboard/home'
        },
        {
          path: '/dashboard/home',
          name: 'dashboard-home',
          component: () => import('./views/Home.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home', active: true}
            ],
            pageTitle: 'الرئيسية',
            authRequired: true,
          }
        },
        // =============================================================================
        // Categories Routes
        // =============================================================================
        {
          path: '/categoriesModule/all-categories',
          name: 'all-categories',
          component: () => import('./views/modules/categories/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'التصنيفات'},
              {title: 'جميع التصنيفات', active: true},
            ],
            pageTitle: 'جميع التصنيفات',
            authRequired: true,
          }
        },
        {
          path: '/categoriesModule/add-category',
          name: 'add-category',
          component: () => import('./views/modules/categories/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'التصنيفات'},
              {title: 'جميع التصنيفات'},
              {title: 'اضافة تصنيف', active: true},
            ],
            pageTitle: 'اضافة تصنيف',
            authRequired: true,
          }
        },
        {
          path: '/categoriesModule/edit-category/:id',
          name: 'edit-category',
          component: () => import('./views/modules/categories/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'التصنيفات'},
              {title: 'جميع التصنيفات'},
              {title: 'تعديل تصنيف', active: true},
            ],
            pageTitle: 'تعديل تصنيف',
            authRequired: true,
          }
        },
        // =============================================================================
        // Clients Routes
        // =============================================================================
        {
          path: '/clientsModule/all-clients',
          name: 'all-clients',
          component: () => import('./views/modules/clients/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'العملاء'},
              {title: 'جميع العملاء', active: true},
            ],
            pageTitle: 'العملاء',
            authRequired: true,
          }
        },
        {
          path: '/clientsModule/add-client',
          name: 'add-client',
          component: () => import('./views/modules/clients/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'العملاء'},
              {title: 'جميع العملاء'},
              {title: 'اضافة عميل', active: true},
            ],
            pageTitle: '  اضافة عميل',
            authRequired: true,
          }
        },
        {
          path: '/clientsModule/edit-client/:id',
          name: 'edit-client',
          component: () => import('./views/modules/clients/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'العملاء'},
              {title: 'جميع العملاء'},
              {title: 'تعديل عميل', active: true},
            ],
            pageTitle: 'تعديل عميل',
            authRequired: true,
          }
        },
        // =============================================================================
        // Clients Routes
        // =============================================================================
        {
          path: '/shopsModule/all-shops',
          name: 'all-shops',
          component: () => import('./views/modules/shops/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'المحلات'},
              {title: 'جميع المحلات', active: true},
            ],
            pageTitle: 'المحلات',
            authRequired: true,
          }
        },
        {
          path: '/shopsModule/add-shop',
          name: 'add-shop',
          component: () => import('./views/modules/shops/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'المحلات'},
              {title: 'جميع المحلات'},
              {title: 'اضافة محل', active: true},
            ],
            pageTitle: '  اضافة محل',
            authRequired: true,
          }
        },
        {
          path: '/shopsModule/edit-shop/:id',
          name: 'edit-shop',
          component: () => import('./views/modules/shops/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'المحلات'},
              {title: 'جميع المحلات'},
              {title: 'تعديل محل', active: true},
            ],
            pageTitle: 'تعديل محل',
            authRequired: true,
          }
        },
        // =============================================================================
        // Admins Routes
        // =============================================================================
        {
          path: '/adminsModule/all-admins',
          name: 'all-admins',
          component: () => import('./views/modules/admins/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'المديرين'},
              {title: 'جميع المديرين', active: true},
            ],
            pageTitle: 'المديرين',
            authRequired: true,
          }
        },
        {
          path: '/adminsModule/add-admin',
          name: 'add-admin',
          component: () => import('./views/modules/admins/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'المديرين'},
              {title: 'جميع المديرين'},
              {title: 'اضافة مدير', active: true},
            ],
            pageTitle: 'اضافة مدير',
            authRequired: true,
          }
        },
        {
          path: '/adminsModule/edit-admin/:id',
          name: 'edit-admin',
          component: () => import('./views/modules/admins/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'المديرين'},
              {title: 'جميع المديرين'},
              {title: 'تعديل مدير', active: true},
            ],
            pageTitle: 'تعديل مدير',
            authRequired: true,
          }
        },
        // =============================================================================
        // Roles Routes
        // =============================================================================
        {
          path: '/rolesModule/all-roles',
          name: 'all-roles',
          component: () => import('./views/modules/roles/all/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Roles'},
              {title: 'Roles', active: true},
            ],
            pageTitle: 'Roles',
            authRequired: true,
          }
        },
        {
          path: '/rolesModule/add-role',
          name: 'add-role',
          component: () => import('./views/modules/roles/add/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Roles'},
              {title: 'Roles'},
              {title: 'Add Role', active: true},
            ],
            pageTitle: 'Add Role',
            authRequired: true,
          }
        },
        {
          path: '/rolesModule/edit-role/:id',
          name: 'edit-role',
          component: () => import('./views/modules/roles/edit/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'Dashboard', url: '/dashboard/home'},
              {title: 'Roles'},
              {title: 'Roles'},
              {title: 'Edit Role', active: true},
            ],
            pageTitle: 'Edit Role',
            authRequired: true,
          }
        },
        // =============================================================================
        // Settings Routes
        // =============================================================================
        {
          path: 'settingsModule/main_settings',
          name: 'main_settings',
          component: () => import('./views/modules/settings/main/Index.vue'),
          meta: {
            breadcrumb: [
              {title: 'الرئيسية', url: '/dashboard/home'},
              {title: 'الاعدادت'},
              {title: 'الاعدادات العامة', active: true},
            ],
            pageTitle: 'الاعدادات العامة',
            authRequired: true,
          }
        },
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'editor',
            authRequired: false,
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {
  // If auth required, check login. If login fails redirect to login page
  if (to.meta.authRequired) {
    // console.log(store.state.moduleAuth.isUserLoggedIn())
    let token = localStorage.getItem('token')
    if (!token) {
      router.push({name: 'page-login', query: {to: to.path}})
    }
  }

  next();
});

export default router
