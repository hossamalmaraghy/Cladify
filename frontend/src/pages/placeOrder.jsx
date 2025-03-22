import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/title";
import { ShopContext } from "../context/shopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products }  =useContext(ShopContext);

  const  [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    
    setFormData(data => ({...data, [name]: value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for(const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
              }
          }
          
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {

        // API calls for COD
        case 'cod': {
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: {token} });
          
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message);
          }
          break;
        }

          case 'stripe': 
            // eslint-disable-next-line no-case-declarations
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: {token} });
          if (responseStripe.data.success) {
            const {session_url} = responseStripe.data
            window.location.replace(session_url);

          } else {
            toast.error(responseStripe.data.message);
          }
            break;
      
        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name" />
          <input onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name" />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input  onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>

        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>

        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>

      {/* Right Side */}
      <div className="mt-8 w-full sm:w-auto">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method Selection */}
          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            {/* Stripe */}
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border rounded-md px-4 py-2 cursor-pointer w-full sm:w-56">
              {/* Green dot for selection */}
              <div className={`w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-500" : "bg-white"}`}></div>
              <img className="h-5" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border rounded-md px-4 py-2 cursor-pointer w-full sm:w-56">
              {/* Green dot for selection */}
              <div className={`w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-500" : "bg-white"}`}></div>
              <img className="h-5" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            {/* Cash on Delivery */}
            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border rounded-md px-4 py-2 cursor-pointer w-full sm:w-56">
              {/* Green dot for selection */}
              <div className={`w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-500" : "bg-white"}`}></div>
              <p className="text-gray-700 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
