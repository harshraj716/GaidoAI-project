"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Plus, User } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Member, Gender } from "../../store/useInsuranceStore"

interface MemberSelectionProps {
  gender: Gender
  setGender: (gender: Gender) => void
  members: Member[]
  setMembers: (members: Member[]) => void
  onContinue: () => void
}

export default function MemberSelection({ gender, setGender, members, setMembers, onContinue }: MemberSelectionProps) {
  const [showMore, setShowMore] = useState(false)

  const toggleMember = (type: Member["type"]) => {
    const existingMember = members.find((m) => m.type === type)
    if (existingMember) {
      setMembers(members.filter((m) => m.type !== type)) // Deselect member
    } else {
      setMembers([...members, { type, id: `${type}-${Date.now()}` }]) // Select member
    }
  }

  const addChild = (type: "son" | "daughter") => {
    setMembers([...members, { type, id: `${type}-${Date.now()}` }])
  }

  const isMemberSelected = (type: Member["type"]) => members.some((m) => m.type === type)

  const getChildCount = (type: "son" | "daughter") => members.filter((m) => m.type === type).length

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Find the best plan for your family</h1>

      <div className="flex justify-center gap-4 mb-8">
        <Button variant={gender === "male" ? "default" : "outline"} onClick={() => setGender("male")} className="w-24">
          Male
        </Button>
        <Button
          variant={gender === "female" ? "default" : "outline"}
          onClick={() => setGender("female")}
          className="w-24"
        >
          Female
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Select members you want to insure</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Self - Now toggleable like other members */}
          <div className="flex gap-2">
            <Button
              variant={isMemberSelected("self") ? "default" : "outline"}
              onClick={() => toggleMember("self")}
              className="flex-1 justify-start gap-2"
            >
              <User className="h-5 w-5" />
              Self
            </Button>
          </div>

          {/* Wife */}
          <Button
            variant={isMemberSelected("wife") ? "default" : "outline"}
            onClick={() => toggleMember("wife")}
            className="w-full justify-start gap-2"
          >
            <User className="h-5 w-5" />
            Wife
          </Button>

          {/* Son with add button */}
          <div className="flex gap-2">
            <Button
              variant={isMemberSelected("son") ? "default" : "outline"}
              onClick={() => toggleMember("son")}
              className="flex-1 justify-start gap-2"
            >
              <User className="h-5 w-5" />
              Son {getChildCount("son") > 0 && `(${getChildCount("son")})`}
            </Button>
            {isMemberSelected("son") && (
              <Button variant="outline" size="icon" onClick={() => addChild("son")} className="px-2">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Daughter with add button */}
          <div className="flex gap-2">
            <Button
              variant={isMemberSelected("daughter") ? "default" : "outline"}
              onClick={() => toggleMember("daughter")}
              className="flex-1 justify-start gap-2"
            >
              <User className="h-5 w-5" />
              Daughter {getChildCount("daughter") > 0 && `(${getChildCount("daughter")})`}
            </Button>
            {isMemberSelected("daughter") && (
              <Button variant="outline" size="icon" onClick={() => addChild("daughter")} className="px-2">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Parents */}
          <Button
            variant={isMemberSelected("father") ? "default" : "outline"}
            onClick={() => toggleMember("father")}
            className="w-full justify-start gap-2"
          >
            <User className="h-5 w-5" />
            Father
          </Button>

          <Button
            variant={isMemberSelected("mother") ? "default" : "outline"}
            onClick={() => toggleMember("mother")}
            className="w-full justify-start gap-2"
          >
            <User className="h-5 w-5" />
            Mother
          </Button>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => setShowMore(!showMore)}
        className="w-full mt-4 flex items-center justify-center gap-2"
      >
        More members
        <ChevronDown className={`h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
      </Button>

      <Button
        onClick={onContinue}
        disabled={members.length === 0}
        className="w-full mt-6 flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight className="h-4 w-4" />
      </Button>

      <p className="text-sm text-gray-500 text-center mt-4">
        By clicking on Continue, you agree to our{" "}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>
        ,{" "}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Use
        </Link>{" "}
        &{" "}
        <Link href="/disclaimer" className="text-blue-600 hover:underline">
          Disclaimer
        </Link>
      </p>
    </>
  )
}



