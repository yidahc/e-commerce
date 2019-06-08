import React from 'react';
import Card from './card';



class CardBlockShop extends React.Component {
    constructor(props){
        super(props);
            this.state= {
                cardImages: [
                    '/images/product1.jpg', '/images/product2.jpg'
                 ],
            }
    }
    /*
    componentDidUpdate(prevProps){
        if (this.props !== prevProps) {
            this.setState ({
                listItems: this.props.list
            })
          }
          console.log(this.state.listItems)
    }
*/

render(){
    const props = this.props;
    return (
        <div className="card_block_shop">
            <div>
                <div>
                    {props.list ?
                        props.list.length === 0 ?
                            <div className="no_result">
                                Sorry, no results
                            </div>
                        :null
                    :null}
                    { this.props.list ?
                            this.props.list.map(card=> (           
                                <Card
                                    key={card._id}
                                    {...card}
                                    grid={props.grid}
                                    images={card.images}
                                />
                             ))
                             : null
                            }                </div>

            </div>
        </div>
    );
  }
};

export default CardBlockShop;