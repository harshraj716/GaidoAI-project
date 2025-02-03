"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Download, Home } from "lucide-react"
import type { Member } from "../../store/useInsuranceStore"
import { useState } from "react"
import jsPDF from "jspdf"

interface SubmissionCompleteProps {
  formData: {
    gender: string
    members: Member[]
    city: string
    conditions: string[]
    whatsappUpdates: boolean
  }
  onMainMenu: () => void
}

export default function SubmissionComplete({ formData, onMainMenu }: SubmissionCompleteProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true)

    const pdf = new jsPDF()
    let yOffset = 20

    // Add title
    pdf.setFontSize(20)
    pdf.text("Insurance Application Summary", 20, yOffset)
    yOffset += 15

    // Add form data
    pdf.setFontSize(12)
    pdf.text(`Gender: ${formData.gender}`, 20, yOffset)
    yOffset += 10

    pdf.text(`City: ${formData.city}`, 20, yOffset)
    yOffset += 10

    pdf.text("Members:", 20, yOffset)
    yOffset += 10
    formData.members.forEach((member, index) => {
      pdf.text(`  ${index + 1}. ${member.type} (Age: ${member.age || "N/A"})`, 20, yOffset)
      yOffset += 10
    })

    pdf.text("Medical Conditions:", 20, yOffset)
    yOffset += 10
    if (formData.conditions.length > 0) {
      formData.conditions.forEach((condition, index) => {
        pdf.text(`  ${index + 1}. ${condition}`, 20, yOffset)
        yOffset += 10
      })
    } else {
      pdf.text("  None reported", 20, yOffset)
      yOffset += 10
    }

    pdf.text(`WhatsApp Updates: ${formData.whatsappUpdates ? "Yes" : "No"}`, 20, yOffset)

    // Save and download the PDF
    pdf.save("insurance_application.pdf")

    setIsGeneratingPDF(false)
  }

  return (
    <>
      <div className="flex items-center justify-center mb-8">
        <div className="bg-green-100 rounded-full p-3">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Application Submitted Successfully</h1>

      <Card className="p-6 mb-6">
        <p className="text-center text-gray-600">
          Thank you for submitting your insurance application. Our team will review your information and contact you
          shortly with personalized recommendations.
        </p>
      </Card>

      <div className="space-y-4">
        <Button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className="w-full">
          {isGeneratingPDF ? (
            "Generating PDF..."
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Download Application PDF
            </>
          )}
        </Button>

        <Button onClick={onMainMenu} variant="outline" className="w-full">
          <Home className="mr-2 h-4 w-4" /> Return to Main Menu
        </Button>
      </div>
    </>
  )
}


