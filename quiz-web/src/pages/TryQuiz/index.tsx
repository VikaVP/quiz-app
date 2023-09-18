import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonQuiz from '../../components/Button'
import { useQuery } from '@tanstack/react-query'
import { AppDispatch } from '@/config/redux/store'
import { getTimerQuiz, getTryQuiz } from '@/config/redux/action/quiz'
import BreadcrumbQuiz from '@/components/Breadcumb'
import CardQuiz from '@/components/CardQuiz'
import { countDown } from '@/utils/countdown'
import Badge from 'react-bootstrap/Badge'

const TryQuiz: React.FC = (props: any) => {
  const [timer, setTimer] = useState<number>(15)
  const [start, setStart] = useState<boolean>(false)
  const [isOver, setIsOver] = useState<boolean>(false)
  const [time, setTime] = useState<any>('')
  const [count, setCount] = useState<any>('')
  const dispatch = useDispatch<AppDispatch>()

  const { index, data, loading } = useSelector((store: any) => store.quiz)
  const { score } = useSelector((store: any) => store.tryQuiz)

  let countTime: any

  const timerQuery = useQuery(
    ['timer'],
    () => {
      return getTimerQuiz()
    },
  )

  useEffect(() => {
    if (timerQuery.data) {
      setTimer(timerQuery.data.data.data[0].time)
    }
  }, [timerQuery.data, timerQuery.isLoading])

  useEffect(() => {
    const subscribe = setTimeout(() => {
      dispatch(getTryQuiz())
    }, 50);

    () => clearTimeout(subscribe)
  }, [])

  useEffect(() => {
    if (start) {
      countTime = setInterval(() => {
        const timeCountdown = countDown(time)
        setCount(timeCountdown)
        timeCountdown === '0' && (clearInterval(countTime), setCount(''), setIsOver(true))
      }, 1000)
    }
  }, [start])

  const startQuiz = () => {
    const set = timer * 60 * 1000
    const endTime = new Date(new Date().getTime() + set)
    setTime(endTime)
    setStart(true)
  }

  const generateQuiz = (start: boolean, datas: any, i: number) => {
    if (start) {
      if (datas?.data && datas.data?.[i] && !isOver) {
        return <CardQuiz data={datas.data[i]} />
      } else {
        clearInterval(countTime)
        return <p>Score: {score}</p>
      }
    }
  }

  return (
    <>
      <div className='card table-wrapper'>
        <BreadcrumbQuiz title='Try Quiz' />
        <h2 className='py-3 ms-3'>Try Quiz</h2>
        <div className='card-body py-3'>
          {
                start && <h2><Badge bg='secondary'>{count}</Badge></h2>
              }
          <div className='d-flex justify-content-center mb-5'>
            <div className='d-flex justify-content-center align-items-center'>
              <ButtonQuiz click={() => startQuiz()} classBg={`btn btn-success ${start && 'd-none'}`} text='Start' disabled={loading} />
              {
                    generateQuiz(start, data, index)
                  }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TryQuiz
