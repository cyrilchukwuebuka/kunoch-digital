import { useEffect, useMemo, useState } from 'react';



import Alert, { ALERT } from '@/modules/common/components/Alert';





export type AlertStateType = [
  ALERT,
  (state: ALERT) => void,
  () => void,
  () => JSX.Element,
] & {
  state: ALERT
  open: (state: ALERT) => void
  close: () => void
  Alert: () => JSX.Element
}

/**
 *
 * @returns An array like object with `state`, `open`, `close`, and `Alert Component` properties
 *  to allow both object and array destructuring
 *
 * ```
 *  const [state, openAlert, closeAlert, Alert] = useAlert()
 *  // or
 *  const { state, open, close, Alert } = useAlert()
 * ```
 */

const useAlert = (callback?: () => void) => {
  const close = () => {
    callback && callback()
    setState({ ...state, active: false })
  }

  const [state, setState] = useState<ALERT>({
    title: '',
    variant: 'warn',
    onClose: close,
    active: false,
  })

  const open = (state: ALERT) => {
    setState({ ...state, active: true })
  }

  const AlertComp = useMemo(() => () => <Alert alert={state} />, [state])

  useEffect(() => {
    if (state.active) {
      setTimeout(() => {
        close()
      }, 8000)
    }
  }, [state])

  const hookData = [state, open, close, AlertComp] as AlertStateType
  hookData.state = state
  hookData.open = open
  hookData.close = close
  hookData.Alert = AlertComp
  return hookData
}

export default useAlert