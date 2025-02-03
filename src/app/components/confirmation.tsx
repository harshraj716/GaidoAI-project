"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ChevronLeft, User } from "lucide-react"
import type { Member } from "./insurance-form"

interface ConfirmationProps {
  formData: {
    gender: string
    members: Member[]
    city: string
    conditions: string[]
    whatsappUpdates: boolean
  }
  onBack: () => void
  onSubmit: () => void
}

export default function Confirmation({ formData, onBack, onSubmit }: ConfirmationProps) {
  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Confirm Your Details</h1>
      </div>

      <div className="space-y-6">
        {/* Members Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Family Members</h2>
          <div className="space-y-3">
            {formData.members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    member.type === "self"
                      ? "bg-blue-100"
                      : member.type === "wife"
                        ? "bg-pink-100"
                        : member.type === "son"
                          ? "bg-green-100"
                          : member.type === "daughter"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                  }`}
                >
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium capitalize">{member.type}</p>
                  <p className="text-sm text-gray-600">{member.age} years</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <p>{formData.city}</p>
        </Card>

        {/* Medical Conditions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Medical History</h2>
          {formData.conditions.length === 0 || formData.conditions[0] === "none" ? (
            <p>No pre-existing conditions</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.conditions.map((condition) => (
                <span key={condition} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {condition}
                </span>
              ))}
            </div>
          )}
        </Card>

        {/* Communication Preference */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Communication</h2>
          <p>WhatsApp updates: {formData.whatsappUpdates ? "Enabled" : "Disabled"}</p>
        </Card>

        {/* Success Message */}
        <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">
            Great! We have found several plans that match your requirements. Our team will contact you shortly with
            personalized recommendations.
          </p>
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full mt-6">
        Submit Application
      </Button>
    </>
  )
}

