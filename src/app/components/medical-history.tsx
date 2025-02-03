"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { useState } from "react"
import { useInsuranceStore } from "../../store/useInsuranceStore"

interface MedicalHistoryProps {
  onBack: () => void
  onContinue: (data: {
    conditions: string[]
    whatsappUpdates: boolean
  }) => void
}

const medicalConditions = [
  { id: "diabetes", label: "Diabetes" },
  { id: "blood-pressure", label: "Blood Pressure" },
  { id: "heart-disease", label: "Heart Disease" },
  { id: "any-surgery", label: "Any Surgery" },
  { id: "thyroid", label: "Thyroid" },
  { id: "asthma", label: "Asthma" },
  { id: "other-disease", label: "Other Disease" },
  { id: "none", label: "None of These" },
]

export default function MedicalHistory({ onBack, onContinue }: MedicalHistoryProps) {
  const { conditions, whatsappUpdates, setMedicalHistory } = useInsuranceStore()
  const [selectedConditions, setSelectedConditions] = useState<string[]>(conditions)
  const [whatsappUpdatesState, setWhatsappUpdatesState] = useState(whatsappUpdates)

  const handleConditionToggle = (condition: string) => {
    let newConditions: string[]
    if (condition === "none") {
      newConditions = selectedConditions.includes("none") ? [] : ["none"]
    } else {
      const withoutNone = selectedConditions.filter((c) => c !== "none")
      if (selectedConditions.includes(condition)) {
        newConditions = withoutNone.filter((c) => c !== condition)
      } else {
        newConditions = [...withoutNone, condition]
      }
    }
    setSelectedConditions(newConditions)
    setMedicalHistory(newConditions, whatsappUpdatesState)
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Medical History</h1>
      </div>

      <div className="space-y-6">
        <p className="text-lg text-gray-600">
          Do any member(s) have any existing illnesses for which they take regular medication?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicalConditions.map((condition) => (
            <div key={condition.id} className="flex items-center space-x-2 border rounded-lg p-4">
              <Checkbox
                id={condition.id}
                checked={selectedConditions.includes(condition.id)}
                onCheckedChange={() => handleConditionToggle(condition.id)}
              />
              <label
                htmlFor={condition.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {condition.label}
              </label>
            </div>
          ))}
        </div>

        {selectedConditions.length > 0 && selectedConditions[0] !== "none" && (
          <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <Lightbulb className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <p className="text-sm text-yellow-800">We will find you plans that cover your condition.</p>
          </div>
        )}

        <div className="flex items-center justify-between py-4">
          <label htmlFor="whatsapp" className="text-sm font-medium">
            Get Updates on WhatsApp
          </label>
          <Switch
            id="whatsapp"
            checked={whatsappUpdatesState}
            onCheckedChange={(checked) => {
              setWhatsappUpdatesState(checked)
              setMedicalHistory(selectedConditions, checked)
            }}
          />
        </div>
      </div>

      <Button
        onClick={() =>
          onContinue({
            conditions: selectedConditions,
            whatsappUpdates: whatsappUpdatesState,
          })
        }
        className="w-full mt-6 flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  )
}


