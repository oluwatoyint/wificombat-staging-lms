import { ArrowRight } from "@/app/icons";
import { Mdiv, Mshow } from "@/app/libs/framer-exports";
import { useSelectedItemToView } from "@/app/stores/career-pathways/useSelectedItemToView";
import { Module } from "@/app/types/module-prop";
import { cn } from "@/app/utils/cn";
import { item_key } from "@/app/utils/vars";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ModulePlanDropDown = ({ data }: { data: Module }) => {
  const [showModulePlans, setShowModulePlans] = useState<boolean>(false);
  //
  const { setSelectedItem } = useSelectedItemToView();
  const [hydrated, setHydrated] = useState(false);
  //
  useEffect(() => {
    try {
      const stored = localStorage.getItem(item_key);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSelectedItem(parsed);
      }
    } catch (err) {
      console.error("Error parsing stored item", err);
    } finally {
      setHydrated(true);
    }
  }, [setSelectedItem]);

  //
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  //
  if (!hydrated) return null;
  return (
    <div className="mt-4">
      <div
        className={cn(
          "flex justify-between items-center gap-2 cursor-pointer font-semibold select-none text-black-500"
        )}
        onClick={() => {
          setShowModulePlans(!showModulePlans);
        }}
      >
        <div className="flex gap-2 items-center">
          <Mdiv
            animate={{ rotate: showModulePlans ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ArrowRight />
          </Mdiv>
          <h3>Module Plan</h3>
        </div>
      </div>
      {/*  */}
      <Mshow>
        {showModulePlans && (
          <Mdiv
            initial={{ height: 0, paddingTop: 0 }}
            animate={{ height: "auto", paddingTop: "16px" }}
            exit={{ height: 0, paddingTop: 0 }}
            className={"flex flex-col gap-5 pl-10 overflow-hidden"}
          >
            <div
              className="font-semibold text-sm text-black-550 cursor-pointer select-none"
              onClick={() => {
                params.set("v_n", "obj");
                router.replace(`?${params?.toString()}`);
                setSelectedItem({
                  obj: data?.objectives,
                });
              }}
            >
              Objectives
            </div>
            {/*  */}
            <div
              className="font-semibold text-sm text-black-550 cursor-pointer select-none"
              onClick={() => {
                params.set("v_n", "leotc");
                router.replace(`?${params?.toString()}`);
                setSelectedItem({
                  leotc: data?.learning_outcome,
                });
              }}
            >
              Learning Outcome
            </div>
          </Mdiv>
        )}
      </Mshow>
    </div>
  );
};
