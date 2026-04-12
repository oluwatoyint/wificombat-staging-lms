"use client";
import { Button } from "@/app/components/base-components/Button";
import { useGetAllPathways } from "@/app/hooks/useGetAllPathways";
import { BackIcon } from "@/app/icons";
import { Mshow } from "@/app/libs/framer-exports";
import { classArray } from "@/app/utils/class-array";
import { terms } from "@/app/utils/terms";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { BiChevronDown } from "react-icons/bi";
import { ConfirmRequestModal } from "./ConfirmRequestModal";
import { QuotePayloadProp } from "@/app/types/quote-payload";
import { LoadSpinner } from "@/app/components/loaders/LoadSpinner";
import api from "@/app/utils/auth-interceptor";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const RequestQuoteForm = () => {
  const router = useRouter();
  const { pathways } = useGetAllPathways();
  //
  const [dropDown, setDropDown] = useState<string>("");
  const [selectedNames, setSelectedNames] = useState<Record<string, string>>(
    {}
  );
  //
  // const [showConfirmRequestModal, setShowConfirmRequestModal] =
  //   useState<boolean>(false);
  // const [quotes, setQuotes] = useState<QuotePayloadProp[]>();
  const [loading, setLoading] = useState<boolean>(false);
  //
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quotes: [
        {
          course_pathway: "",
          term: "",
          class_name: "",
          quantity: 0,
          term_start: "",
          term_end: "",
        },
      ],
    },
  });
  //
  const { append, remove, fields } = useFieldArray({
    control,
    name: "quotes",
  });

  const handleSelect = (
    index: number,
    field: "course_pathway" | "class_name" | "term",
    value: string,
    name: string
  ) => {
    setValue(`quotes.${index}.${field}`, value);
    setSelectedNames((prev) => ({
      ...prev,
      [`${field}-${index}`]: name,
    }));
    setDropDown("");
  };
  //
  const handleAddPathway = () => {
    append({
      course_pathway: "",
      term: "",
      class_name: "",
      quantity: 0,
      term_start: "",
      term_end: "",
    });
  };

  const handleRemovePathway = (index: number) => {
    remove(index);

    setSelectedNames((prev) => {
      const updatedNames = { ...prev };
      ["course_pathway", "class_name", "term"].forEach((field) => {
        delete updatedNames[`${field}-${index}`];
      });
      return updatedNames;
    });
  };
  //
  const requestQuote = async (data: any) => {
    try {
      setLoading(true);
      const res = await api.post("/quotes/bulk/create/", data);
      if (res.status === 200 || res.status === 201 || res.statusText === "OK") {
        toast.success(res.data?.message);
        reset();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "An unknown error occurred"
        );
      } else {
        toast.error("An unknown server error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  //
  return (
    <Fragment>
      <div className="my-6 py-5 px-6 min-h-full">
        <div className="flex w-fit items-center gap-4 mb-6">
          <BackIcon onClick={() => router.back()} />
          <h3 className="font-semibold w-full text-center text-xl md:text-2xl lg:text-3xl">
            Request For Quote
          </h3>
        </div>

        <form onSubmit={handleSubmit(requestQuote)}>
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-5">
              {/* Career Pathway */}
              <div className="relative w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Career Pathway
                </label>
                <div className="flex items-center justify-between rounded-md border py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300">
                  <input
                    type="text"
                    {...register(`quotes.${index}.course_pathway`, {
                      required: true,
                    })}
                    value={
                      selectedNames[`course_pathway-${index}`] ||
                      "Select Course"
                    }
                    readOnly
                    placeholder="Select Course"
                    className="outline-none w-full capitalize placeholder:text-gray-500"
                  />
                  <BiChevronDown
                    onClick={() =>
                      setDropDown(
                        dropDown === `course${index}` ? "" : `course${index}`
                      )
                    }
                    className="cursor-pointer text-gray-500 text-[24px]"
                  />
                </div>
                {dropDown === `course${index}` && (
                  <div className="absolute z-10 bg-white w-full mt-1 p-2 rounded-md shadow-md border h-[200px] scroll-style overflow-auto">
                    {pathways?.data?.map((path: any, idx: number) => (
                      <div
                        key={idx}
                        className="cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() =>
                          handleSelect(
                            index,
                            "course_pathway",
                            path.id,
                            path.title
                          )
                        }
                      >
                        {path.title}
                      </div>
                    ))}
                  </div>
                )}
                {errors?.quotes?.[index]?.course_pathway && (
                  <p className="text-sm text-red-500">Pathway is required</p>
                )}
              </div>

              {/* Class/Year */}
              <div className="relative w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Class/Year
                </label>
                <div className="flex items-center justify-between rounded-md border py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300">
                  <input
                    type="text"
                    {...register(`quotes.${index}.class_name`, {
                      required: true,
                    })}
                    value={
                      selectedNames[`class_name-${index}`] || "Select Class"
                    }
                    readOnly
                    placeholder="Select Class"
                    className="outline-none w-full capitalize placeholder:text-gray-500"
                  />
                  <BiChevronDown
                    onClick={() =>
                      setDropDown(
                        dropDown === `class${index}` ? "" : `class${index}`
                      )
                    }
                    className="cursor-pointer text-gray-500 text-[24px]"
                  />
                </div>
                {dropDown === `class${index}` && (
                  <div className="absolute z-10 bg-white w-full mt-1 p-2 rounded-md shadow-md border h-[200px] scroll-style overflow-auto">
                    {classArray.map((clas, idx) => (
                      <div
                        key={idx}
                        className="cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() =>
                          handleSelect(
                            index,
                            "class_name",
                            clas.value,
                            clas.name
                          )
                        }
                      >
                        {clas.name}
                      </div>
                    ))}
                  </div>
                )}
                {errors?.quotes?.[index]?.class_name && (
                  <p className="text-sm text-red-500">Class is required</p>
                )}
              </div>
              {/* Num of students */}
              <div>
                <label
                  htmlFor={`quotes.${index}.quantity`}
                  className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                >
                  Number of Students
                </label>
                <input
                  {...register(`quotes.${index}.quantity`, {
                    required: "Number of students is required",
                    min: {
                      value: 1,
                      message: "Number of students must not be 0",
                    },
                  })}
                  placeholder="e.g. 50"
                  className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-700 sm:text-sm sm:leading-6"
                />
                {errors.quotes?.[index]?.quantity && (
                  <p className="text-sm text-red-500">
                    {errors.quotes[index].quantity?.message}
                  </p>
                )}
              </div>
              {/* Term */}
              <div className="relative w-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Term
                </label>
                <div className="flex items-center justify-between rounded-md border py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300">
                  <input
                    type="text"
                    {...register(`quotes.${index}.term`, {
                      required: true,
                    })}
                    value={selectedNames[`term-${index}`] || "Select Term"}
                    readOnly
                    placeholder="Select Term"
                    className="outline-none w-full capitalize placeholder:text-gray-500"
                  />
                  <BiChevronDown
                    onClick={() =>
                      setDropDown(
                        dropDown === `term${index}` ? "" : `term${index}`
                      )
                    }
                    className="cursor-pointer text-gray-500 text-[24px]"
                  />
                </div>
                {dropDown === `term${index}` && (
                  <div className="absolute z-10 bg-white w-full mt-1 p-2 rounded-md shadow-md border h-[120px] scroll-style overflow-auto">
                    {terms.map((clas, idx) => (
                      <div
                        key={idx}
                        className="cursor-pointer hover:bg-gray-100 p-2"
                        onClick={() =>
                          handleSelect(index, "term", clas.value, clas.name)
                        }
                      >
                        {clas.name}
                      </div>
                    ))}
                  </div>
                )}
                {errors?.quotes?.[index]?.term && (
                  <p className="text-sm text-red-500">Term is required</p>
                )}
              </div>
              {/* Start and end term Date */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1">
                  <label
                    htmlFor={`quotes.${index}.term_start`}
                    className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                  >
                    Term Start Date
                  </label>
                  <input
                    type="date"
                    {...register(`quotes.${index}.term_start`, {
                      required: "Term start date is required",
                    })}
                    placeholder="e.g. 50"
                    className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-700 sm:text-sm sm:leading-6"
                  />
                  {errors.quotes?.[index]?.term_start && (
                    <p className="text-sm text-red-500">
                      {errors.quotes[index].term_start?.message}
                    </p>
                  )}
                </div>
                {/*  */}
                <div className="flex-1">
                  <label
                    htmlFor={`quotes.${index}.quantity`}
                    className="block text-sm mb-2 font-medium leading-6 text-gray-900"
                  >
                    Term End Date
                  </label>
                  <input
                    type="date"
                    {...register(`quotes.${index}.term_end`, {
                      required: "Term end date is required",
                    })}
                    placeholder="e.g. 50"
                    className="block outline-none w-full rounded-md border-neutral-300 border focus:border-gray-600 py-4 px-4 shadow-sm ring-1 ring-inset ring-gray-300 
                      placeholder:text-gray-700 sm:text-sm sm:leading-6"
                  />
                  {errors.quotes?.[index]?.term_end && (
                    <p className="text-sm text-red-500">
                      {errors.quotes[index].term_end?.message}
                    </p>
                  )}
                </div>
                {/*  */}
              </div>
              {fields?.length > 1 && (
                <Button
                  type="button"
                  label="Remove Pathway"
                  variant="outline"
                  onClick={() => handleRemovePathway(index)}
                />
              )}
            </div>
          ))}
          <div className="flex items-center gap-4 my-12 justify-center flex-wrap">
            <Button
              type="button"
              variant="outline"
              label="Add More Pathway"
              className="flex-1 h-[56px]"
              onClick={handleAddPathway}
            />
            <Button
              type="submit"
              // label="Preview Quote"
              label="Submit Request Quote"
              className="flex-1 h-[56px] !gap-2"
              disabled={fields.length < 1 || loading}
              icon={
                loading ? (
                  <LoadSpinner className="!w-[20px] !h-[20px] !mt-1" />
                ) : (
                  <></>
                )
              }
            />
          </div>
        </form>
      </div>
      {/*  */}
      {/* <Mshow>
        {showConfirmRequestModal && (
          <ConfirmRequestModal
            quotes={quotes}
            setShowModal={setShowConfirmRequestModal}
          />
        )}
      </Mshow> */}
    </Fragment>
  );
};
