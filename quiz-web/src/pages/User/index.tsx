import Table from '../../components/Table'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ModalCreate from '../../components/ModalCreate'
import { useDispatch, useSelector } from 'react-redux'
import ButtonQuiz from '../../components/Button'
import { useQuery } from '@tanstack/react-query'
import { setModalCreate, setModalEdit } from '@/config/redux/action/modal'
import { AppDispatch } from '@/config/redux/store'
import { createUser, deleteUser, getDataUser, setPerPageUserList, updateUser } from '@/config/redux/action/user'
import BreadcrumbQuiz from '@/components/Breadcumb'

const User: React.FC = (props: any) => {
  const [datas, setDatas] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const [afterChanged, setAfterChanged] = useState<number>(0)
  const [columns] = useState([
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'username',
      accessor: 'username',
    },
  ])
  const [menu] = useState('user')
  const dispatch = useDispatch<AppDispatch>()

  const roleOption = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ]

  const forms = [
    { label: 'Email', type: 'input', dataOption: null, setVal: 'email', disabled: false },
    { label: 'Username', type: 'input', dataOption: null, setVal: 'username', disabled: false },
    { label: 'Password', type: 'input', dataOption: null, setVal: 'password', disabled: false },
    { label: 'Role', type: 'select', dataOption: roleOption, setVal: 'role', disabled: false },
  ]

  const { showPerPage } = useSelector((store: any) => store.user)
  const { modalCreate } = useSelector((store: any) => store.modal)

  const { data, isLoading } = useQuery(
    ['list User', showPerPage, page, afterChanged],
    () => {
      return getDataUser(showPerPage, page)
    },
  )

  useEffect(() => {
    if (data) {
      setDatas(data.data)
    }
  }, [data, isLoading])

  const showModalCreate = useCallback(() => {
    dispatch(setModalCreate(true))
  }, [modalCreate])

  const changePage = (page: any, pageSize: any) => {
    setPage(page)
    setPerPage(pageSize)
  }

  const changePerPage = (perPage: any) => {
    dispatch(setPerPageUserList(perPage))
  }

  const create = async (dataAccept: any) => {
    const data = {
      email: dataAccept.email,
      password: dataAccept.password,
      username: dataAccept.username,
      role: dataAccept.role?.value || 'user',
    }
    try {
      const submitted: any = await createUser(data)
      handleResponseSave(submitted, 'Successfully submitted!')
      dispatch(setModalCreate(false))
    } catch (error) {
      handleResponseSaveError(error)
    }
  }

  const update = async (dataAccept: any) => {
    try {
      const submitted: any = await updateUser(dataAccept)
      handleResponseSave(submitted, 'Successfully update user!')
      dispatch(setModalEdit(false))
    } catch (error) {
      handleResponseSaveError(error)
    }
  }

  const handleDelete = useCallback(async (id: number) => {
    try {
      const submitted: any = await deleteUser(id)
      handleResponseSave(submitted, 'Successfully delete user!')
      setPage(1)
    } catch (error) {
      handleResponseSaveError(error)
    }
  }, [])

  const handleResponseSave = (data: any, messageSuccess: string) => {
    if (data.status === 200) {
      toast.success(
        messageSuccess,
        { theme: 'colored' },
      )
      setAfterChanged(afterChanged + 1)
    } else {
      toast(<p
        dangerouslySetInnerHTML={{ __html: 'Terdapat data yang salah, silahkan periksa kembali' }}
            />, { type: 'error' })
    }
  }

  const handleResponseSaveError = (err: any) => {
    console.log(err)
    toast.error(
      'Terjadi Kesalahan! Mohon mencoba kembali',
      { theme: 'colored' },
    )
  }

  return (
    <>
      <div className='card table-wrapper'>
        <BreadcrumbQuiz title='User' />
        <h2 className='py-3 ms-3'>User</h2>
        <div className='card-body py-3'>
          <div className='d-flex justify-content-between'>
            <div className='d-flex justify-content-end align-items-center'>
              <ButtonQuiz
                click={() => showModalCreate()} classBg='btn btn-info' icon={<svg width='24' height='24' viewBox='0 0 24 24' fill='#fff' xmlns='http://www.w3.org/2000/svg'>
                  <path opacity='0.3' d='M11 13H7C6.4 13 6 12.6 6 12C6 11.4 6.4 11 7 11H11V13ZM17 11H13V13H17C17.6 13 18 12.6 18 12C18 11.4 17.6 11 17 11Z' fill='blue' />
                  <path d='M21 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H21C21.6 2 22 2.4 22 3V21C22 21.6 21.6 22 21 22ZM17 11H13V7C13 6.4 12.6 6 12 6C11.4 6 11 6.4 11 7V11H7C6.4 11 6 11.4 6 12C6 12.6 6.4 13 7 13H11V17C11 17.6 11.4 18 12 18C12.6 18 13 17.6 13 17V13H17C17.6 13 18 12.6 18 12C18 11.4 17.6 11 17 11Z' fill='white' />
                </svg>} text='Create'
              />
            </div>
          </div>
          <Table className='mb-5 mb-xl-8' columns={columns} menus={menu} form={forms} data={datas} titleEdit='Update User' titleDetail='Detail User' function={{ changePage, changePerPage, update, delete: handleDelete }} loading={isLoading} page={page} showPerPage={showPerPage} action={['Details', 'Edit', 'Delete']} />
        </div>
      </div>
      <ModalCreate title='Create User' form={forms} functions={{ create }} menus={menu} />
    </>
  )
}

export default User
