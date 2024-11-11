/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import { memo, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { IoIosArrowDown } from 'react-icons/io'

import { DataTestId } from '@/lib/data/constants/data-test-id'
import { useNavigationEvents } from '@/lib/hooks/use-navigation-event'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/modules/common/components/ui/dropdown-menu'

type Props = {
  displayFlag: boolean
  setDisplayFlag: (x: boolean) => void
}

const FlagListing = memo(function ({ displayFlag, setDisplayFlag }: Props) {
  const [toggleState, setToggleState] = useState(false)
  useNavigationEvents(() => setToggleState(false))

  return (
    <DropdownMenu onOpenChange={state => setToggleState(state)}>
      <DropdownMenuTrigger>
        <section className="nav-link flex items-center space-x-3">
          <ReactCountryFlag
            countryCode={'ng'}
            svg
            style={{
              width: '1rem',
              height: '1rem',
            }}
            title={'NG'}
          />
          <p className="mb-1 font-semibold">NGN</p>
          <IoIosArrowDown className={toggleState ? `rotate-180` : 'rotate-0'} />
        </section>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="m-3"
        data-test-id={DataTestId.APP_MENU_DROPDOWN}
      >
        <DropdownMenuItem className="menu-item-container">
          <span className="menu-item flex items-center justify-center space-x-3 px-8 hover:cursor-pointer hover:bg-primary-1">
            <ReactCountryFlag
              countryCode={'ng'}
              svg
              style={{
                width: '1rem',
                height: '1rem',
              }}
              title={'NG'}
            />
            <p className="mb-1 font-semibold">NGN</p>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="menu-item-container">
          <span className="flex items-center justify-center space-x-3 px-8 hover:cursor-pointer hover:bg-primary-1">
            <ReactCountryFlag
              countryCode={'us'}
              svg
              style={{
                width: '1rem',
                height: '1rem',
              }}
              title={'US'}
            />
            <p className="mb-1 font-semibold">USA</p>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})

export default FlagListing
