import { Route } from './routes'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'IJE',
  description: 'IJE, a service rental application',
  mainNav: [
    {
      title: 'IJE',
      href: Route.HOME_ROUTE,
    },
  ],
  links: {
    twitter: '',
    github: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    linkedin: '',
    docs: '',
  },
}
