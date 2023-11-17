import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "../componants/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout(){
   const cartCtx =  useContext(CartContext);
   const cartTotalPrice = cartCtx.items.reduce((totalPrice,item)=>{
    return totalPrice+item.quantity*item.price
},0)
//to close the modal
 const userProgressCtx = useContext(UserProgressContext);
 function handleCloseModal(){
    userProgressCtx.hideCheckout()
 }
 //submit form
 function handleSubmit(e){
    e.preventDefault();
   const fd= new FormData(e.target);
   const customerData = Object.fromEntries(fd.entries());//it gives an object
   fetch('http://localhost:3000/orders',{
    method:'POST',
    headers:{'content-type':'application/json'},
  body:JSON.stringify({
    order:{items:cartCtx.items,customer:customerData}
  })
   })//sending order data

 }
    return <Modal open={userProgressCtx.progress==='checkout'}onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount:{currencyFormatter.format(cartTotalPrice)} </p>
            <Input label="Full Name" type='text' id='name'/>
            <Input label='E-mail'id='email'type='email'/>
            <Input label='Street' type='text' id='street'/>
            <div className="control-row">
                <Input label='postal-code' type='text' id='postal-code'/>
                <Input label='City'  type='text' id='city'/>
            </div>
            <p className="modal-actions">
                <Button type='button' textOnly onClick={handleCloseModal}>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
}