import React from 'react'
import { Button, Card, Icon } from 'semantic-ui-react'

const extra = (
  <a>
    <Button animated='vertical'>
      <Button.Content hidden> <Icon name='shop' /></Button.Content>
      <Button.Content visible>
       Agregar a Carrito
      </Button.Content>
    </Button>
  </a>
)

const ProductCards = (props) => (
  props.list ? 
    props.list.map(card => (
  <Card
    key = {card.id}
    image={card.images[0]}
    header= {card.name}
    meta={`$${card.price}`}
    description={card.description}
    extra={extra}
  />
))
  : null
 )

export default ProductCards