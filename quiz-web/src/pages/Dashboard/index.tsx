import CardMenu from '@/components/Card'
import QuizImg from '@/assets/images/quiz.png'
import UserImg from '@/assets/images/user.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/config/redux/store'

export function Dashboard () {
  const { user } = useSelector((store: RootState) => store.auth)

  const menusAdmin = [
    {
      image: UserImg,
      title: 'User',
      desc: 'Manage User',
      href: '/user',
    },
    {
      image: QuizImg,
      title: 'Quiz',
      desc: 'Manage Quiz',
      href: '/quiz',
    },
  ]

  const menusUser = [
    {
      image: QuizImg,
      title: 'Quiz',
      desc: 'Try Quiz',
      href: '/try-quiz',
    },
  ]

  return (
    <div className='d-flex justify-content-center align-items-center gap-4 wrap dashboard-cards'>
      {
        user.role === 'admin'
          ? menusAdmin.map((menu, i) => {
            return <CardMenu data={menu} key={i} />
          })
          : menusUser.map((menu, i) => {
            return <CardMenu data={menu} key={i} />
          })
      }
    </div>
  )
}
