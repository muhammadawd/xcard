/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/


export default [
  {
    url: null,
    name: "Dashboard",
    // tag: "2",
    // tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard",
    submenu: [
      {
        url: '/dashboard/home',
        name: "home",
        slug: "dashboard-home",
        i18n: "home",
      },
    ]
  },
  {
    header: "Apps",
    icon: "PackageIcon",
    i18n: "app_core",
    items: [
      {
        url: null,
        name: "categories",
        icon: "BookOpenIcon",
        i18n: "categories",
        submenu: [
          {
            url: '/categoriesModule/all-categories',
            name: "categories",
            slug: "all-categories",
            i18n: "categories",
          }
        ]
      },
      {
        url: null,
        name: "clients",
        icon: "UsersIcon",
        i18n: "clients",
        submenu: [
          {
            url: '/clientsModule/all-clients',
            name: "clients",
            slug: "all-clients",
            i18n: "clients",
          }
        ]
      },
      {
        url: null,
        name: "shops",
        icon: "ShoppingBagIcon",
        i18n: "shops",
        submenu: [
          {
            url: '/shopsModule/all-shops',
            name: "shops",
            slug: "all-shops",
            i18n: "shops",
          }
        ]
      },
    ],
  },
  {
    header: "Settings",
    icon: "PackageIcon",
    i18n: "settings",
    items: [
      {
        url: null,
        name: "settings",
        icon: "SettingsIcon",
        i18n: "settings",
        submenu: [
          {
            url: '/settingsModule/main_settings',
            name: "main_settings",
            slug: "main-settings",
            i18n: "main_settings",
          },
        ]
      },
      {
        url: null,
        name: "roles",
        icon: "Navigation2Icon",
        i18n: "roles",
        submenu: [
          {
            url: '/rolesModule/all-roles',
            name: "roles",
            slug: "all-roles",
            i18n: "roles",
          }
        ]
      },
      {
        url: null,
        name: "admins",
        icon: "UsersIcon",
        i18n: "admins",
        submenu: [
          {
            url: '/adminsModule/all-admins',
            name: "admins",
            slug: "all-admins",
            i18n: "admins",
          },
        ]
      },
    ]
  }
]

