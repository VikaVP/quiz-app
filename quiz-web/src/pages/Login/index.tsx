import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../config/redux/store'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { loginAccount, setUser } from '@/config/redux/action/auth'

type FormLogin = {
    password: string
    email: string
}

type ErrorFormLogin = {
    err_password: string
    err_email: string
}

export function Login () {
  const dispatch = useDispatch<AppDispatch>()
  const { is_loading_login } = useSelector((store: RootState) => store.auth)
  const [form, setForm] = useState<FormLogin>({
    password: '',
    email: '',
  })
  const [error, setError] = useState<ErrorFormLogin>({
    err_password: '',
    err_email: '',
  })
  const [disabledButton, setDisabledButton] = useState<boolean>(true)

  const login = async (e: any) => {
    e.preventDefault()
    const { password, email } = form

    if (!email && !password) {
      toast.error('You must fill all fields', {
        theme: 'colored',
      })
    }
    if (!email) {
      toast.error('You must fill email!', { theme: 'colored' })
    }
    if (!password) {
      toast.error('You must fill password!', { theme: 'colored' })
    }
    if (email && password) {
      await dispatch(loginAccount(email, password))
    }
  }

  const handleSetVal = (col: any, val: any) => {
    setForm({
      ...form,
      [col]: val,
    })
    if (col === 'email') {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(val)) {
        setError({
          ...error,
          err_email: 'Email invalid!',
        })
      } else {
        setError({
          ...error,
          err_email: '',
        })
      }
    } else {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val)) {
        setError({
          ...error,
          err_password: 'Password invalid!',
        })
      } else {
        setError({
          ...error,
          err_password: '',
        })
      }
    }
  }

  const checkValidation = () => {
    if (document.forms[0]) {
      const input: any = document.forms[0].getElementsByTagName('input')
      let errNum = 0
      for (const inp of input) {
        if (!inp.role) {
          inp.value && inp.value !== '' ? errNum += 0 : errNum += 1
        }
      };

      (error.err_email || error.err_password) && (errNum += 1)

      if (errNum === 0) {
        setDisabledButton(false)
      } else {
        setDisabledButton(true)
      };
    };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      checkValidation()
    }, 30)

    return () => clearTimeout(timer)
  }, [handleSetVal])

  return (
    <div
      className='modal show login'
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email' placeholder='name@example.com'
              id='email'
              autoComplete='off'
              onChange={(e) => handleSetVal('email', e.target.value)}
            />
            <small className='text-danger mb-2 d-block'>{error.err_email}</small>

            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              id='password'
              aria-describedby='passwordHelpBlock'
              autoComplete='off'
              onChange={(e) => handleSetVal('password', e.target.value)}
            />
            <small className='text-danger mb-2 d-block'>{error.err_password}</small>
            <Form.Text id='passwordHelpBlock' muted>
              Your password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.
            </Form.Text>
          </form>
          <div className='mb-2 mt-3'>
            Doesn't have any account ?
            <Link
              to='/register'
              className='link-primary fs-6 fw-bolder'
              style={{ marginLeft: '5px' }}
            >
              Register
            </Link>
          </div>
          <Button variant='primary' className='mb-4 mt-4' disabled={disabledButton || is_loading_login} onClick={(e) => login(e)}>Login</Button>
        </Modal.Body>

      </Modal.Dialog>
    </div>
  )
}
