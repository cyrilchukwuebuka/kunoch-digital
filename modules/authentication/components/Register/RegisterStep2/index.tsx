'use client'

import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { UserType } from '@/generated/graphql'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as yup from 'yup'

import { useAuthContext } from '@/lib/contexts/auth-context'
import { DataTestId } from '@/lib/data/constants/data-test-id'
import useAlert from '@/lib/hooks/use-alert'
import useGlobalStore from '@/lib/store/global-store'
import { Route } from '@/lib/utils/config/routes'
import DateTime from '@/lib/utils/helper/date-time'
import Spinner from '@/modules/common/components/ui/spinner'
import { DateInput, Form, Input } from '@/modules/form'

enum FieldsName {
  FIRST_NAME = 'first_name',
  LAST_NAME = 'last_name',
  EMAIL = 'signup_email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
  BIRTH_DATE = 'birth_date',
}

interface InputFields {
  first_name: string
  last_name: string
  birth_date: string
  signup_email: string
  password: string
  confirm_password: string
}

const ValidationSchema = yup
  .object({
    first_name: yup.string().required('Please provide your first name'),
    last_name: yup.string().required('Please provide your last name'),
    birth_date: yup.string().required('Please enter your birth date'),
    signup_email: yup
      .string()
      .email('Please enter a valid email address')
      .matches(/@[^.]*\./)
      .required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    // .min(8, 'Password is too short - should be 8 chars minimum.')
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   'Must contain 8 characters, one uppercase, one lowercase, one number and one special case character',
    // ),
    confirm_password: yup
      .string()
      .required('No password provided')
      // .min(8, 'Password is too short - should be 8 chars minimum.')
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   'Must contain 8 characters, One uppercase, One lowercase, one number and one special case character',
      // )
      .oneOf([yup.ref('password')], 'Password does not match'),
  })
  .required()

const RegisterStep2 = memo(function () {
  const { register } = useAuthContext()
  const updateActiveUser = useGlobalStore(state => state.updateActiveUser)
  const [checked, setChecked] = useState(true)
  const [error, setError] = useState('')
  const { state, open, close, Alert } = useAlert(() => setError(''))
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState(true)
  const checkboxRef = useRef<HTMLInputElement | null>(null)

  const defaultValues = useMemo(() => {
    return {
      [FieldsName.BIRTH_DATE]: '',
      [FieldsName.CONFIRM_PASSWORD]: '',
      [FieldsName.EMAIL]: '',
      [FieldsName.FIRST_NAME]: '',
      [FieldsName.LAST_NAME]: '',
      [FieldsName.PASSWORD]: '',
    }
  }, [])

  const onSubmit = async (_data: InputFields, reset: () => void) => {
    if (!checkboxRef.current || !checkboxRef.current.checked) {
      setChecked(false)
      return
    }

    await register(
      {
        dob: DateTime.formatDate(new Date(_data.birth_date)),
        email: _data.signup_email,
        firstname: _data.first_name,
        lastname: _data.last_name,
        password: _data.password,
        userType: UserType.User,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locale: navigator.language,
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
              <p>Save</p> {isLoading && <Spinner color="white" />}
            </button>
          </div>
        )}
        schema={ValidationSchema}
        data_test_id={DataTestId.FORM_ELEMENT}
      >
        <div className="flex flex-col space-y-3">
          <section className="flex h-fit flex-col space-y-2">
            <div className="grid h-fit grid-cols-2 gap-5">
              <Input
                name={FieldsName.FIRST_NAME}
                placeholder="Enter your first name"
                id={FieldsName.FIRST_NAME}
                data-test-id={DataTestId.INPUT}
                className="bg-white"
              />
              <Input
                name={FieldsName.LAST_NAME}
                placeholder="Enter your last name"
                id={FieldsName.LAST_NAME}
                data-test-id={DataTestId.INPUT_2}
                className="bg-white"
              />
            </div>
            <p className="text-sm font-semibold text-shade-medium">
              Ensure your first and last names match the name on your driver
              license{' '}
            </p>
          </section>
          <DateInput
            name={FieldsName.BIRTH_DATE}
            placeholder="Date of Birth - DD/MM/YYYY"
            id={FieldsName.BIRTH_DATE}
            data-test-id={DataTestId.DATE_INPUT}
            // onIconClick={focusDateInput}
            // onBlur={onBlurDateInput}
          />
          <Input
            name={FieldsName.EMAIL}
            type={'email'}
            placeholder="Enter your email"
            id={FieldsName.EMAIL}
            data-test-id={DataTestId.INPUT_3}
            className="bg-white"
          />
          <div className="relative">
            <Input
              name={FieldsName.PASSWORD}
              id={FieldsName.PASSWORD}
              type={hiddenPassword ? 'password' : 'text'}
              placeholder="Enter password"
              data-test-id={DataTestId.INPUT_4}
            />
            <span
              onClick={() => setHiddenPassword(!hiddenPassword)}
              className="absolute right-0 top-3 flex w-fit items-center pr-5"
            >
              {hiddenPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-shade-medium" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-shade-medium" />
              )}
            </span>
          </div>
          <div className="relative">
            <Input
              name={FieldsName.CONFIRM_PASSWORD}
              id={FieldsName.CONFIRM_PASSWORD}
              type={confirmPassword ? 'password' : 'text'}
              placeholder="Re-enter password"
              data-test-id={DataTestId.INPUT_5}
            />
            <span
              onClick={() => setConfirmPassword(!confirmPassword)}
              className="absolute right-0 top-3 flex w-fit items-center pr-5"
            >
              {confirmPassword ? (
                <AiOutlineEyeInvisible className="h-5 w-5 text-shade-medium" />
              ) : (
                <AiOutlineEye className="h-5 w-5 text-shade-medium" />
              )}
            </span>
          </div>
          <section className="flex items-center space-x-3">
            <span
              className={`flex h-5 w-5 items-center justify-center overflow-hidden rounded ${
                !checked ? 'border border-red-600' : ''
              }`}
            >
              <input
                ref={checkboxRef}
                className="input-outline-none h-full w-full text-primary-6 hover:cursor-pointer"
                type="checkbox"
              data-test-id={DataTestId.INPUT_CHECKBOX}
              />
            </span>

            <p className="text-sm font-semibold tracking-tight">
              By creating an account, you agree to Ije’s{' '}
              <Link
                href={Route.TERMS_OF_SERVICE_ROUTE}
                className="nav-link text-primary-6"
              >
                terms and conditions
              </Link>
            </p>
          </section>
        </div>
      </Form>

      <span className="fixed right-3 top-3 z-30">
        <Alert />
      </span>
    </div>
  )
})

export default RegisterStep2
