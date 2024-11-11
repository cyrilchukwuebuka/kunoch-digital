import Image from 'next/image'
import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { AUTH_VIEW, useAuthContext } from '@/lib/contexts/auth-context'
import { Auth_Methods } from '@/lib/data/constants/authentication'

import RegisterStep2 from './RegisterStep2'

const Register = () => {
  const { authView } = useAuthContext()
  const [activateStep2, setActivateStep2] = useState(false)
  const minWidth768 = useMediaQuery('(min-width: 768px)')

  const proceedToNextStep = () => {
    setActivateStep2(true)
    // authView[1](AUTH_VIEW.LOGIN)
  }

  return (
    <div className="flex h-fit w-full flex-col space-y-6">
      <section
        className={`h-fit w-[95%] md:w-[90%] ${
          activateStep2 ? 'hidden' : 'flex'
        } mx-auto flex-col space-y-2 text-shade-dark`}
      >
        {Auth_Methods.map(method => (
          <button
            key={method.id}
            onClick={() => method.type === 'Email' && proceedToNextStep()}
            data-test-id={method.test_id}
            className="transition-ease flex justify-start space-x-5 rounded-md border border-shade-light py-3 pl-12 hover:cursor-pointer hover:bg-shade-light/50"
          >
            <span className="relative h-6 w-6">
              <Image
                src={method.svg}
                alt={method.alt}
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </span>
            <p className="text-base font-semibold">{`Sign up with ${method.type}`}</p>
          </button>
        ))}
      </section>

      {activateStep2 && <RegisterStep2 />}

      <section className="h-fit whitespace-pre border-t-2 border-t-shade-light/40 pt-4 text-center text-sm">
        Already have an account?{' '}
        <button
          onClick={() => authView[1](AUTH_VIEW.LOGIN)}
          className="font-bold text-primary-6 hover:cursor-pointer"
        >
          Login
        </button>
      </section>
    </div>
  )
}

export default Register
