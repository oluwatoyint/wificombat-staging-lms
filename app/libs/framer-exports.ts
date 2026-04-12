"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export const Mdiv = motion.div;
export const Mp = motion.p;
export const Mh1 = motion.h1;
export const Mh2 = motion.h2;
export const Mh3 = motion.h3;
export const Mh4 = motion.h4;
export const Mh5 = motion.h5;
export const Mh6 = motion.h6;
export const Mspan = motion.span;
export const MLink = motion(Link);
export const Mshow = AnimatePresence;
