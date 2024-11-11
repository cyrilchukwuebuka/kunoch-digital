/* eslint-disable react/display-name */

'use client';

import { Fragment, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineCar, AiOutlineHeart, AiOutlineUserAdd } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsPerson, BsQuestion, BsWallet } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu, GiSteeringWheel } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { TbLogin, TbLogout, TbMessageDots, TbRoad } from 'react-icons/tb';



import { AUTH_VIEW, useAuthContext } from '@/lib/contexts/auth-context';
import { DataTestId } from '@/lib/data/constants/data-test-id';
import useAlert from '@/lib/hooks/use-alert';
import useIsDriver from '@/lib/hooks/use-is-driver';
import useIsHost from '@/lib/hooks/use-is-host';
import useGlobalStore from '@/lib/store/global-store';
import { Route } from '@/lib/utils/config/routes';
import { URL_QUERIES, updatedSearchParams } from '@/lib/utils/helper/url-queries';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/modules/common/components/ui/dropdown-menu';
import { ScrollArea } from '@/modules/common/components/ui/scroll-area';





const Menu = memo(function () {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isHost = useIsHost()
  const isDriver = useIsDriver()
  const [toggleState, setToggleState] = useState(false)
  const [messageNotification, setMessageNotification] = useState(13)
  const [notification, setNotification] = useState(12)
  const { isAuthenticated, logout, authView } = useAuthContext()
  const activeUser = useGlobalStore(state => state.activeUser)
  const updateActiveUser = useGlobalStore(state => state.updateActiveUser)
  const [error, setError] = useState('')
  const { state, open, close, Alert } = useAlert(() => setError(''))
  const [mounted, setMounted] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  useEffect(() => {
    if (!mounted) setMounted(true)
  }, [mounted])

  if (!mounted) return null

  return (
    <Fragment>
      <DropdownMenu onOpenChange={state => setToggleState(state)}>
        <DropdownMenuTrigger>
          <section
            data-test-id={DataTestId.APP_MENU_ICON}
            className="nav-link transition-ease flex items-center space-x-3 rounded-full bg-white p-1 text-shade-dark hover:mb-1 hover:text-shade-dark hover:shadow-md md:space-x-1 md:border md:border-shade-light lg:space-x-3 lg:p-2"
          >
            <GiHamburgerMenu className="hidden h-5 w-5 md:flex md:h-4 md:w-4 lg:h-5 lg:w-5" />
            <span className="relative hidden md:block">
              <CgProfile className="hidden h-6 w-6 rounded-full bg-shade-light md:flex" />
              {isAuthenticated && (
                <p className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[0.5rem] text-white">
                  {messageNotification + notification < 99
                    ? messageNotification + notification
                    : '99+'}
                </p>
              )}
            </span>

            {!toggleState ? (
              <div className="flex items-center space-x-1 md:hidden md:w-16 md:space-x-3">
                <GiHamburgerMenu className="h-5 w-5 md:h-4 md:w-4 lg:h-5 lg:w-5" />
                <span className="relative">
                  <CgProfile className="h-6 w-6 rounded-full bg-shade-light" />
                  {isAuthenticated && (
                    <p className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[0.5rem] text-white">
                      {messageNotification + notification < 99
                        ? messageNotification + notification
                        : '99+'}
                    </p>
                  )}
                </span>
              </div>
            ) : (
              <button className="flex items-center rounded-md px-2 pb-1 text-2xl font-bold md:hidden">
                x
              </button>
            )}
          </section>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="m-3"
          data-test-id={DataTestId.APP_MENU_DROPDOWN}
        >
          <ScrollArea className="max-h-[75vh] w-64 overflow-y-auto md:max-h-[85vh]">
            {!isAuthenticated && (
              <Fragment>
                <section className="flex flex-col items-start justify-center space-y-2 p-3">
                  <DropdownMenuItem className="menu-item-container">
                    <div
                      data-test-id={DataTestId.BUTTON_SIGN_UP}
                      onClick={() => {
                        authView[1](AUTH_VIEW.REGISTER),
                          router.push(
                            Route.AUTH_ROUTE +
                              updatedSearchParams(
                                searchParams,
                                URL_QUERIES.NEXT_URL,
                                pathname,
                              ),
                          )
                      }}
                      className="menu-item"
                    >
                      <AiOutlineUserAdd className="h-5 w-5" />
                      <p>Sign up</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <div
                      data-test-id={DataTestId.BUTTON_LOG_IN}
                      onClick={() => {
                        authView[1](AUTH_VIEW.LOGIN),
                          router.push(
                            Route.AUTH_ROUTE +
                              updatedSearchParams(
                                searchParams,
                                URL_QUERIES.NEXT_URL,
                                pathname,
                              ),
                          )
                      }}
                      className="menu-item"
                    >
                      <TbLogin className="h-5 w-5" />
                      <p>Log in</p>
                    </div>
                  </DropdownMenuItem>
                </section>

                <DropdownMenuSeparator />

                <section className="flex flex-col items-start justify-center space-y-2 p-3">
                  {!isHost && (
                    <DropdownMenuItem className="menu-item-container">
                      <Link
                        data-test-id={DataTestId.BUTTON_BECOME_HOST}
                        href={Route.BECOME_A_HOST_ROUTE}
                        passHref
                        className="menu-item"
                      >
                        <AiOutlineCar className="h-5 w-5" />
                        <p>Become a host</p>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {!isDriver && (
                    <DropdownMenuItem className="menu-item-container">
                      <Link
                        data-test-id={DataTestId.BUTTON_BECOME_DRIVER}
                        href={Route.BECOME_A_DRIVER_ROUTE}
                        passHref
                        className="menu-item"
                      >
                        <GiSteeringWheel className="h-5 w-5" />
                        <p>Become a Driver</p>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_HOW_IT_WORKS}
                      href={Route.HOW_IT_WORKS_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <BsQuestion className="h-6 w-6" />
                      <p>How it works</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_GET_HELP}
                      href={Route.GET_HELP_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <TbMessageDots className="h-6 w-6" />
                      <p>Help</p>
                    </Link>
                  </DropdownMenuItem>
                </section>
              </Fragment>
            )}

            {isAuthenticated && (
              <div className="flex-col space-y-2">
                <section className="flex flex-col items-start justify-center space-y-2 p-3">
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_FAVOURITE}
                      href={Route.FAVOURITE_CAR_ROUTE(234)}
                      passHref
                      className="menu-item"
                    >
                      <AiOutlineHeart className="h-5 w-5" />
                      <p>Favourites</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_TRIPS}
                      href={Route.TRIPS_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <TbRoad className="h-5 w-5" />
                      <p>Trips</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_MESSAGE}
                      href={Route.MESSAGES_ROUTE()}
                      passHref
                      className="menu-item"
                    >
                      <span className="relative">
                        <TbMessageDots className="h-5 w-5" />
                        <p className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[0.5rem] text-white">
                          {messageNotification < 99
                            ? messageNotification
                            : '99+'}
                        </p>
                      </span>
                      <p>Messages</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_NOTIFICATION}
                      href={Route.NOTIFICATION_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <span className="relative">
                        <IoMdNotificationsOutline className="h-5 w-5" />
                        <p className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[0.5rem] text-white">
                          {notification < 99 ? notification : '99+'}
                        </p>
                      </span>
                      <p>Notifications</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_WALLET}
                      href={Route.WALLET_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <BsWallet className="h-4 w-4" />
                      <p>Wallet</p>
                    </Link>
                  </DropdownMenuItem>
                </section>

                <DropdownMenuSeparator />

                <section className="flex flex-col items-start justify-center space-y-2 p-3">
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_PROFILE}
                      href={Route.PROFILE_ROUTE(activeUser?.id ?? '')}
                      passHref
                      className="menu-item"
                    >
                      <BiUser className="h-5 w-5" />
                      <p>Profile</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_ACCOUNT}
                      href={Route.ACCOUNT_SETTINGS_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <BsPerson className="h-5 w-5" />
                      <p>Account</p>
                    </Link>
                  </DropdownMenuItem>
                  {!isHost && (
                    <DropdownMenuItem className="menu-item-container">
                      <Link
                        data-test-id={DataTestId.BUTTON_BECOME_HOST}
                        href={Route.BECOME_A_HOST_ROUTE}
                        passHref
                        className="menu-item"
                      >
                        <AiOutlineCar className="h-5 w-5" />
                        <p>Become a host</p>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {!isDriver && (
                    <DropdownMenuItem className="menu-item-container">
                      <Link
                        data-test-id={DataTestId.BUTTON_BECOME_DRIVER}
                        href={Route.BECOME_A_DRIVER_ROUTE}
                        passHref
                        className="menu-item"
                      >
                        <GiSteeringWheel className="h-5 w-5" />
                        <p>Become a Driver</p>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_HOW_IT_WORKS}
                      href={Route.HOW_IT_WORKS_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <BsQuestion className="h-6 w-6" />
                      <p>How it works</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="menu-item-container">
                    <Link
                      data-test-id={DataTestId.BUTTON_GET_HELP}
                      href={Route.GET_HELP_ROUTE}
                      passHref
                      className="menu-item"
                    >
                      <TbMessageDots className="h-6 w-6" />
                      <p>Help</p>
                    </Link>
                  </DropdownMenuItem>
                </section>

                <DropdownMenuSeparator />

                <section className="flex flex-col items-start justify-center space-y-2 p-3">
                  <DropdownMenuItem className="menu-item-container">
                    <div
                      data-test-id={DataTestId.BUTTON_LOG_OUT}
                      onClick={handleLogout}
                      className="menu-item"
                    >
                      <TbLogout className="h-5 w-5" />
                      <p>Logout</p>
                    </div>
                  </DropdownMenuItem>
                </section>
              </div>
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </Fragment>
  )
})

export default Menu