import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';




import { Input } from './Input';
import { TextArea } from './TextArea';


interface Props {
  defaultValues: { [key: string]: string }
  children: JSX.Element
  onSubmit: (data: unknown, reset: () => void) => Promise<void>
  actionButtons?: (isLoading: boolean) => JSX.Element
  className?: string
  schema?: yup.ObjectSchema<{
    [key: string | number]: string | number | undefined
  }>
  data_test_id?: string
}

const Form = ({
  defaultValues,
  children,
  onSubmit,
  className,
  schema,
  actionButtons,
  data_test_id = 'FORM_ELEMENT',
}: Props) => {
  const methods = useForm({
    defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
  })

  const innerChild = (child: any) => {
    return {
      ...child.props,
      key: child.props.name,
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        method="post"
        onSubmit={methods.handleSubmit(data => onSubmit(data, methods.reset))}
        className={className}
        data-test-id={data_test_id}
      >
        {React.Children.map(children, child => {
          return child.props.name
            ? React.createElement(child.type, {
                ...innerChild(child),
              })
            : child
        })}

        {actionButtons && actionButtons(methods.formState.isSubmitting)}
      </form>
    </FormProvider>
  )
}

export { Form, Input, TextArea };

