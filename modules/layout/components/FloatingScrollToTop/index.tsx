'use client'

import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

const FloatingScrollToTop = () => {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowScrollTopBtn(true)
    } else {
      setShowScrollTopBtn(false)
    }
  }

  const scrollTop = () => {
    window.scroll(0, 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return showScrollTopBtn ? (
    <div
      onClick={scrollTop}
      className="hover:cursor-pointer transition-ease hover:scale-110 h-14 w-14 bg-white rounded-full shadow-md flex items-center justify-center"
    >
      <IoIosArrowUp className="text-primary-6" size={27} />
    </div>
  ) : (
    <></>
  )
}

export default FloatingScrollToTop
