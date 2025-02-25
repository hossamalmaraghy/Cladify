import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"
import Contact from "./pages/contact"
import { Collection } from "mongoose"
import Product from "./pages/product"
import Cart from "./pages/cart"
import Login from "./pages/login"
import PlaceOrder from "./pages/placeOrder"
import Orders from "./pages/orders"
import Navbar from "./components/navbar"

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default App