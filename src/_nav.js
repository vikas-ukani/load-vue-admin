export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        // variant: 'primary',
        // text: 'NEW'
      }
    },
    {
      name: 'Feed Reports',
      url: '/feed-reports',
      icon: 'icon-paper',
      badge: {
        variant: 'success',
        text: 'NEW'
      }
    },

    {
      title: true,
      name: 'Masters'
    },
    {
      name: 'Masters',
      url: '/masters',
      icon: 'icon-list',
      children: [
        {
          name: 'Accounts',
          url: '/accounts',
          icon: 'icon-credit-card',
          sequence: 4
        },
        {
          name: 'Action Force',
          url: '/action-force',
          icon: 'icon-directions',
          sequence: 2
        },
        {
          name: 'Body Part',
          url: '/body-part',
          icon: 'icon-eye',
          sequence: 3
        },
        {
          name: 'Countries',
          url: '/countries',
          icon: 'icon-location-pin',
          sequence: 5
        },
        {
          name: 'Currency',
          url: '/currency',
          icon: 'icon-anchor',
          sequence: 5.5
        },
        {
          name: 'Equipments',
          url: '/equipments',
          icon: 'icon-wrench',
          sequence: 6
        },
        {
          name: 'Languages',
          url: '/languages',
          icon: 'icon-globe',
          sequence: 7
        },
        {
          name: 'Machines',
          url: '/machines',
          icon: 'icon-wrench',
          sequence: 8

        },
        {
          name: 'Regions',
          url: '/regions',
          icon: 'icon-direction',
          sequence: 9
        },
        {
          name: 'Repetition Max',
          url: '/repetition-max',
          icon: 'icon-puzzle',
          sequence: 10
        },
        {
          name: 'Services',
          url: '/services',
          icon: 'icon-settings',
          sequence: 11
        },
        {
          name: 'Specializations',
          url: '/specializations',
          icon: 'icon-globe-alt',
          sequence: 12
        },
        {
          name: 'Targeted Muscles',
          url: '/targeted-muscles',
          icon: 'icon-target',
          sequence: 13
        },
        {
          name: 'Training Activities',
          url: '/training-activities',
          icon: 'icon-directions',
          sequence: 14
        },
        {
          name: 'Targeted Frequencies',
          url: '/targeted-frequencies',
          icon: 'icon-compass',
          sequence: 15
        },
        {
          name: 'Training Goals',
          url: '/training-goals',
          icon: 'icon-trophy',
          sequence: 16
        },
        {
          name: 'Targeted Intensity',
          url: '/targeted-intensity',
          icon: 'icon-bulb',
          sequence: 17
        },
        {
          name: 'Targeted Types',
          url: '/targeted-types',
          icon: 'icon-support',
          sequence: 18
        },
        {
          name: 'Cancellation Policy',
          url: '/cancellation-policy',
          icon: 'icon-shield',
          sequence: 19
        },
        // {
        //   name: 'Preset Programs Weeks',
        //   url: '/preset-common-weeks',
        //   icon: 'icon-calendar',
        //   sequence: 20
        // },
        // {
        //   name: 'Preset Programs Weeks Leps',
        //   url: '/preset-common-weeks-leps',
        //   icon: 'icon-calendar',
        //   sequence: 21
        // }
      ]
    },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart'
    // },

  ]
  /* items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Theme',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop'
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil'
    },
    {
      title: true,
      name: 'Components',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle'
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle'
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle'
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle'
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle'
        },
        {
          name: 'List Groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Navbars',
          url: '/base/navbars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle'
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle'
        },
        {
          name: 'Progress Bars',
          url: '/base/progress-bars',
          icon: 'icon-puzzle'
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/buttons/standard-buttons',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Dropdowns',
          url: '/buttons/dropdowns',
          icon: 'icon-cursor'
        },
        {
          name: 'Button Groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor'
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor'
        }
      ]
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW'
          }
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star'
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7'
          }
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      badge: {
        variant: 'secondary',
        text: 'NEW'
      },
      attributes: { disabled: true },
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/vue/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    },
    {
      name: 'Try CoreUI PRO',
      url: 'http://coreui.io/pro/vue/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: 'noopener' }
    },
  ] */
}
