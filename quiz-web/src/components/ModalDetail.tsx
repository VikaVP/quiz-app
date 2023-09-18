import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import { setModalDetail } from '@/config/redux/action/modal'
import { AppDispatch } from '@/config/redux/store'

function ModalDetailComp (props: any) {
  const dispatch = useDispatch<AppDispatch>()
  const { modalDetail, detailCurrent } = useSelector((store: any) => store.modal)
  const [data, setData] = React.useState<any>({})

  const hideModal = useCallback(() => {
    dispatch(setModalDetail(false))
  }, [modalDetail])

  useEffect(() => {
    setData(detailData(detailCurrent))
  }, [detailCurrent])

  function detailData (data: any) {
    const spreadData: any = []
    for (const i of Object.keys(data)) {
      spreadData[i] = data[i]
    }
    return spreadData
  }

  return (
    <>
      <Modal
        show={modalDetail}
        onHide={hideModal}
        size='lg'
      >
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          {(data && modalDetail
            ? props.form.map((field: any, s: number) => {
              return (
                <div className='mb-4' key={s}>
                  <label className='modal-title h5'>{field.label}</label>
                  <p style={{ marginBottom: 0 }}>
                    {data[field.setVal] || '-'}
                  </p>
                </div>
              )
            })
            : <></>)}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalDetailComp
