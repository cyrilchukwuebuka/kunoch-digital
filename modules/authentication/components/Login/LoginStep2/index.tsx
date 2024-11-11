'use client'

import { memo, useEffect, useMemo, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as yup from 'yup'

import { useAuthContext } from '@/lib/contexts/auth-context'
import { DataTestId } from '@/lib/data/constants/data-test-id'
import useAlert from '@/lib/hooks/use-alert'
import Spinner from '@/modules/common/components/ui/spinner'
import { Form, Input } from '@/modules/form'

enum FieldsName {
  EMAIL = 'email',
  PASSWORD = 'password',
}

interface InputFields {
  email: string
  password: string
}

const ValidationSchema = yup
  .object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .matches(/@[^.]*\./)
      .required('Please enter your email'),
    password: yup.string().required('No password provided'),
  })
  .required()

const RegisterStep2 = memo(function () {
  const { login } = useAuthContext()
  const [error, setError] = useState('')
  const { state, open, close, Alert } = useAlert(() => setError(''))
  const [hiddenPassword, setHiddenPassword] = useState(true)

  const defaultValues = useMemo(() => {
    return {
      [FieldsName.EMAIL]: '',
      [FieldsName.PASSWORD]: '',
    }
  }, [])

  const onSubmit = async (_data: InputFields, reset: () => void) => {
    await login(
      {
        email: _data.email,
        password: _data.password,
      },
      'EMAIL/PASSWORD',
    )
  }

  useEffect(() => {
    if (error) {
      open({
        ...state,
        title: error,
        active: true,
        variant: 'error',
      })
    }
  }, [error])

  return (
    <div className="relative flex flex-col space-y-5 px-3">
      <Form
        onSubmit={(data, reset) => onSubmit(data as InputFields, reset)}
        defaultValues={defaultValues}
        actionButtons={(isLoading: boolean) => (
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              data-test-id={DataTestId.BUTTON_SUBMIT}
              className={`button flex w-full items-center justify-center space-x-2 px-4 py-2 text-lg`}
            >
              <p>Log in</p> {isLoading && <Spinner color="white" />}
            </button>
          </div>
        )}
        schema={ValidationSchema}
        data-test-id={DataTestId.FORM_ELEMENT}
      >
        <div className="flex flex-col space-y-3">
        <Input
            name={FieldsName.EMAIL}
            type={'email'}
            placeholder="Enter your email"
            id={FieldsName.EMAIL}
            data-test-id={DataTestId.INPUT}
            className="bg-white"
          />
          <div className="relative">
            <Input
              name={FieldsName.PASSWORD}
              id={FieldsName.PASSWORD}
              type={hiddenPassword ? 'password' : 'text'}
              placeholder="Enter password"
              data-test-id={DataTestId.INPUT_2}
            />
            <span
              onClick={() => setHiddenPassword(!hiddenPassword)}
              className="absolute right-0 top-3 flex w-fit items-center pr-5"
            >
              {hiddenPassword ? (
                <AiOutlineEyeInvisible className="size-5 text-shade-medium" />
              ) : (
                <AiOutlineEye className="size-5 text-shade-medium" />
              )}
            </span>
          </div>
        </div>
      </Form>

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </div>
  )
})

export default RegisterStep2
