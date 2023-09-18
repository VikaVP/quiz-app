/* eslint-disable jsx-a11y/anchor-is-valid */
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Spin, Empty, Pagination } from 'antd'
import ModalDetail from './ModalDetail'
import ModalEdit from './ModalEdit'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import ButtonQuiz from './Button'
import { setModalDetail, setModalEdit } from '@/config/redux/action/modal'
import { DETAIL_ACTIVE } from '@/config/redux/types'
import { AppDispatch } from '@/config/redux/store'

type Props = {
    columns: any;
    menus: string;
    form?: any;
    data?: any;
    title?: string;
    titleEdit?: string;
    titleDetail?: string;
    loading?: boolean;
    function?: any;
    action?: any;
    customStyle?: any;
    page?: any;
    showPerPage?: any;
    className: string;
};

const Table = (props: Props) => {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(props.showPerPage)
  const [showSelectedPage] = useState([10, 20, 30, 40, 50])
  const [data, setData] = useState<any>(props.data || {})
  const arrAction = props.action
  const dispatch = useDispatch<AppDispatch>()
  const { modalDetail, modalEdit } = useSelector((store: any) => store.modal)

  let pageShowCurr = 1
  if (props.data?.total > 0) {
    pageShowCurr = Math.ceil(props.data?.total / perPage)
  }
  const showModalEdit = useCallback((value: any) => {
    dispatch({ type: DETAIL_ACTIVE, payload: value })
    dispatch(setModalEdit(true))
  }, [modalEdit])

  const showModalDetail = useCallback((value: any) => {
    dispatch({ type: DETAIL_ACTIVE, payload: value })
    dispatch(setModalDetail(true))
  }, [modalDetail])

  const handleDelete = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        props.function.delete(id)
      }
    })
  }

  useEffect(() => {
    setPerPage(props.showPerPage)
  }, [props.showPerPage])

  return (
    <div className={props.className}>
      {!props.loading
        ? (
          <>
            {props.data?.data?.length > 0
              ? (
                <>
                  <div className='table-responsive'>
                    <table className='table table-rounded table-striped border align-middle mt-4'>
                      <thead>
                        <tr className='text-muted'>
                          {props.columns.map((column: any, index: number) => (
                            <th
                              style={props.customStyle ? { ...props.customStyle } : { paddingLeft: '0.75rem' }}
                              key={index}
                            >
                              {column.Header}
                            </th>
                          ))}
                          {
                            props.action !== false &&
                              <th className='text-center ' style={{ minWidth: '140px', width: '180px' }}>Actions</th>
                          }
                        </tr>
                      </thead>
                      <tbody className='mx-4'>
                        {(props.data?.data).map((item: any, idx: any) => {
                          return (
                            <tr key={idx}>
                              {props.columns.map((col: any, i: number) => {
                                return (
                                  <td style={{ paddingLeft: '0.75rem' }} key={i}>
                                    {col.accessor === 'error_message'
                                      ? <p
                                          dangerouslySetInnerHTML={{ __html: item[col.accessor] || '-' }}
                                        />
                                      : <p className='text-dark  d-block mb-1 fs-6'>
                                        {item[col.accessor] || '-'}
                                        </p>}
                                  </td>
                                )
                              })}
                              <td className='text-center'>
                                {arrAction.map(
                                  (placement: any) => (
                                    <OverlayTrigger
                                      key={placement}
                                      placement='top'
                                      overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                          <strong>{placement}</strong>.
                                        </Tooltip>
                                      }
                                    >
                                      {placement === 'Details'
                                        ? (
                                          <ButtonQuiz
                                            click={() => showModalDetail(item)} classBg='btn btn-icon btn-light-primary btn-sm me-1' icon={<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                              <path opacity='0.3' d='M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22Z' fill='blue' />
                                              <path d='M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z' fill='blue' />
                                            </svg>}
                                          />
                                          )
                                        : (placement === 'Edit'
                                            ? (
                                              <ButtonQuiz
                                                click={() => showModalEdit(item)} classBg='btn btn-icon btn-light-warning btn-sm me-1' icon={<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                  <path opacity='0.3' d='M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z' fill='orange' />
                                                  <path d='M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z' fill='orange' />
                                                </svg>}
                                              />
                                              )
                                            : <ButtonQuiz
                                                click={() => handleDelete(item.id)} classBg='btn btn-icon btn-light-danger btn-sm me-1' icon={<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                  <path d='M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z' fill='red' />
                                                  <path opacity='0.5' d='M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z' fill='red' />
                                                  <path opacity='0.5' d='M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z' fill='red' />
                                                </svg>}
                                              />
                                          )}
                                    </OverlayTrigger>
                                  ),
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className='d-flex align-items-center justify-content-between mt-4 pagiantion-wrapper'>
                    <div>
                      <select
                        value={perPage}
                        className='form-select rounded w-10'
                        data-testid='selectSize'
                        onChange={
                          (e) => props.function.changePerPage(Number(e.target.value))
                        }
                        color='primary'
                      >
                        {showSelectedPage.map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='d-flex align-items-center justify-content-end'>
                      <p
                        style={{
                          marginBottom: 0,
                        }}
                      >{`Showing page ${page} of ${pageShowCurr}`}
                      </p>
                      <Pagination
                        current={props.page}
                        className='pagination'
                        pageSize={perPage}
                        total={props.data?.total}
                        showSizeChanger={false}
                        onChange={
                          (page, pageSize) => props.function.changePage(page, pageSize)
                        }
                      />
                    </div>
                  </div>

                </>
                )
              : (
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
                    <Empty />
                  </div>
                </div>
                )}
          </>
          )
        : (
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
          )}

      <ModalDetail title={props.titleDetail} form={props.form} />
      <ModalEdit form={props.form} title={props.titleEdit} functions={{ update: props.function.update }} menus={props.menus} />
    </div>
  )
}

export default Table
