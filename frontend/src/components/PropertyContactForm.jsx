import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import { useAddMessageMutation } from "../slices/messageApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PropertyContactForm = ({ property }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [addMessage, { isLoading }] = useAddMessageMutation();

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      if (!userInfo) {
        toast.error("You need to log in to send a message");
        navigate("/login");
        return;
      }
    }

    try {
      const data = {
        property: property._id,
        owner: property.owner._id,
        name,
        email,
        phone,
        message,
      };
      await addMessage(data).unwrap();

      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="body"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="body"
            name="body"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="submit"
          disabled={isLoading}
        >
          <FaPaperPlane className="mr-2" />{" "}
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default PropertyContactForm;
