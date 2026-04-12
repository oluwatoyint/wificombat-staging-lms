import { BackIcon, WifiCombatLogo } from "@/app/icons";
import { QuotePayloadProp } from "@/app/types/quote-payload";
import React, { Dispatch, SetStateAction } from "react";

export const ConfirmRequestModal = ({
  quotes,
  setShowModal,
}: {
  quotes: QuotePayloadProp[] | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log(quotes);
  //
  return (
    <div className="fixed top-0 left-0 h-screen w-full overflow-hidden bg-white">
      <div className="w-[90%] mx-auto">
        <WifiCombatLogo
          width="150"
          height="60"
          className="mb-8 mt-5"
          onClick={() => setShowModal(false)}
        />
        <div className="flex items-center gap-4 mb-6">
          <BackIcon size="60" onClick={() => setShowModal(false)} />
          <h3 className="font-semibold w-full text-center text-xl md:text-2xl lg:text-3xl">
            Quote Request Preview
          </h3>
        </div>
        {/*  */}
        <div className="mt-12">
          <h3 className="font-semibold text-xl sm:text-2xl text-[#131314] mb-4">
            Selected Pathways
          </h3>
          {/*  */}
          <div className="overflow-auto scroll-style">
            {quotes?.map((quote, idx: number) => (
              <div key={idx}>
                <div>
                  <h4>Career Pathway</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
