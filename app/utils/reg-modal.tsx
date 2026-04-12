"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useMain } from '../context/MainContext';
import { useEffect, useState } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';

const RegModal = () => {
  const { successfulReg, setSuccessfulReg } = useMain();
  const [redirectPath, setRedirectPath] = useState('/students/curriculum');

  useEffect(() => {
    // Check if the user came from the cart
    const cameFromCart = decodeURIComponent(getCookie('redirect_from') as string) === '/students/cart';
    if (cameFromCart) {
      setRedirectPath('/students/cart');
      deleteCookie('redirect_from'); // Clear cookie after setting redirect path
    }
  }, []);

  if (!successfulReg) return null;

  const handleModalClose = () => {
    setSuccessfulReg(false);
  };

  return (
    <>
      {successfulReg && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 bg-[#26002C80]" onClick={handleModalClose}></div>
          <div className="bg-white rounded-3xl shadow-lg z-60 w-full p-6 relative max-w-lg max-md:mt-16 h-fit max-md:w-[96%]">
            <div>
              <Image 
                src={`/assets/auth/success.svg`}
                alt="success"
                width={91}
                height={87}
                className="mt-7 object-contain mx-auto"
              />

              <div className="mt-6 text-xl font-semibold text-center">
                 Registration Successful
              </div>

              <p className="text-lg font-medium my-4 text-center">
                Your account has been created successfully
              </p>

              <Link href={`${redirectPath === '/students/cart' ? "/students/cart" : "/students/curriculum"}`} onClick={handleModalClose}>
                <button
                  className="mt-10 flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
                  p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                 {redirectPath === '/students/cart' ? 'Return to Cart' : 'Check out our Curriculum'}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegModal;