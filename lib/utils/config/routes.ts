import { kebabCase } from 'lodash'

import { URL_QUERIES } from '../helper/url-queries'

export const Route = {
  HOME_ROUTE: '/',

  CARTYPE_HOME_ROUTE: (country: string, carType: string) =>
    `/car-rental/${country}/${carType}`,
  PLACE_HOME_ROUTE: (country: string, place: string) => `/${country}/${place}`,

  ABOUT_US_ROUTE: '/about-us',
  TERMS_OF_SERVICE_ROUTE: '/terms-of-service',
  PRIVACY_AND_POLICY_ROUTE: '/privacy-and-policy',
  FAQS_ROUTE: '/faqs',
  TRUST_SAFETY_ROUTE: '/trust-and-safety',
  SITE_MAP_ROUTE: '/site-map',
  HOW_IT_WORKS_ROUTE: '/how-it-works',
  GET_HELP_ROUTE: '/get-help',
  GET_HELP_TOPIC_ROUTE: (topic: string) => `/get-help/${topic}`,
  SUB_HELP_TOPIC_ROUTE: (topic: string, subtopic: string) =>
    `/get-help/${topic}/${subtopic}`,

  AUTH_ROUTE: '/auth',
  KYC_ROUTE: '/auth/kyc',
  KYC_PROMPT_ROUTE: '/auth/kyc/prompt',

  DRIVER_SEARCH_ROUTE: '/drivers',
  CAR_SEARCH_ROUTE: '/cars',
  CAR_DETAILS_ROUTE: (make: string, model: string, id: string) =>
    `/car/${kebabCase(make)}/${kebabCase(model)}/${id}`,
  CAR_CHECKOUT_ROUTE: (id: string) => `/car/checkout/${id}`,
  CAR_CHECKOUT_SUCCESS_ROUTE: (id: string) => `/car/checkout/success/${id}`,
  DRIVER_DETAILS_ROUTE: (name: string, id: string) =>
    `/driver/${kebabCase(name)}/${id}`,
  DRIVER_CHECKOUT_ROUTE: (id: string) => `/driver/checkout/${id}`,
  DRIVER_CHECKOUT_SUCCESS_ROUTE: (id: string) =>
    `/driver/checkout/success/${id}`,

  BECOME_A_DRIVER_ROUTE: '/become-a-driver',
  DRIVER_ENLIST_ROUTE: '/become-a-driver/enlist',

  BECOME_A_HOST_ROUTE: '/become-a-host',
  HOST_ENLIST_ROUTE: '/become-a-host/enlist',

  PROFILE_ROUTE: (id: string | number) => `/public-profile/${id}`,

  FAVOURITE_CAR_ROUTE: (id: string | number) =>
    `${Route.PROFILE_ROUTE(id)}?profile_tab=favourite-cars`,

  ACCOUNT_SETTINGS_ROUTE: '/account-settings',
  PERSONAL_INFO_ROUTE: `/account-settings/personal-info`,
  LOGIN_SECURITY_ROUTE: `/account-settings/login-security`,
  WALLET_PAYMENT_ROUTE: `/account-settings/wallet-payments`,
  NOTIFICATION_SETTINGS_ROUTE: `/account-settings/notification-settings`,
  PRIVACY_SHARING_ROUTE: `/account-settings/privacy-sharing`,
  GLOBAL_PREFERENCES_ROUTE: `/account-settings/global-preferences`,
  TRIPS_ROUTE: `/account-settings/trips`,
  // HOST_LISTED_CARS: `/account-settings/trips?${URL_QUERIES.ACCOUNT_SETTINGS_SUBNAV}=host-view&${URL_QUERIES.TRIPS_TAB_SECTION}=hosted-car`,

  DASHBOARD_ROUTE: `/dashboard`,
  HOSTED_CARS_ROUTE: `/host/cars`,
  HOST_CAR_CONFIG_ROUTE: (id: string | number) => `/host/cars/${id}/edit`,
  NOTIFICATION_ROUTE: `/notifications`,
  MESSAGES_ROUTE: (id?: string) => `/messages`,
  WALLET_ROUTE: `/wallet`,
  WALLET_CHECKOUT_ROUTE: (id: string) => `/wallet/checkout/${id}`,
  CONFLICT_ROUTE: (id: string | number) => `/conflict/${id}`,
}
