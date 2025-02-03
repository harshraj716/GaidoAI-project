"use client"

import { useEffect, useState } from "react"
import { useInsuranceStore } from "../../store/useInsuranceStore"
import { Card, CardContent } from "@/components/ui/card"
import MemberSelection from "./member-selection"
import AgeSelection from "./age-selection"
import CitySelection from "./city-selection"
import MedicalHistory from "./medical-history"
import Confirmation from "./confirmation"
import SubmissionComplete from "./submission-complete"
import LoadingSpinner from "./loading-spinner" // You'll need to create this component

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
    resetForm,
  } = useInsuranceStore()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // This effect will run after the initial render
    setIsLoading(false)
  }, [])

  const handleContinue = () => {
    switch (currentScreen) {
      case "members":
        setCurrentScreen("age")
        break
      case "age":
        setCurrentScreen("city")
        break
      case "city":
        setCurrentScreen("medical")
        break
      case "medical":
        setCurrentScreen("confirmation")
        break
      case "confirmation":
        setCurrentScreen("submissionComplete")
        break
    }
  }

  const handleBack = () => {
    switch (currentScreen) {
      case "age":
        setCurrentScreen("members")
        break
      case "city":
        setCurrentScreen("age")
        break
      case "medical":
        setCurrentScreen("city")
        break
      case "confirmation":
        setCurrentScreen("medical")
        break
    }
  }

  const handleMainMenu = () => {
    resetForm()
    setCurrentScreen("members")
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

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
          <AgeSelection members={members} setMembers={setMembers} onBack={handleBack} onContinue={handleContinue} />
        )}

        {currentScreen === "city" && (
          <CitySelection
            onBack={handleBack}
            onContinue={(city) => {
              setCity(city)
              handleContinue()
            }}
          />
        )}

        {currentScreen === "medical" && (
          <MedicalHistory
            onBack={handleBack}
            onContinue={(data) => {
              setMedicalHistory(data.conditions, data.whatsappUpdates)
              handleContinue()
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

        {currentScreen === "submissionComplete" && (
          <SubmissionComplete
            formData={{ gender, members, city, conditions, whatsappUpdates }}
            onMainMenu={handleMainMenu}
          />
        )}
      </CardContent>
    </Card>
  )
}

