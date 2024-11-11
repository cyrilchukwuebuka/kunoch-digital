import { useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from 'usehooks-ts'

import { AUTH_VIEW, useAuthContext } from '@/lib/contexts/auth-context'
import { Auth_Methods } from '@/lib/data/constants/authentication'

import LoginStep2 from './LoginStep2'

const Login = () => {
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
            className="transition-ease flex justify-start space-x-5 rounded-md border border-shade-light py-3 pl-10 hover:cursor-pointer hover:bg-shade-light/50"
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
            <p className="font-semibold">{`Continue with ${method.type}`}</p>
          </button>
        ))}
      </section>

      {activateStep2 && <LoginStep2 />}

      <section className="flex h-fit flex-col space-y-2 whitespace-pre border-t-2 border-t-shade-light/40 pt-4 text-center text-sm">
        <div className="h-fitwhitespace-pre text-center text-sm">
          {`Don't have an account? `}
          <button
            onClick={() => authView[1](AUTH_VIEW.REGISTER)}
            className="font-bold text-primary-6 hover:cursor-pointer"
          >
            Sign up
          </button>
        </div>
        <button
          onClick={() => authView[1](AUTH_VIEW.FORGOT_PASSWORD)}
          className="h-fit whitespace-pre text-center text-sm font-bold text-primary-6 hover:cursor-pointer"
        >
          Forgot password?
        </button>
      </section>
    </div>
  )
}

export default Login
