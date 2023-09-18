import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import ButtonQuiz from './Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/config/redux/store'
import { setQuizIndex } from '@/config/redux/action/quiz'
import { getAnswer } from '@/config/redux/action/tryQuiz'

function CardQuiz (props: any) {
  const [value, setValue] = useState<string>('')
  const dispatch = useDispatch<AppDispatch>()
  const { index } = useSelector((store: any) => store.quiz)
  const { loadingAnswer } = useSelector((store: any) => store.tryQuiz)

  const handleChange = (val: string) => {
    setValue(val)
  }

  const submit = () => {
    dispatch(getAnswer(props.data.id, value))
    dispatch(setQuizIndex(index + 1))
  }

  return (
    <Card className='card-quiz'>
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.question}
        </Card.Text>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        {
            Array(4).fill('').map((v: number, i: number) => {
              return (
                <ListGroup.Item key={i}>
                  <Form.Check
                    inline
                    label={props.data['option_' + (i + 1)]}
                    value={'option_' + (i + 1)}
                    name={index}
                    type='radio'
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </ListGroup.Item>
              )
            })
        }
      </ListGroup>
      <Card.Body>
        <ButtonQuiz click={() => submit()} classBg='btn btn-success' text='Submit' disabled={loadingAnswer} />
      </Card.Body>
    </Card>
  )
}

export default CardQuiz
