import { cacheExchange, createClient, fetchExchange } from 'urql'

import { ActiveUser } from '@/lib/store/global-store'

const url = `${process.env.NEXT_PUBLIC_HOST_BASE_URL}/graphql`

const getToken = (ActiveUser: ActiveUser): string => {
  return ActiveUser?.token?.accessToken ?? ''
}

export const urqlClient = (ActiveUser: ActiveUser) =>
  createClient({
    url,
    fetchOptions: () => {
      const token = getToken(ActiveUser)
      const headers: Record<string, string> = {}

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      return {
        // credentials: 'include', // to be uncommented later when wildcard is removed
        headers,
      }
    },
    exchanges: [cacheExchange, fetchExchange],
  })
