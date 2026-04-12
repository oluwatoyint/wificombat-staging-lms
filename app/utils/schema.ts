import { z } from 'zod';

export const schema = z.object({
  student: z
    .object({
      fullname: z.string().refine(
        (value) => {
          const names = value.trim().split(" ");
          return names.length >= 2;
        },
        { message: "Full name must contain at least two names" }
      ),
      //email: z.string().email({ message: "Invalid email address" }),
      age: z.number().min(1, { message: "Age must be at least 8" }),
      country: z.string().min(1, { message: "Country is required" }),
      state: z.string().min(1, { message: "State is required" }),
      pathway: z.string().min(1, { message: "Pathway is required" }),
      stage: z.string().min(1, { message: "Stage is required" }),
      course: z.string().min(1, { message: "Course is required" }),
    }),

  schoolStudent: z.object({
    fullname: z.string().refine(
      (value) => {
        const names = value.trim().split(" ");
        return names.length >= 2;
      },
      { message: "Full name must contain at least two names" }
    ),
    //email: z.string().email({ message: "Invalid email address" }),
    age: z.number().min(1, { message: "Age must be at least 8" }),
    class: z.string().min(1, {message: "Class is required"}),
  }),

  schoolTeacher: z.object({
    fullname: z.string().refine(
      (value) => {
        const names = value.trim().split(" ");
        return names.length >= 2;
      },
      { message: "Full name must contain at least two names" }
    ),
    students: z
    .string() // To Accept the input as a string
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "Invalid number of students" })
    .refine((val) => val > 0, { message: "Number of students must be at least 1" }),
    class: z.string().min(1, { message: "Class is required" }),
  }),

  schoolAdministrator: z
  .object({
    pathway: z.string().min(1, { message: "Pathway is required" }),
    class: z.string().min(1, { message: "Class is required" }),
    students: z
    .string() // To Accept the input as a string
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "Invalid number of students" })
    .refine((val) => val > 0, { message: "Number of students must be at least 1" }),
    teachers: z
    .string() // To Accept the input as a string
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val), { message: "Invalid number of teachers" })
    .refine((val) => val > 0, { message: "Number of students must be at least 1" }),
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
  }),


  payment: z.object({
    plan: z.string().min(1, { message: "Plan is required" }),
  }),
});
