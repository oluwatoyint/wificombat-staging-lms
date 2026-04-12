import Image from "next/image";
import React from "react";
import { RequestQuoteForm } from "./_components/RequestQuoteForm";

const RequestQuotePage = () => {
  return (
    <div className="h-[100dvh] overflow-hidden grid grid-cols-1 min-[1080px]:grid-cols-[1fr_1.2fr]">
      <div className="relative h-full hidden min-[1080px]:block">
        <Image
          src={"/auth-img.svg"}
          alt="auth image"
          width={400}
          height={200}
          className="h-full w-full object-cover object-center"
        />
        <Image
          src={"/logo-plain.svg"}
          alt="auth image"
          width={80}
          height={60}
          className="w-[150px] absolute top-6 left-6 object-cover object-center"
        />
      </div>
      <div className="overflow-y-scroll scroll-style h-[100dvh]">
        <RequestQuoteForm />
      </div>
    </div>
  );
};

export default RequestQuotePage;
