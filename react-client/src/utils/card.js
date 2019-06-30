import React from 'react';
import Ybutton from './button.js';

import { connect } from 'react-redux';
import { addToCart } from '../actions/user_actions.js';


 

class Card extends React.Component {


    renderCardImage(images){
        let path = "/images/"
        if(images.length > 0){
            return path.concat(images[0])
            //images[0].url when coming from external cloud
        } else {
            return '/images/product1.jpg'
        } 
  
    }

    

    render() {
        const props = this.props;
        //when you change to grid on products page, it adds a string "grid bars" (secondary class) so every component is restiled to grid mode
        //otherwise it is an empty string and class is just 'card_item_wrapper'
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
            <img style= {{width: "200px", height: "200px"}}
            src= {this.renderCardImage(props.images)} alt={props.name}></img>
                <div className="action_container">
                    <div className="tags">
                        <div><div className="brand">{props.brand.name}</div></div>
                        <br />
                        <div className="name">{props.name}</div>
                        <div className="name">${props.price}</div>
                    </div>
                    { props.grid ?
                        <div className="description">
                            <p>
                                {props.description}
                            </p>    
                        </div>
                        :null
                    }
                    { props.category.name === "Bases de maquillaje" ?
                         <Ybutton 
                         type="shadePicker"
                         title="Elegir Tono"
                         runAction={()=>{
                           console.log('shadepicking not ready')
                        }}
                        />
                        : null
                         }
                    <div className="actions">
                        <div className="button_wrapp">
                            <Ybutton
                                type="default"
                                title="Ver Producto"
                                linkTo={`/product_detail/${props._id}`}
                            />
                        </div>
                        <div className="button_wrapp">
                            <Ybutton
                                type="bag_link"
                                runAction={()=>{
                                    props.user.userData.isAuth ?
                                        this.props.dispatch(addToCart(props._id))
                                    :
                                        console.log('you need to log in')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);