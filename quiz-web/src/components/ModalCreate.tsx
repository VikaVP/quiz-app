import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import ButtonQuiz from './Button'
import { setModalCreate } from '@/config/redux/action/modal'
import { AppDispatch } from '@/config/redux/store'
import Select from 'react-select'

interface ModalCreateProps {
  form?: any;
  title?: string;
  functions: any;
  menus: string;
}

function ModalCreate (props: ModalCreateProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { modalCreate } = useSelector((store: any) => store.modal)
  const [formStructure, setFormStructure] = useState<any>(props.form || [])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<any>({})
  const [error, setError] = useState<any>({})
  const [disabledButton, setDisabledButton] = useState<boolean>(true)

  async function saveData () {
    props.functions.create(value)
  }

  const hideModal = useCallback(() => {
    dispatch(setModalCreate(false))
  }, [modalCreate])

  const handleSetVal = (col: any, val: any) => {
    setValue({
      ...value,
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
    } else if (col === 'password') {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(val)) {
        setError({
          ...error,
          err_password: 'Your password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.!',
        })
      } else {
        setError({
          ...error,
          err_password: '',
        })
      }
    } else {
      if (val === '') {
        setError({
          ...error,
          ['err_' + col]: 'Required!',
        })
      } else {
        setError({
          ...error,
          ['err_' + col]: '',
        })
      }
    }
  }

  const checkValidation = () => {
    if (document.forms[0]) {
      const input: any = document.forms[0].getElementsByTagName('input')
      const textarea: any = document.forms[0].getElementsByTagName('textarea')
      let errNum = 0
      for (const inp of input) {
        if (!inp.role) {
          inp.value && inp.value !== '' ? errNum += 0 : errNum += 1
        }
      };

      if (props.menus === 'quiz') {
        value.correct_answer && value.correct_answer !== '' ? errNum += 0 : errNum += 1
      };

      for (const inp of textarea) {
        inp.value && inp.value !== '' ? errNum += 0 : errNum += 1
      };

      error && Object.keys(error).map((err: any, i: number) => {
        err !== '' ? errNum += 0 : errNum += 1
      })

      if (errNum === 0) {
        setDisabledButton(false)
      } else {
        setDisabledButton(true)
      };
    };
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (modalCreate === true) {
        checkValidation()
      }
    }, 30)

    return () => clearTimeout(timer)
  }, [handleSetVal])

  return (
    <Modal
      show={modalCreate}
      onHide={hideModal}
    >
      <Modal.Header className='modal-header' closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      {loading ? (
        <div
          className='d-flex'
          style={{
            height: '300px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <Spin />
          </div>
        </div>
      ) : (
        <>
          <Modal.Body className='modal-body'>
            <form>
              <>
                {formStructure.map((form: any, i: number) => {
                // eslint-disable-next-line no-lone-blocks, @typescript-eslint/no-unused-expressions
                  { return (
                    <div className='mb-10' key={i}>
                      <label className='form-label'>{form.label}</label>
                      {form.type === 'input'
                        ? <input
                            type={form.number ? 'number' : 'text'}
                            className='form-control'
                            placeholder={`Entry ${form.label}`}
                            value={(value[form.setVal] || '')}
                            onChange={(e) => handleSetVal(form.setVal, e.target.value)}
                            disabled={form.disabled}
                          />
                        : (form.type === 'textarea'
                            ? <textarea
                                className='form-control'
                                placeholder={`Choose ${form.label}`}
                                value={value[form.setVal] || ''}
                                onChange={(e) => handleSetVal(form.setVal, e.target.value)}
                                disabled={form.disabled}
                                rows={4}
                              />
                            : (form.type === 'select'
                                ? <Select
                                    placeholder={`Choose ${form.label}`}
                                    options={form.dataOption}
                                    onChange={(e: any) =>
                                      handleSetVal(form.setVal, e)}
                                    isDisabled={form.disabled}
                                  />
                                : <></>))}

                      <p style={{ color: 'red', marginBottom: 0 }}>
                        {error['err_' + form.setVal]}
                      </p>
                    </div>
                  )
                  }
                })}
              </>
            </form>
          </Modal.Body>
          <Modal.Footer className='modal-footer'>
            <ButtonQuiz
              click={() => {
                dispatch(setModalCreate(false))
              }} classBg='btn btn-secondary' text='Close'
            />
            <ButtonQuiz
              click={() => {
                saveData()
              }} classBg='btn btn-primary' disabled={disabledButton} text='Submit'
            />
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}

export default ModalCreate
