'use client';

import React, { useMemo, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useIsClient } from 'usehooks-ts';
import { v4 } from 'uuid';



import { DataTestId } from '@/lib/data/constants/data-test-id';
import { DOTS, usePagination } from '@/lib/hooks/use-pagination';



import DropdownWrapper from '../DropdownWrapper';


type Props = {
  rangeStart: number
  totalCount: number
  currentPage: number
  siblingCount: number
  pageSize?: number
  className?: string
  pageColumn?: number
  onPageChange?: (x: number) => void
  onRowsPerPageChange?: (page: number, pageSize: number) => void
}

const Pagination = ({
  rangeStart,
  totalCount,
  currentPage,
  siblingCount,
  pageSize = 10,
  pageColumn = 1,
  className,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  const [dropdown, setDropdown] = useState(false)
  const isClient = useIsClient()
  const paginationRange = usePagination({
    currentPage,
    totalCount: totalCount / pageColumn,
    siblingCount,
    pageSize,
  })

  const rowPerPageCounts = useMemo(
    () => [
      {
        id: v4(),
        value: 5,
      },
      {
        id: v4(),
        value: 10,
      },
      {
        id: v4(),
        value: 20,
      },
      {
        id: v4(),
        value: 50,
      },
      {
        id: v4(),
        value: 100,
      },
    ],
    [],
  )

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange && onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange && onPageChange(currentPage - 1)
  }

  const applyRowPerPageCount = (selectedOption: number) => {
    setDropdown(false)
    onRowsPerPageChange && onRowsPerPageChange(currentPage, selectedOption)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  if (!isClient) return null

  return (
    <div className={className} data-test-id={DataTestId.APP_PAGINATION}>
      <div className="flex items-center justify-center space-x-2 pb-4 lg:pb-0">
        <span className="hidden w-fit text-sm font-semibold text-shade-dark lg:block">{`${rangeStart} - ${
          rangeStart + pageSize * pageColumn - 1 <= totalCount
            ? rangeStart + pageSize * pageColumn - 1
            : totalCount
        } of ${totalCount} items`}</span>
        <button
          data-test-id={DataTestId.APP_PAGINATION_PREV_BUTTON}
          className="text-shade-medium disabled:text-gray-400"
          disabled={currentPage === 1}
          onClick={onPrevious}
        >
          <MdOutlineKeyboardArrowLeft className="h-7 w-7 md:h-9 md:w-9" />
        </button>

        {paginationRange &&
          paginationRange.map(pageNumber => {
            if (pageNumber === DOTS) {
              return (
                <span key={v4()} className="flex h-full w-fit items-center">
                  ...
                </span>
              )
            }

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange && onPageChange(Number(pageNumber))}
                className={`rounded-md px-2 py-1 text-sm md:px-4 md:py-2 ${
                  pageNumber === currentPage
                    ? 'bg-primary-3 text-white hover:bg-primary-3/60'
                    : 'bg-gray-100 hover:bg-gray-200'
                } transition-ease`}
              >
                {pageNumber}
              </button>
            )
          })}

        <button
          data-test-id={DataTestId.APP_PAGINATION_NEXT_BUTTON}
          className="text-shade-medium disabled:text-gray-400"
          disabled={currentPage === lastPage}
          onClick={onNext}
        >
          <MdOutlineKeyboardArrowRight className="h-7 w-7 md:h-9 md:w-9" />
        </button>

        <div className="relative hidden lg:block">
          <div
            onClick={() => setDropdown(!dropdown)}
            className="transition-ease flex h-fit items-center justify-center rounded border border-shade-medium/40 px-1.5 py-1 text-sm font-bold text-shade-medium hover:cursor-pointer hover:bg-shade-light/50"
          >
            <p className="text-black/80">{`${pageSize}/page`}</p>
            <IoIosArrowDown
              className={`h-5 w-5 text-shade-medium ${
                dropdown ? `rotate-180` : 'rotate-0'
              }`}
            />
          </div>

          <div
            className={`absolute z-10 ${
              !dropdown && 'hidden'
            } bottom-12 right-1 h-fit w-20 space-y-5 rounded border border-shade-light bg-white px-5 py-3 shadow-md`}
          >
            <DropdownWrapper setDropdown={setDropdown}>
              <div className="flex h-fit w-full flex-col space-y-3">
                {rowPerPageCounts.map((data, i) => (
                  <span
                    key={i}
                    onClick={() => applyRowPerPageCount(data.value)}
                    className="nav-link text-center hover:cursor-pointer hover:bg-primary-1"
                  >
                    {data.value}
                  </span>
                ))}
              </div>
            </DropdownWrapper>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center lg:hidden">
        <span className="mx-2 w-fit text-sm font-semibold text-shade-dark">{`${rangeStart} - ${
          rangeStart + pageSize - 1
        } of ${totalCount} items`}</span>
        <div className="relative">
          <div
            data-test-id={DataTestId.APP_PAGINATION_DROPDOWN_BUTTON}
            onClick={() => setDropdown(!dropdown)}
            className="transition-ease flex h-fit items-center justify-center rounded border border-shade-medium/40 px-1.5 py-1 text-sm font-bold text-shade-medium hover:cursor-pointer hover:bg-shade-light/50"
          >
            <p className="text-black/80">{`${pageSize}/page`}</p>
            <IoIosArrowDown
              className={`h-5 w-5 text-shade-medium ${
                dropdown ? `rotate-180` : 'rotate-0'
              }`}
            />
          </div>

          <div
            className={`absolute z-10 ${
              !dropdown && 'hidden'
            } bottom-12 right-1 h-fit w-20 space-y-5 rounded border border-shade-light bg-white px-5 py-3 shadow-md`}
          >
            <DropdownWrapper setDropdown={setDropdown}>
              <div
                data-test-id={DataTestId.APP_PAGINATION_DROPDOWN}
                className="flex w-full flex-col space-y-3"
              >
                {rowPerPageCounts.map((data, i) => (
                  <span
                    key={i}
                    data-test-id={DataTestId.APP_PAGINATION_DROPDOWN + i}
                    onClick={() => applyRowPerPageCount(data.value)}
                    className="nav-link text-center hover:cursor-pointer hover:bg-primary-1"
                  >
                    {data.value}
                  </span>
                ))}
              </div>
            </DropdownWrapper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination