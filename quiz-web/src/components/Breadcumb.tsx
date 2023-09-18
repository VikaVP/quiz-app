import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { useNavigate } from 'react-router-dom'

function BreadcrumbQuiz (props: any) {
  const history = useNavigate()
  return (
    <Breadcrumb className='pt-3 ms-3'>
      <Breadcrumb.Item onClick={() => history('/')}>Home</Breadcrumb.Item>
      <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default BreadcrumbQuiz
