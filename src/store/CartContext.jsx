import { createContext, useReducer } from "react";

   const CartContext =  createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},
   });
   function cartReducer(state,action){
    if(action.type==='add'){
        //update the state to add a meal item
        const existingCartItemIndex = state.items.findIndex((item)=>
            item.id===action.item.id

        )
        const updatedItems = [...state.items];
       
        if(existingCartItemIndex>-1){
            const updatedItem={
                ...state.items[existingCartItemIndex],
                quantity:state.items[existingCartItemIndex].quantity+1
            }

            updatedItems[existingCartItemIndex]=updatedItem;
        }else{
            updatedItems.push({...action.item,quantity:1})

        }
        return {...state,items:updatedItems}
    }
    if(action.type==='remove'){
        //remove an item from the state
        const existingCartItemIndex = state.items.findIndex((item)=>
        item.id===action.id

    )
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if(existingCartItem.quantity===1){
        updatedItems.splice(existingCartItemIndex,1)

    }else{
        const updatedItem={
            ...existingCartItem,
            quantity:existingCartItem.quantity-1
        }
        updatedItems[existingCartItemIndex]=updatedItem;
    }
    return{...state,items:updatedItems}
    }
    return state;


   }
   export function CartContextProvider({children}){
   const[cart,dispatchCartAction]= useReducer(cartReducer,{items:[]})
   
   function addItem(item){
    dispatchCartAction({type:'add',item:item})
   }
   function removeItem(id){
    dispatchCartAction({type:'remove',id:id})

   }
   const cartContext = {
    items:cart.items,
    addItem,
    removeItem

   }
   console.log(cartContext)
    return (
    <CartContext.Provider value={cartContext}>
        {children}

    </CartContext.Provider>)
  }
  export default CartContext;