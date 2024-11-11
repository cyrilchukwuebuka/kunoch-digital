'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import { TbWorld } from 'react-icons/tb'

import { useAuthContext } from '@/lib/contexts/auth-context'
import { DataTestId } from '@/lib/data/constants/data-test-id'
import useIsDriver from '@/lib/hooks/use-is-driver'
import useIsHost from '@/lib/hooks/use-is-host'
import { Route } from '@/lib/utils/config/routes'
import CompanyName from '@/modules/common/components/CompanyName'
import Logo from '@/modules/common/components/Logo'
import ReviewPopup from '@/modules/reviews/templates/ReviewPopup'

import FlagListing from '../../components/FlagListing'
import Menu from '../../components/Menu'
import NavSearch from '../../components/NavSearch'

const displayNormalNavbar = (path: string) => {
  if (
    path === Route.HOME_ROUTE ||
    path === Route.BECOME_A_DRIVER_ROUTE ||
    path === Route.BECOME_A_HOST_ROUTE ||
    path.includes('/home')
  ) {
    return true
  }
  return false
}

const displayNavbarPlaceDateTime = (path: string) => {
  if (path.includes('/search/cars') || path.includes('/search/drivers')) {
    return true
  }
  return false
}

const displayNavbarPlaceSearch = (path: string) => {
  if (displayNormalNavbar(path) || displayNavbarPlaceDateTime(path)) {
    return false
  }
  return true
}

const Navbar = () => {
  const pathname = usePathname()
  const [displayMenu, setDisplayMenu] = useState(false)
  const [displayFlag, setDisplayFlag] = useState(false)
  const [openAppVisibility, setOpenAppVisibility] = useState(true)
  const { isAuthenticated } = useAuthContext()
  const isHost = useIsHost()
  const isDriver = useIsDriver()
  const matchedPath = pathname.match(/[^?]+/gi)![0]

  return (
    <div
      data-test-id={DataTestId.CONTAINER_NAV}
      className="relative z-30 h-fit md:sticky md:top-0 md:h-16"
    >
      <div className="sticky top-0 mx-auto h-fit w-full bg-white text-shade-dark md:border-b md:border-shade-light">
        <section
          className={`${
            openAppVisibility ? 'flex' : 'hidden'
          } items-center justify-between space-x-5 bg-shade-light/30 py-3 pl-2 pr-4 sm:space-x-10 md:hidden`}
        >
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setOpenAppVisibility(!openAppVisibility)}
              className="flex items-center rounded-md pb-1 text-2xl font-bold md:hidden"
            >
              <GrFormClose className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-center rounded-md bg-white px-3 py-5">
              <div className="relative aspect-[2/1] w-10">
                <Logo />
              </div>
            </div>
          </div>

          <div className="text-black">
            <span className="pb-1 text-sm font-bold text-black">
              Open the {<CompanyName />} app
            </span>
            <p className="text-xs">For the best experience, view in the app</p>
          </div>

          <div className="">
            <Link
              href="#"
              passHref
              className="button flex w-fit items-center space-x-2 px-4 py-2 text-white"
            >
              <p className="my-auto h-full text-center text-sm">Open</p>
            </Link>
          </div>
        </section>

        <nav
          className={`container relative mx-auto flex h-16 w-full items-center justify-between bg-white px-4 font-medium ${
            displayMenu && 'border-b border-b-shade-light md:border-none'
          }`}
        >
          <div className="relative aspect-[2/1] w-14 md:w-20">
            <Logo />
          </div>

          {!displayNormalNavbar(matchedPath) && (
            <NavSearch
              display={displayNavbarPlaceDateTime(matchedPath)}
              dateTimeDisplay={displayNavbarPlaceDateTime(matchedPath)}
            />
          )}

          <div className="relative hidden items-center space-x-4 text-sm md:flex lg:space-x-8 lg:text-base">
            {displayNormalNavbar(matchedPath) && !isHost && (
              <Link
                href={Route.BECOME_A_HOST_ROUTE}
              data-test-id={DataTestId.BUTTON_BECOME_HOST}
                passHref
                className={`nav-link ${
                  pathname.includes(Route.BECOME_A_HOST_ROUTE) &&
                  'text-primary-6'
                }`}
              >
                Become a Host
              </Link>
            )}

            {displayNormalNavbar(matchedPath) && !isDriver && (
              <Link
                href={Route.BECOME_A_DRIVER_ROUTE}
              data-test-id={DataTestId.BUTTON_BECOME_DRIVER}
                passHref
                className={`nav-link ${
                  pathname.includes(Route.BECOME_A_DRIVER_ROUTE) &&
                  'text-primary-6'
                }`}
              >
                Become a Driver
              </Link>
            )}

            {displayNormalNavbar(matchedPath) && (
              <div className="nav-link flex items-center space-x-2">
                <TbWorld className="h-6 w-6" />
                <p className="mb-1">English</p>
              </div>
            )}

            {displayNormalNavbar(matchedPath) && (
              <FlagListing
                displayFlag={displayFlag}
                setDisplayFlag={setDisplayFlag}
              />
            )}

            <Menu />
          </div>

          <div className="md:hidden">
            <Menu />
          </div>
        </nav>

        {isAuthenticated && <ReviewPopup />}
      </div>

      {/* <Authentication close={authFlow} callback={setAuthFlow} /> */}
    </div>
  )
}

export default Navbar
