"use client";

import { Card, CardContent } from "@/components/ui/card";
import MemberSelection from "./member-selection";
import AgeSelection from "./age-selection";
import CitySelection from "./city-selection";
import MedicalHistory from "./medical-history";
import Confirmation from "./confirmation";
import { useInsuranceStore } from "./useInsuranceStore";

export default function InsuranceForm() {
  const {
    currentScreen,
    setCurrentScreen,
    gender,
    setGender,
    members,
    setMembers,
    city,
    setCity,
    conditions,
    whatsappUpdates,
    setMedicalHistory,
  } = useInsuranceStore();

  const handleContinue = () => {
    switch (currentScreen) {
      case "members":
        setCurrentScreen("age");
        break;
      case "age":
        setCurrentScreen("city");
        break;
      case "city":
        setCurrentScreen("medical");
        break;
      case "medical":
        setCurrentScreen("confirmation");
        break;
      case "confirmation":
        console.log("Final form submission:", {
          gender,
          members,
          city,
          conditions,
          whatsappUpdates,
        });
        break;
    }
  };

  const handleBack = () => {
    switch (currentScreen) {
      case "age":
        setCurrentScreen("members");
        break;
      case "city":
        setCurrentScreen("age");
        break;
      case "medical":
        setCurrentScreen("city");
        break;
      case "confirmation":
        setCurrentScreen("medical");
        break;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {currentScreen === "members" && (
          <MemberSelection
            gender={gender}
            setGender={setGender}
            members={members}
            setMembers={setMembers}
            onContinue={handleContinue}
          />
        )}

        {currentScreen === "age" && (
          <AgeSelection
            members={members}
            setMembers={setMembers}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        )}

        {currentScreen === "city" && (
          <CitySelection
            onBack={handleBack}
            onContinue={(city) => {
              setCity(city);
              handleContinue();
            }}
          />
        )}

        {currentScreen === "medical" && (
          <MedicalHistory
            onBack={handleBack}
            onContinue={(data) => {
              setMedicalHistory(data.conditions, data.whatsappUpdates);
              handleContinue();
            }}
          />
        )}

        {currentScreen === "confirmation" && (
          <Confirmation
            formData={{ gender, members, city, conditions, whatsappUpdates }}
            onBack={handleBack}
            onSubmit={handleContinue}
          />
        )}
      </CardContent>
    </Card>
  );
}


//correct code 

// "use client"

// import { useState } from "react"
// import MemberSelection from "./member-selection"
// import AgeSelection from "./age-selection"
// import CitySelection from "./city-selection"
// import MedicalHistory from "./medical-history"
// import Confirmation from "./confirmation"
// import { Card, CardContent } from "@/components/ui/card"

// export type Member = {
//   type: "self" | "wife" | "son" | "daughter" | "father" | "mother"
//   id: string
//   age?: number
// }

// export type Gender = "male" | "female"

// type Screen = "members" | "age" | "city" | "medical" | "confirmation"

// export default function InsuranceForm() {
//   const [currentScreen, setCurrentScreen] = useState<Screen>("members")
//   const [formData, setFormData] = useState({
//     gender: "male" as Gender,
//     members: [] as Member[], // Start with empty array instead of including self
//     city: "",
//     conditions: [] as string[],
//     whatsappUpdates: true,
//   })

//   const handleContinue = () => {
//     switch (currentScreen) {
//       case "members":
//         setCurrentScreen("age")
//         break
//       case "age":
//         setCurrentScreen("city")
//         break
//       case "city":
//         setCurrentScreen("medical")
//         break
//       case "medical":
//         setCurrentScreen("confirmation")
//         break
//       case "confirmation":
//         console.log("Final form submission:", formData)
//         // Handle form submission here
//         break
//     }
//   }

//   const handleBack = () => {
//     switch (currentScreen) {
//       case "age":
//         setCurrentScreen("members")
//         break
//       case "city":
//         setCurrentScreen("age")
//         break
//       case "medical":
//         setCurrentScreen("city")
//         break
//       case "confirmation":
//         setCurrentScreen("medical")
//         break
//     }
//   }

//   return (
//     <Card className="w-full">
//       <CardContent className="p-6">
//         {currentScreen === "members" && (
//           <MemberSelection
//             gender={formData.gender}
//             setGender={(gender) => setFormData({ ...formData, gender })}
//             members={formData.members}
//             setMembers={(members) => setFormData({ ...formData, members })}
//             onContinue={handleContinue}
//           />
//         )}

//         {currentScreen === "age" && (
//           <AgeSelection
//             members={formData.members}
//             setMembers={(members) => setFormData({ ...formData, members })}
//             onBack={handleBack}
//             onContinue={handleContinue}
//           />
//         )}

//         {currentScreen === "city" && (
//           <CitySelection
//             onBack={handleBack}
//             onContinue={(city) => {
//               setFormData({ ...formData, city })
//               handleContinue()
//             }}
//           />
//         )}

//         {currentScreen === "medical" && (
//           <MedicalHistory
//             onBack={handleBack}
//             onContinue={(data) => {
//               setFormData({
//                 ...formData,
//                 conditions: data.conditions,
//                 whatsappUpdates: data.whatsappUpdates,
//               })
//               handleContinue()
//             }}
//           />
//         )}

//         {currentScreen === "confirmation" && (
//           <Confirmation formData={formData} onBack={handleBack} onSubmit={handleContinue} />
//         )}
//       </CardContent>
//     </Card>
//   )
// }







// "use client"

// import { useState } from "react"
// import MemberSelection from "./member-selection"
// import AgeSelection from "./age-selection"
// import CitySelection from "./city-selection"
// import MedicalHistory from "./medical-history"
// import Confirmation from "./confirmation"
// import { Card, CardContent } from "@/components/ui/card"

// export type Member = {
//   type: "self" | "wife" | "son" | "daughter" | "father" | "mother"
//   id: string
//   age?: number
// }

// export type Gender = "male" | "female"

// type Screen = "members" | "age" | "city" | "medical" | "confirmation"

// export default function InsuranceForm() {
//   const [currentScreen, setCurrentScreen] = useState<Screen>("members")
//   const [formData, setFormData] = useState({
//     gender: "male" as Gender,
//     members: [] as Member[], // Start with empty array instead of including self
//     city: "",
//     conditions: [] as string[],
//     whatsappUpdates: true,
//   })

//   const handleContinue = () => {
//     switch (currentScreen) {
//       case "members":
//         setCurrentScreen("age")
//         break
//       case "age":
//         setCurrentScreen("city")
//         break
//       case "city":
//         setCurrentScreen("medical")
//         break
//       case "medical":
//         setCurrentScreen("confirmation")
//         break
//       case "confirmation":
//         console.log("Final form submission:", formData)
//         // Handle form submission here
//         break
//     }
//   }

//   const handleBack = () => {
//     switch (currentScreen) {
//       case "age":
//         setCurrentScreen("members")
//         break
//       case "city":
//         setCurrentScreen("age")
//         break
//       case "medical":
//         setCurrentScreen("city")
//         break
//       case "confirmation":
//         setCurrentScreen("medical")
//         break
//     }
//   }

//   return (
//     <Card className="w-full">
//       <CardContent className="p-6">
//         {currentScreen === "members" && (
//           <MemberSelection
//             gender={formData.gender}
//             setGender={(gender) => setFormData({ ...formData, gender })}
//             members={formData.members}
//             setMembers={(members) => setFormData({ ...formData, members })}
//             onContinue={handleContinue}
//           />
//         )}

//         {currentScreen === "age" && (
//           <AgeSelection
//             members={formData.members}
//             setMembers={(members) => setFormData({ ...formData, members })}
//             onBack={handleBack}
//             onContinue={handleContinue}
//           />
//         )}

//         {currentScreen === "city" && (
//           <CitySelection
//             onBack={handleBack}
//             onContinue={(city) => {
//               setFormData({ ...formData, city })
//               handleContinue()
//             }}
//           />
//         )}

//         {currentScreen === "medical" && (
//           <MedicalHistory
//             onBack={handleBack}
//             onContinue={(data) => {
//               setFormData({
//                 ...formData,
//                 conditions: data.conditions,
//                 whatsappUpdates: data.whatsappUpdates,
//               })
//               handleContinue()
//             }}
//           />
//         )}

//         {currentScreen === "confirmation" && (
//           <Confirmation formData={formData} onBack={handleBack} onSubmit={handleContinue} />
//         )}
//       </CardContent>
//     </Card>
//   )
// }

