import { create } from 'zustand'
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware'

export type ActiveUser = any

export interface State {
  activeUser?: ActiveUser
}

export type Actions = {
  updateActiveUser: (activeUser: ActiveUser) => void
  clearActiveUser: () => void
}

export const GLOBAL_STORE = 'kunoch-global-store'

const clearLocalStorageState = () => {
  localStorage.removeItem(GLOBAL_STORE)
}

const useGlobalStore = create<
  State & Actions,
  [
    ['zustand/subscribeWithSelector', State & Actions],
    ['zustand/devtools', State & Actions],
    ['zustand/persist', State & Actions],
  ]
>(
  subscribeWithSelector(
    devtools(
      persist(
        (set, get) => ({
          updateActiveUser: (activeUser: ActiveUser) =>
            set({ activeUser }, false, 'updateActiveUser'),
          clearActiveUser: () => {
            set({}, false, 'clearActiveUser'), clearLocalStorageState()
          },
        }),
        {
          name: GLOBAL_STORE,
          storage: createJSONStorage(() => localStorage),
        },
      ),
    ),
  ),
)

export default useGlobalStore
