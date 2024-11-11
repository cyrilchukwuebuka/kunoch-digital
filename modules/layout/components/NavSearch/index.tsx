import React, { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineSearch } from 'react-icons/ai'
import usePlacesAutocomplete from 'use-places-autocomplete'
import * as yup from 'yup'

import { useGoogleMapsContext } from '@/lib/contexts/google-map-context'
import { DataTestId } from '@/lib/data/constants/data-test-id'
import { Route } from '@/lib/utils/config/routes'
import { PlacesAutoCompleteDropDown } from '@/modules/common/components/Modals'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/modules/common/components/ui/popover'
import { Form, Input } from '@/modules/form'
import DatePicker from '@/modules/form/DatePicker'
import PlacesAutoCompleteModal from '@/modules/form/PlacesAutoComplete'
import PlacesAutoCompleteInput from '@/modules/form/PlacesAutoComplete'
import TimePicker from '@/modules/form/TimePicker'

import NavSearchMobile from './NavSearchMobile'

interface InputFields {}

const ValidationSchema = yup.object({}).required()

type Props = {
  display: boolean
  dateTimeDisplay: boolean
}

const NavSearch = ({ display, dateTimeDisplay }: Props) => {
  const { place, setPlace } = useGoogleMapsContext()

  const [address, setAddress] = useState('')
  const [section, setSection] = useState('cars')
  const router = useRouter()
  const pathname = usePathname()
  const hiddenButtonRef = useRef<HTMLButtonElement>(null)
  const {
    init,
    setValue,
    suggestions: { data, loading },
  } = usePlacesAutocomplete({
    initOnMount: true,
    cache: 24 * 60 * 60,
    requestOptions: {
      componentRestrictions: { country: 'ng' },
    },
    debounce: 500,
  })

  const defaultValues = useMemo(() => {
    return {}
  }, [])

  const onSubmit = async (_data: InputFields, reset: () => void) => {
    // search()
  }

  return (
    <Form
      onSubmit={(data, reset) => onSubmit(data as InputFields, reset)}
      defaultValues={defaultValues}
      actionButtons={(isLoading: boolean) => (
        <button ref={hiddenButtonRef} type="submit" className={`hidden`} />
      )}
      schema={ValidationSchema}
      data-test-id={DataTestId.NAV_FORM_ELEMENT}
      className={`my-3 h-full w-[65%] md:w-[80%] lg:w-full ${
        display || !dateTimeDisplay ? 'flex' : 'hidden'
      } items-center md:space-x-5 md:px-5 xl:space-x-7 xl:px-7`}
    >
      <>
        <section
          className={`${
            !dateTimeDisplay ? 'w-[55%]' : 'lg:w-[25%] xl:w-[30%]'
          } hidden justify-between border-b-2 text-shade-dark lg:flex`}
        >
          <aside className="flex h-10 w-full items-center space-x-0.5">
            <AiOutlineSearch className={`size-4 text-shade-medium`} />
            <PlacesAutoCompleteInput
              id={DataTestId.NAV_INPUT}
              isNav
              placeholder="Address, city, airport or hotel"
            />
          </aside>

          {!pathname.includes(Route.CAR_SEARCH_ROUTE) &&
            !pathname.includes(Route.DRIVER_SEARCH_ROUTE) && (
              <aside
                className={`mr-1.5 hidden h-fit space-x-5 place-self-end md:flex`}
              >
                <span
                  onClick={() => setSection('cars')}
                  className={`pb-1 text-sm hover:cursor-pointer ${
                    section === 'cars'
                      ? 'border-b-2 border-b-primary-6 font-bold text-primary-6'
                      : 'text-shade-medium'
                  }`}
                >
                  Cars
                </span>
                <span
                  onClick={() => setSection('drivers')}
                  className={`pb-1 text-sm hover:cursor-pointer ${
                    section === 'drivers'
                      ? 'border-b-2 border-b-primary-6 font-bold text-primary-6'
                      : 'text-shade-medium'
                  }`}
                >
                  Drivers
                </span>
              </aside>
            )}
        </section>

        {dateTimeDisplay && (
          <section className="hidden w-[35%] lg:block xl:w-[30%]">
            <span className="flex w-[98%] items-center space-x-1 border-b-2 py-1 xl:w-[87%]">
              <p className="text-sm text-primary-6">From</p>
              <DatePicker />
              <TimePicker />
            </span>
          </section>
        )}

        {dateTimeDisplay && (
          <section className="hidden w-[35%] lg:block xl:w-[30%]">
            <span className="flex w-[98%] items-center space-x-1.5 border-b-2 py-1 xl:w-[87%]">
              <p className="text-sm text-primary-6">To</p>
              <DatePicker />
              <TimePicker />
            </span>
          </section>
        )}

        <NavSearchMobile />
      </>
    </Form>
  )
}

export default NavSearch
