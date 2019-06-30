import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';
import { Button, Icon } from 'semantic-ui-react'

const Ybutton = (props) => {
    const buttons = () =>{
        let template = '';
        switch(props.type){
            case "default":
                template = <Link
                    className='link_default'  
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
            break;
           
            case "bag_link":
            template = 
                <span>
                    <Button  onClick={()=>{
                        props.runAction();
                    }} animated='vertical'>
                        <Button.Content hidden> Agregar </Button.Content>
                        <Button.Content visible>
                        <Icon name='shop' />
                        </Button.Content>
                    </Button>
                </span>  
        break;
        
        case "add_to_cart_link":
                template =   
                     <div className="add_to_cart_link"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faShoppingBag}
                        />
                        Add to cart
                    </div>
            break;
        
        case "shadePicker":
        template = <div
                        className="shadePicker"
                        onClick={()=>{
                            props.runAction();
                        }}
                    >  
                    {props.title}
                    </div>
        break;
            
        
        default: 
                template = ''; 
        }
        return template
    }

    return (
        <div className="my_link">
            {buttons()} 
        </div>
    );
};

export default Ybutton;