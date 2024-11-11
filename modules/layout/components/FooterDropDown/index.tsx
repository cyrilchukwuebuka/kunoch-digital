import React, { memo, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from 'react-icons/io'

import { Footer_List } from '@/lib/data/constants/footer.static'

type Props = {
  data: {
    id: string
    name: string
    list: Footer_List[]
  }
}

const DropDownCard = memo(function ({ data }: Props) {
  const [isActive, setIsActive] = useState(false)

  return (
    <section className="transition-ease h-fit w-full">
      <div
        onClick={() => setIsActive(!isActive)}
        className="flex cursor-pointer items-center justify-between space-x-2 py-2"
      >
        <p className="max-w-[85%] text-sm font-semibold uppercase">
          {data.name}
        </p>
        <div className="max-w-[15%]">
          <IoIosArrowDown
            className={`${
              isActive ? `rotate-180` : 'rotate-0'
            } h-7 w-full text-shade-medium`}
          />
        </div>
      </div>

      {isActive && (
        <div className="flex h-fit w-full flex-col space-y-2 pb-3 pl-2 text-base font-medium text-shade-dark">
          {data.list.map(item => (
            <Link key={item.id} href={item.href} passHref>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
})

export default DropDownCard
