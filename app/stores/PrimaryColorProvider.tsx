"use client";

import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";
import tinycolor from "tinycolor2";

// Define primary color shades
const primaryColorShades: Record<string, Record<number, string>> = {
  "#BC00DD": {
    50: "#f6d1ff",
    100: "#F0B3FF",
    200: "#E080FF",
    300: "#D04DFF",
    400: "#BC00DD",
    500: "#9B00B8",
  },
  "#FFB700": {
    50: "#fff0c4",
    100: "#FFE9A6",
    200: "#FFD473",
    300: "#FFBF40",
    400: "#FFB700",
    500: "#E69F00",
  },
  "#6BCAFA": {
    50: "#e9f2f8",
    100: "#D4EEFF",
    200: "#A8DCFF",
    300: "#7CCBFF",
    400: "#6BCAFA",
    500: "#009FE3",
  },
  "#0784C3": {
    50: "#bce3fa",
    100: "#A3D7F5",
    200: "#62BCE6",
    300: "#1DA2D9",
    400: "#0784C3",
    500: "#00699D",
  },
  "#0C0C0D": {
    50: "#acacac",
    100: "#99999A",
    200: "#666667",
    300: "#333334",
    400: "#0C0C0D",
    500: "#000000",
  },
};

// Define Context
const PrimaryColorContext = createContext<{
  primaryColor: string;
  getShade: (shade: number) => string;
}>({ primaryColor: "#0C0C0D", getShade: () => "#0C0C0D" });

export const PrimaryColorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [primaryColor, setPrimaryColor] = useState("#0C0C0D");

  useEffect(() => {
    // Get values from cookies
    const role = getCookie("role");
    const age = getCookie("age") ? parseInt(getCookie("age")!, 10) : null;
    const userClass = getCookie("_class") || "";

    let color = "#0C0C0D"; // Default color

    if (role === "teacher" || role === "school_admin") {
      color = "#0C0C0D";
    } else if (
      role === "student" ||
      (role === "user" && age !== null && age >= 5 && age <= 7) ||
      ["primary_1", "primary_2", "primary_3"].includes(userClass)
    ) {
      color = "#BC00DD";
    } else if (
      ["primary_4", "primary_5", "primary_6"].includes(userClass) ||
      (age !== null && age >= 8 && age <= 10)
    ) {
      color = "#FFB700";
    } else if (
      ["jss_1_year_7", "jss_2_year_8", "jss_3_year_9"].includes(userClass) ||
      (age !== null && age >= 11 && age <= 14)
    ) {
      color = "#6BCAFA";
    } else if (
      ["sss_1_year_10", "sss_2_year_11", "sss_3_year_12"].includes(userClass) ||
      (age !== null && age >= 15 && age <= 18)
    ) {
      color = "#0784C3";
    }

    setPrimaryColor(color);
    document.documentElement.style.setProperty("--primary-color", color);
    //
    //
    // Generate Shades Using tinycolor
    const shades = {
      40: tinycolor(color).lighten(55).toString(),
      50: tinycolor(color).lighten(50).toString(),
      100: tinycolor(color).lighten(40).toString(),
      200: tinycolor(color).lighten(30).toString(),
      300: tinycolor(color).lighten(20).toString(),
      400: tinycolor(color).lighten(10).toString(),
      500: color, // Base
      600: tinycolor(color).darken(10).toString(),
      700: tinycolor(color).darken(20).toString(),
      800: tinycolor(color).darken(30).toString(),
      900: tinycolor(color).darken(40).toString(),
    };

    // Apply shades as CSS variables
    Object.entries(shades).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--primary-${key}`, value);
    });
  }, []);

  const getShade = (shade: number) =>
    primaryColorShades[primaryColor]?.[shade] || primaryColor;

  return (
    <PrimaryColorContext.Provider value={{ primaryColor, getShade }}>
      {children}
    </PrimaryColorContext.Provider>
  );
};

// Custom hook to access the primary color and shades
export const usePrimaryColor = () => useContext(PrimaryColorContext);

// primary 1 - 3 || student || 5 - 7 years = #BC00DD
// primary 4 - 6 || 8 - 10 years = #FFB700
// junior secondary || 11 - 14 years = #6BCAFA
// senioro secondary = || 15 - 18 years #0784C3
// teacher || school_admin = #0C0C0D

// const primaryColorShades: Record<string, Record<number, string>> = {
//   "#BC00DD": {
//     100: "#F0B3FF",
//     200: "#E080FF",
//     300: "#D04DFF",
//     400: "#BC00DD",
//     500: "#9B00B8",
//   },
//   "#FFB700": {
//     100: "#FFE9A6",
//     200: "#FFD473",
//     300: "#FFBF40",
//     400: "#FFB700",
//     500: "#E69F00",
//   },
//   "#6BCAFA": {
//     100: "#D4EEFF",
//     200: "#A8DCFF",
//     300: "#7CCBFF",
//     400: "#6BCAFA",
//     500: "#009FE3",
//   },
//   "#0784C3": {
//     100: "#A3D7F5",
//     200: "#62BCE6",
//     300: "#1DA2D9",
//     400: "#0784C3",
//     500: "#00699D",
//   },
//   "#0C0C0D": {
//     100: "#99999A",
//     200: "#666667",
//     300: "#333334",
//     400: "#0C0C0D",
//     500: "#000000",
//   },
// };
