import { RootState } from '@/config/redux/store'
import { Button } from 'antd'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector } from 'react-redux'

function NavbarQuiz () {
  const { user } = useSelector((store: RootState) => store.auth)
  return (
    <Navbar expand='lg' className={`bg-body-tertiary ${!user && 'd-none'}`}>
      <Container>
        <Navbar.Brand href='/'>Quiz App</Navbar.Brand>
        <Button onClick={() => (localStorage.clear(), window.location.href = '/')}>Logout</Button>
      </Container>
    </Navbar>
  )
}

export default NavbarQuiz
