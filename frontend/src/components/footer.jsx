import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="my-10 mt-40 text-sm px-4 sm:px-10 lg:px-20">
      {/* Main Footer Flex Container */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-10 sm:gap-14">
        
        {/* Left Section */}
        <div className="max-w-[300px] text-left">
          <img src={assets.logo} alt="Opsova Logo" className="mb-5 w-32" />
          <p className="text-gray-600">
            We strive to create a beautiful, user-friendly, and inclusive shopping experience.
            Our mission is to help you find the perfect product that meets your needs and preferences
            for creating your dream space. For any questions or concerns, please visit our support team at Opsova.com.
          </p>
        </div>

        {/* Middle Section */}
        <div className="max-w-[200px] text-left">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="max-w-[200px] text-left">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-925-555-5555</li>
            <li>contact@opsova.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-10">
        <hr />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright © 2025 Opsova - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
