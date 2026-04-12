"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useMain } from '../context/MainContext';



// export type ModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
// }

const SuccessModal = () => {
  const {successfulSignup, setSuccessfulSignup, } = useMain();
  if (!successfulSignup) return null;

  return (
    <>
    {successfulSignup && 
    <div className={`fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto`}>
      <div className="fixed inset-0 bg-[#26002C80]" onClick={() => setSuccessfulSignup(false)}></div>
      <div className={`bg-white rounded-3xl shadow-lg z-60 w-full p-6 
      relative  max-w-lg max-md:mt-16 h-fit max-md:w-[96%]`}>
        <div>

          <Image 
          src={`/assets/auth/success.svg`}
          alt='success'
          width={91}
          height={87}
          className='mt-7 object-contain mx-auto'
          />

          <div className="mt-6 text-xl font-semibold text-center">
          Verification Successful
          </div>
          <p className="text-lg font-medium my-4 text-center">
          Your email has been verified successfully
          </p>


          <Link 
          onClick={() => setSuccessfulSignup(false)}
          href={`/create-profile`}>
              <button
              className="mt-10 flex w-full justify-center rounded-md disabled:bg-[#B1B1B4] active:bg-[#131314] bg-[#131314] 
              p-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline 
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
              { "Create Profile"}
              </button>
          </Link>

        </div>
      </div>
    </div>
    }
    </>
  );
};

export default SuccessModal;