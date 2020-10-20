import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);


// const store = () => import('@store/index')
import store from '../store' // your vuex store 

// const Login = () => import('@/views/pages/Login')


// import Login from '../views/admin/auth/LoginComponent'
import ForgotPassword from '../views/admin/auth/ForgotPasswordComponent'
import ChangePassword from '../views/admin/auth/ChangePasswordComponent'
import Full from "../containers/Full"

// Views
import Dashboard from '../views/Dashboard'
import Users from '../views/admin/Users/Index'
import EditUsers from '../views/admin/Users/Edit'
import Profile from '../views/admin/auth/Profile'

/** Masters Components */
import Regions from '../views/admin/Masters/Regions'
import Accounts from '../views/admin/Masters/Accounts'
import Machines from '../views/admin/Masters/Machines'
import Currency from '../views/admin/Masters/Currency'
import Services from '../views/admin/Masters/Services'
import BodyParts from '../views/admin/Masters/BodyParts'
import Languages from '../views/admin/Masters/Languages'
import Countries from '../views/admin/Masters/Countries'
import Equipments from '../views/admin/Masters/Equipments'
import ActionForce from '../views/admin/Masters/ActionForce'
import RepetitionMax from '../views/admin/Masters/RepetitionMax'
import TargetedTypes from '../views/admin/Masters/TargetedTypes'
import TrainingGoals from '../views/admin/Masters/TrainingGoals'
import Specializations from '../views/admin/Masters/Specializations'
import TargetedMuscles from '../views/admin/Masters/TargetedMuscles'
import TargetedIntensity from '../views/admin/Masters/TargetedIntensity'
import TrainingActivities from '../views/admin/Masters/TrainingActivities'
import CancellationPolicy from '../views/admin/Masters/CancellationPolicy'
import PresetProgramsWeeks from '../views/admin/Masters/PresetProgramsWeeks'
import PresetProgramsWeeksLaps from '../views/admin/Masters/PresetProgramsWeeksLaps'
import TargetedFrequencies from '../views/admin/Masters/TargetedFrequencies'

/** chart component */
import Charts from '../views/Charts'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard1 = () => import('@/views/DashboardComponent')
const FeedReports = () => import('@/views/admin/FeedReports')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

// const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/admin/auth/LoginComponent')
// const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
// const Users = () => import('@/views/users/Users')
// const User = () => import('@/views/users/User')

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {

  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/dashboard')
}
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode   //  hash   // history
  // base: process.env.BASE_URL,
  // linkActiveClass: 'open active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      beforeEnter: ifAuthenticated,
      children: [
        // {
        //   path: 'dashboard-1',
        //   name: 'Dashboard',
        //   component: Dashboard,
        //   beforeEnter: ifAuthenticated,
        // },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard1
        },
        {
          path: 'feed-reports',
          name: 'FeedReports',
          component: FeedReports
        },
        {
          path: "/accounts", // route_prefix +
          name: "Accounts",
          component: Accounts,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/action-force", // route_prefix +
          name: "Action Force",
          component: ActionForce,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/body-part", // route_prefix +
          name: "Body Part",
          component: BodyParts,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/countries", // route_prefix +
          name: "Countries",
          component: Countries,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/currency", // route_prefix +
          name: "Currency",
          component: Currency,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/equipments", // route_prefix +
          name: "Equipments",
          component: Equipments,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/languages", // route_prefix +
          name: "Languages",
          component: Languages,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/machines", // route_prefix +
          name: "Machines",
          component: Machines,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/regions", // route_prefix +
          name: "Regions",
          component: Regions,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/repetition-max", // route_prefix +
          name: "Repetition Max",
          component: RepetitionMax,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/services", // route_prefix +
          name: "Services",
          component: Services,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/specializations", // route_prefix +
          name: "Specializations",
          component: Specializations,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/targeted-muscles", // route_prefix +
          name: "Targeted Muscles",
          component: TargetedMuscles,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/training-activities", // route_prefix +
          name: "Training Activities",
          component: TrainingActivities,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/targeted-frequencies", // route_prefix +
          name: "Targeted Frequencies",
          component: TargetedFrequencies,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/training-goals", // route_prefix +
          name: "Training Goals",
          component: TrainingGoals,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/targeted-intensity", // route_prefix +
          name: "Targeted Intensity",
          component: TargetedIntensity,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/targeted-types", // route_prefix +
          name: "Targeted Types",
          component: TargetedTypes,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/cancellation-policy", // route_prefix +
          name: "Cancellation Policy",
          component: CancellationPolicy,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/preset-common-weeks", // route_prefix +
          name: "Preset Prgrams Weeks",
          component: PresetProgramsWeeks,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/preset-common-weeks-leps", // route_prefix +
          name: "Preset Prgrams Weeks Laps",
          component: PresetProgramsWeeksLaps,
          beforeEnter: ifAuthenticated,
        },
        {
          path: '/profile',
          name: "profile",
          component: Profile,
          beforeEnter: ifAuthenticated,
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users' },
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            // {
            //   path: ':id',
            //   meta: { label: 'User Details' },
            //   name: 'User',
            //   component: User,
            // },
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render(c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    },

    {
      path: '/login',
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/forgot-password',
      name: "forgot-password",
      component: ForgotPassword,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/change-password/:email/:token',
      name: "change-password",
      component: ChangePassword,
      beforeEnter: ifNotAuthenticated,
    },

    {
      path: '/app',
      redirect: "users", // route_prefix +
      name: "Home1",
      beforeEnter: ifAuthenticated,
      component: Full,
      children: [
        // {
        //   path: "/dashboard", // route_prefix +
        //   name: "Dashboard",
        //   component: Dashboard,
        //   beforeEnter: ifAuthenticated,
        // },
        {
          path: "/users", // route_prefix +
          name: "Users",
          component: Users,
          beforeEnter: ifAuthenticated,
        },
        {
          path: "/user/:id/edit", // route_prefix +
          name: "Edit user",
          component: EditUsers,
          beforeEnter: ifAuthenticated,
        },


        // {
        //   path: '/charts',
        //   name: 'Charts',
        //   component: Charts
        // },
      ]
    },
    {
      path: '*', // set default fou7te
      component: null,
      redirect: "/users",
      beforeEnter: ifAuthenticated,
    },
  ]
  /*   routes: [
      {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: DefaultContainer,
        children: [
          {
            path: 'Dashboard',
            name: 'Dashboard',
            component: Dashboard
          },
          {
            path: 'theme',
            redirect: '/theme/colors',
            name: 'Theme',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'colors',
                name: 'Colors',
                component: Colors
              },
              {
                path: 'typography',
                name: 'Typography',
                component: Typography
              }
            ]
          },
          {
            path: 'charts',
            name: 'Charts',
            component: Charts
          },
          {
            path: 'widgets',
            name: 'Widgets',
            component: Widgets
          },
          {
            path: 'users',
            meta: { label: 'Users' },
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: '',
                component: Users,
              },
              {
                path: ':id',
                meta: { label: 'User Details' },
                name: 'User',
                component: User,
              },
            ]
          },
          {
            path: 'base',
            redirect: '/base/cards',
            name: 'Base',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'cards',
                name: 'Cards',
                component: Cards
              },
              {
                path: 'forms',
                name: 'Forms',
                component: Forms
              },
              {
                path: 'switches',
                name: 'Switches',
                component: Switches
              },
              {
                path: 'tables',
                name: 'Tables',
                component: Tables
              },
              {
                path: 'tabs',
                name: 'Tabs',
                component: Tabs
              },
              {
                path: 'breadcrumbs',
                name: 'Breadcrumbs',
                component: Breadcrumbs
              },
              {
                path: 'carousels',
                name: 'Carousels',
                component: Carousels
              },
              {
                path: 'collapses',
                name: 'Collapses',
                component: Collapses
              },
              {
                path: 'jumbotrons',
                name: 'Jumbotrons',
                component: Jumbotrons
              },
              {
                path: 'list-groups',
                name: 'List Groups',
                component: ListGroups
              },
              {
                path: 'navs',
                name: 'Navs',
                component: Navs
              },
              {
                path: 'navbars',
                name: 'Navbars',
                component: Navbars
              },
              {
                path: 'paginations',
                name: 'Paginations',
                component: Paginations
              },
              {
                path: 'popovers',
                name: 'Popovers',
                component: Popovers
              },
              {
                path: 'progress-bars',
                name: 'Progress Bars',
                component: ProgressBars
              },
              {
                path: 'tooltips',
                name: 'Tooltips',
                component: Tooltips
              }
            ]
          },
          {
            path: 'buttons',
            redirect: '/buttons/standard-buttons',
            name: 'Buttons',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'standard-buttons',
                name: 'Standard Buttons',
                component: StandardButtons
              },
              {
                path: 'button-groups',
                name: 'Button Groups',
                component: ButtonGroups
              },
              {
                path: 'dropdowns',
                name: 'Dropdowns',
                component: Dropdowns
              },
              {
                path: 'brand-buttons',
                name: 'Brand Buttons',
                component: BrandButtons
              }
            ]
          },
          {
            path: 'icons',
            redirect: '/icons/font-awesome',
            name: 'Icons',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'coreui-icons',
                name: 'CoreUI Icons',
                component: CoreUIIcons
              },
              {
                path: 'flags',
                name: 'Flags',
                component: Flags
              },
              {
                path: 'font-awesome',
                name: 'Font Awesome',
                component: FontAwesome
              },
              {
                path: 'simple-line-icons',
                name: 'Simple Line Icons',
                component: SimpleLineIcons
              }
            ]
          },
          {
            path: 'notifications',
            redirect: '/notifications/alerts',
            name: 'Notifications',
            component: {
              render(c) { return c('router-view') }
            },
            children: [
              {
                path: 'alerts',
                name: 'Alerts',
                component: Alerts
              },
              {
                path: 'badges',
                name: 'Badges',
                component: Badges
              },
              {
                path: 'modals',
                name: 'Modals',
                component: Modals
              }
            ]
          }
        ]
      },
      {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
          render(c) { return c('router-view') }
        },
        children: [
          {
            path: '404',
            name: 'Page404',
            component: Page404
          },
          {
            path: '500',
            name: 'Page500',
            component: Page500
          },
          {
            path: 'login',
            name: 'Login',
            component: Login
          },
          {
            path: 'register',
            name: 'Register',
            component: Register
          }
        ]
      }
    ] */
})
