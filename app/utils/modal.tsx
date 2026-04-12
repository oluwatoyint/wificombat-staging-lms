import { ReactNode } from 'react';
import { VscClose } from 'react-icons/vsc';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  removeCancelIcon?: boolean;
  portfolio?: boolean;
  children: ReactNode;
}
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClearModules: () => void;
  courseName: string; // Pass the course name for display
};

const Modal = ({ isOpen, onClose, removeCancelIcon, children, portfolio }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[150] flex ${portfolio ? "items-start" : "items-center"} justify-center overflow-y-auto`}>
      <div className="fixed inset-0 bg-[#26002C80]" onClick={onClose}></div>
      <div className={`bg-white rounded-3xl shadow-lg z-60 w-full p-6 
      relative ${portfolio ? "w-[95%] lg:w-[50%] mx-auto my-16" : "max-w-lg"} max-md:mt-16 max-md:h-fit max-md:w-[96%]`}>
        {!removeCancelIcon && 
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <VscClose size={25}
          onClick={onClose}/>
        </button>}
        {children}
      </div>
    </div>
  );
};

export default Modal;

export const FullScreenModal = ({ isOpen, onClose, onClearModules, courseName }: Props) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-lg mx-auto">
                <h2 className="text-xl lg:text-2xl font-semibold mb-4">Attention</h2>
                <p>
                    You are trying to add all modules. Would you like to clear
                     the modules from your cart to add <strong>{courseName}</strong> or cancel?
                </p>
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        className="bg-black-500 text-white py-2 px-4 rounded-lg"
                        onClick={onClearModules}
                    >
                        Clear Modules
                    </button>
                    <button
                        className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
