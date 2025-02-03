"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Member = {
  type: "self" | "wife" | "son" | "daughter" | "father" | "mother"
  id: string
  age?: number
}

export type Gender = "male" | "female"

type Screen = "members" | "age" | "city" | "medical" | "confirmation" | "submissionComplete"

interface InsuranceState {
  currentScreen: Screen
  gender: Gender
  members: Member[]
  city: string
  conditions: string[]
  whatsappUpdates: boolean
  setCurrentScreen: (screen: Screen) => void
  setGender: (gender: Gender) => void
  setMembers: (members: Member[]) => void
  setCity: (city: string) => void
  setMedicalHistory: (conditions: string[], whatsappUpdates: boolean) => void
  resetForm: () => void
}

const initialState = {
  currentScreen: "members" as Screen,
  gender: "male" as Gender,
  members: [],
  city: "",
  conditions: [],
  whatsappUpdates: true,
}

export const useInsuranceStore = create<InsuranceState>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentScreen: (screen) => set({ currentScreen: screen }),
      setGender: (gender) => set({ gender }),
      setMembers: (members) => set({ members }),
      setCity: (city) => set({ city }),
      setMedicalHistory: (conditions, whatsappUpdates) => set({ conditions, whatsappUpdates }),
      resetForm: () => set(initialState),
    }),
    {
      name: "insurance-form-data",
    },
  ),
)


// "use client"

// import { create } from "zustand"
// import { persist } from "zustand/middleware"

// export type Member = {
//   type: "self" | "wife" | "son" | "daughter" | "father" | "mother"
//   id: string
//   age?: number
// }

// export type Gender = "male" | "female"

// type Screen = "members" | "age" | "city" | "medical" | "confirmation"

// interface InsuranceState {
//   currentScreen: Screen
//   gender: Gender
//   members: Member[]
//   city: string
//   conditions: string[]
//   whatsappUpdates: boolean
//   setCurrentScreen: (screen: Screen) => void
//   setGender: (gender: Gender) => void
//   setMembers: (members: Member[]) => void
//   setCity: (city: string) => void
//   setMedicalHistory: (conditions: string[], whatsappUpdates: boolean) => void
// }

// export const useInsuranceStore = create<InsuranceState>()(
//   persist(
//     (set) => ({
//       currentScreen: "members",
//       gender: "male",
//       members: [],
//       city: "",
//       conditions: [],
//       whatsappUpdates: true,
//       setCurrentScreen: (screen) => set({ currentScreen: screen }),
//       setGender: (gender) => set({ gender }),
//       setMembers: (members) => set({ members }),
//       setCity: (city) => set({ city }),
//       setMedicalHistory: (conditions, whatsappUpdates) => set({ conditions, whatsappUpdates }),
//     }),
//     {
//       name: "insurance-form-data",
//     },
//   ),
// )




// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export type Member = {
//   type: "self" | "wife" | "son" | "daughter" | "father" | "mother";
//   id: string;
//   age?: number;
// };

// export type Gender = "male" | "female";

// type Screen = "members" | "age" | "city" | "medical" | "confirmation";

// interface InsuranceState {
//   currentScreen: Screen;
//   gender: Gender;
//   members: Member[];
//   city: string;
//   conditions: string[];
//   whatsappUpdates: boolean;
//   setCurrentScreen: (screen: Screen) => void;
//   setGender: (gender: Gender) => void;
//   setMembers: (members: Member[]) => void;
//   setCity: (city: string) => void;
//   setMedicalHistory: (conditions: string[], whatsappUpdates: boolean) => void;
// }

// export const useInsuranceStore = create<InsuranceState>()(
//   persist(
//     (set) => ({
//       currentScreen: "members",
//       gender: "male",
//       members: [],
//       city: "",
//       conditions: [],
//       whatsappUpdates: true,
//       setCurrentScreen: (screen) => set({ currentScreen: screen }),
//       setGender: (gender) => set({ gender }),
//       setMembers: (members) => set({ members }),
//       setCity: (city) => set({ city }),
//       setMedicalHistory: (conditions, whatsappUpdates) =>
//         set({ conditions, whatsappUpdates }),
//     }),
//     {
//       name: "insurance-form-data", // Key to store data in localStorage
//     }
//   )
// );
