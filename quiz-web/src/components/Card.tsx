import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

interface CardMenuInterface {
    data : DataCard
};

interface DataCard {
    image: any
    title: string
    desc: string
    href: string
}

function CardMenu (props: CardMenuInterface) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={props.data.image} style={{ objectFit: 'cover', height: '150px' }} />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text>
          {props.data.desc}
        </Card.Text>
        <Button variant='primary' onClick={() => window.location.href = props.data.href}>Explore</Button>
      </Card.Body>
    </Card>
  )
}

export default CardMenu
