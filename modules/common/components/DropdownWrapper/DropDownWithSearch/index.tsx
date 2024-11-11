import React, { useMemo, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsCheckCircle } from 'react-icons/bs'
import { useDebounce } from 'usehooks-ts'

import { DataTestId } from '@/lib/data/constants/data-test-id'

interface Props<Type> {
  topic: string
  selectedOption?: Type
  options?: Type[]
  selectHandler: (selected: Type, selectedIdx: number) => void
}

function DropDownWithSearch<
  T extends { id: string; value: string; icon?: string | JSX.Element },
>({ topic, selectedOption, options, selectHandler }: Props<T>) {
  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 700)

  const filteredValue = useMemo(() => {
    return options
      ? options.filter(option => {
          if (!debouncedInput) {
            return true
          } else {
            return option.value
              .toLowerCase()
              .includes(debouncedInput.toLowerCase())
          }
        })
      : []
  }, [debouncedInput])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="relative flex h-56 w-full flex-col space-y-2 overflow-hidden bg-white px-1 md:px-3">
      {selectedOption?.value && (
        <span className="flex w-full justify-between py-1">
          <p>{selectedOption.value}</p>
          <BsCheckCircle className="size-5 text-primary-6" />
        </span>
      )}

      <span className="flex w-full items-center space-x-2 rounded-md bg-shade-light/50 px-1 md:px-3 md:py-1">
        <AiOutlineSearch className="size-5 text-shade-medium" />
        <input
          onChange={handleInput}
          className={`input-outline-none block size-full border-none bg-shade-light/20 p-1 text-base text-shade-dark`}
          type="text"
          placeholder={`Search for ${topic}`}
          id={topic}
        />
      </span>

      {options && (
        <span className="generic-scrollbar z-50 flex h-44 flex-1 flex-col space-y-1 overflow-y-auto">
          {filteredValue.map((option, i) => (
            <div key={i} className="flex flex-row items-center space-x-2">
              {typeof option.icon === 'string' ? (
                <ReactCountryFlag
                  countryCode={option.icon as string}
                  svg
                  style={{
                    width: '1rem',
                    height: '1rem',
                  }}
                  title={option.icon as string}
                />
              ) : (
                <>{option?.icon}</>
              )}
              <p
                data-test-id={DataTestId.APP_SELECT_INPUT_DROPDOWN_ITEM}
                onClick={() => selectHandler(option, i)}
                className="nav-link font-semibold hover:cursor-pointer hover:text-primary-6"
              >
                {option.value}
              </p>
            </div>
          ))}
        </span>
      )}
    </div>
  )
}

export default DropDownWithSearch
