import React from 'react'
import { Metadata } from 'next'

import { siteConfig } from '@/lib/utils/config/site'
import AuthTemplate from '@/modules/authentication/templates/auth-template'

export const metadata: Metadata = {
  title: `Authentication - ${siteConfig.name}`,
  description: siteConfig.description,
}

const AuthPage = () => {
  return <AuthTemplate />
}

export default AuthPage
