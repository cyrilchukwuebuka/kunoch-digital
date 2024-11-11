import React, { useEffect, useRef } from 'react'

import DropDownWithSearch from './DropDownWithSearch'

type Props = {
  setDropdown: (x: boolean) => void
  children: JSX.Element
}

const DropdownWrapper = ({ setDropdown, children }: Props) => {
  let dropdownContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.addEventListener(
      'keydown',
      e => e.key === 'Escape' && setDropdown(false),
    )

    // const mouseDownHandler = (e: any) => {
    //   if (
    //     !(
    //       dropdownContainerRef.current &&
    //       dropdownContainerRef.current.contains(e.target)
    //     )
    //   ) {
    //     setDropdown(false)
    //   } else {
    //     e.target?.click()
    //   }
    // }

    // document.addEventListener('mousedown', mouseDownHandler)

    return () => {
      document.removeEventListener('keydown', e => e.key === 'Escape')
      // document.removeEventListener('mousedown', mouseDownHandler)
    }
  }, [])

  return (
    <div ref={dropdownContainerRef} className="h-fit w-fit overflow-hidden">
      {children}
    </div>
  )
}

export default DropdownWrapper

export { DropDownWithSearch, DropdownWrapper }
