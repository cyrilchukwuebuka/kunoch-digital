import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { IoIosArrowDown } from 'react-icons/io'

import { DataTestId } from '@/lib/data/constants/data-test-id'
import { Route } from '@/lib/utils/config/routes'
import DatePicker from '@/modules/form/DatePicker'
import PlacesAutoCompleteInput from '@/modules/form/PlacesAutoComplete'
import TimePicker from '@/modules/form/TimePicker'

const NavSearchMobile = () => {
  const [dropDown, setDropDown] = useState(false)
  const [section, setSection] = useState('cars')
  const router = useRouter()
  const pathname = usePathname()

  // const reload = () =>
  //   router.replace(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...router.query,
  //       },
  //     },
  //     undefined,
  //     {
  //       shallow: true,
  //     },
  //   )

  return (
    <div className="mx-auto my-0.5 flex h-[90%] w-full rounded-md lg:hidden">
      <button className="relative mx-auto my-0.5 flex h-[90%] w-[97%] items-center rounded-md text-left lg:hidden">
        <section className="flex w-[97%] flex-col overflow-hidden bg-gray-200 px-1.5 py-0.5">
          <p className="w-[90%] truncate text-sm md:text-base">
            Ilasamaja, Lagos, NG
          </p>
          <p className="w-[90%] truncate text-sm md:text-base">
            Oct 19, 10:00 AM - Oct 22, 11:00 PM
          </p>
        </section>

        <span
          onClick={() => setDropDown(!dropDown)}
          className="absolute inset-0 flex size-full items-center justify-end pr-3 hover:cursor-pointer md:pr-5"
        >
          <IoIosArrowDown
            className={`size-6 text-shade-medium${
              dropDown ? `rotate-180` : 'rotate-0'
            }`}
          />
        </span>
      </button>

      {dropDown && (
        <div className="absolute inset-x-0 bottom-0 top-16 z-10 h-full">
          <div
            // onClick={reload}
            className="absolute inset-x-0 bottom-0 top-16 h-screen"
          ></div>

          <section
            className={` flex flex-col rounded-md border-2 bg-white px-5 py-2 text-sm drop-shadow `}
          >
            {!pathname.includes(Route.CAR_SEARCH_ROUTE) &&
              !pathname.includes(Route.DRIVER_SEARCH_ROUTE) && (
                <section
                  className={`flex space-x-8 border-b border-b-shade-light px-5 font-bold text-shade-medium md:px-0`}
                >
                  <p
                    onClick={() => setSection('cars')}
                    className={`w-fit select-none py-2 hover:cursor-pointer md:py-0 ${
                      section === 'cars' &&
                      'border-b-2 border-b-shade-medium text-black'
                    }`}
                  >
                    Cars
                  </p>
                  <p
                    onClick={() => setSection('drivers')}
                    className={`w-fit select-none py-2 hover:cursor-pointer md:py-0 ${
                      section === 'drivers' &&
                      'border-b-2 border-b-shade-medium text-black'
                    }`}
                  >
                    Drivers
                  </p>
                </section>
              )}

            <div className="my-3 flex flex-col space-y-0 border-b border-b-shade-light">
              <p className="h-1/2 w-full">Where</p>
              <div className="!placeholder:text-sm h-5 w-full text-shade-medium">
                <PlacesAutoCompleteInput
                  id={DataTestId.INPUT}
                  isNav
                  placeholder="Address, city, airport or hotel"
                />
              </div>
            </div>

            <div className="my-3 flex flex-col space-y-1 border-b border-b-shade-light">
              <p className="h-1/2 w-full">Pickup</p>
              <div className="flex h-1/2 space-x-5 sm:space-x-10">
                <span className="flex h-5 w-24 items-center space-x-0 hover:cursor-pointer">
                  <DatePicker />
                </span>
                <span className="flex h-5 w-[6.5rem] items-center hover:cursor-pointer">
                  <TimePicker />
                </span>
              </div>
            </div>

            <div className="my-3 flex flex-col space-y-1 border-b border-b-shade-light">
              <p className="h-1/2 w-full">Dropoff</p>
              <div className="flex h-1/2 space-x-5 sm:space-x-10">
                <span className="flex h-5 w-24 items-center space-x-0 hover:cursor-pointer">
                  <DatePicker />
                </span>
                <span className="flex h-5 w-[6.5rem] items-center hover:cursor-pointer">
                  <TimePicker />
                </span>
              </div>
            </div>

            <div className="flex grow items-center justify-center py-3">
              <span
                // onClick={search}
                className="button w-full rounded-md py-3 text-white drop-shadow hover:cursor-pointer"
              >
                <button className="w-full text-center">
                  {section === 'cars'
                    ? 'Search for cars'
                    : 'Search for drivers'}
                </button>
              </span>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default NavSearchMobile
