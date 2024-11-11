import { ReactNode } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import FloatingScrollToTop from '@/modules/layout/components/FloatingScrollToTop'
import Footer from '@/modules/layout/templates/Footer'
import Navbar from '@/modules/layout/templates/Navbar'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="relative font-normal selection:bg-orange-300">
      <Navbar />
      <section className="relative mx-auto text-gray-800">
        {children}
        <aside className="transition-ease fixed bottom-10 right-4 z-40 flex h-fit w-fit flex-col space-y-4 md:right-10">
          <FloatingScrollToTop />
          {/* <Salesiq widgetCode={widgetCode} domain={domain} /> */}
        </aside>
      </section>
      <Footer />
    </main>
  )
}

export default Layout
