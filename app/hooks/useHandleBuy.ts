import { useState } from 'react';
import axios from 'axios';
import { useCart } from '@/app/context/CartContext';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

const useHandleBuy = () => {
  const { cart, addItemToCart, removeItemFromCart } = useCart(); // Include add and remove functions
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const handleBuy = async (item?: any) => {
    const userId = getCookie("user_id");

    if (!userId) {
      window.location.href = "/registration";
      return;
    }

    // If item is not in the cart, add it temporarily
    let tempAdded = false;
    if (item && !cart.some(cartItem => cartItem.id === item.id)) {
      addItemToCart(item);
      tempAdded = true;
    }

    setIsProcessModalOpen(true);
    setModalMessage('Processing payment...');

    // Prepare payload
    const modules = item?.type === 'module' ? [] : cart.filter(cartItem => cartItem.type === 'module');
    const course = item?.type === 'course' ? item : cart.find(cartItem => cartItem.type === 'course');
    const courseId = course?.id;
    const courseName = course?.subject;
    const coursePrice = parseFloat(course?.price || '0');
    const modulesTotalPrice = modules.reduce((total, module) => total + parseFloat(module.price), 0);
    const finalPrice = coursePrice + modulesTotalPrice;

    const payload = {
      user_id: userId,
      course: { course_id: courseId, course_name: courseName },
      course_price: coursePrice,
      modules_total_price: modulesTotalPrice,
      final_price: finalPrice,
      payment_method: "card",
      purchase_type: item ? (item.type === 'module' ? "single_module" : "full_course") : (modules.length <= 0 ? "full_course" : "single_module"),
      status: "pending",
      modules: modules.map(module => ({
        module_id: module.id,
        module_name: module.title,
        price: parseFloat(module.price),
      })),
    };

    try {
      const response = await axios.post("https://wificombatacademy.com/api/v2/order/", payload, {});
      const { message, payment_link } = response.data;
      setModalMessage(message);
      setPaymentLink(payment_link);
      toast.success(message);

      // Redirect to payment link
    //   window.location.href = payment_link;
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error('Failed to place order. Please try again later.');
    } finally {
      setIsProcessModalOpen(false);
      // If item was added temporarily, remove it from the cart after purchase attempt
      if (tempAdded) removeItemFromCart(item.id);
    }
  };

  return { handleBuy, isProcessModalOpen, modalMessage, paymentLink, setIsProcessModalOpen };
};

export default useHandleBuy;