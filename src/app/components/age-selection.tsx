"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Member } from "../../store/useInsuranceStore"

interface AgeSelectionProps {
  members: Member[]
  setMembers: (members: Member[]) => void
  onBack: () => void
  onContinue: () => void
}

export default function AgeSelection({ members, setMembers, onBack, onContinue }: AgeSelectionProps) {
  const updateMemberAge = (memberId: string, age: number) => {
    setMembers(members.map((member) => (member.id === memberId ? { ...member, age } : member)))
  }

  const getAgeOptions = (memberType: Member["type"]) => {
    let minAge = 0
    let maxAge = 100

    switch (memberType) {
      case "self":
      case "wife":
        minAge = 18
        maxAge = 100
        break
      case "son":
      case "daughter":
        minAge = 0
        maxAge = 25
        break
      case "father":
      case "mother":
        minAge = 35
        maxAge = 100
        break
    }

    return Array.from({ length: maxAge - minAge + 1 }, (_, i) => i + minAge)
  }

  const getMemberLabel = (member: Member, index: number) => {
    switch (member.type) {
      case "self":
        return "Your age"
      case "wife":
        return "Wife's age"
      case "son":
        return members.filter((m) => m.type === "son").length > 1 ? `Son ${index + 1}'s age` : "Son's age"
      case "daughter":
        return members.filter((m) => m.type === "daughter").length > 1
          ? `Daughter ${index + 1}'s age`
          : "Daughter's age"
      case "father":
        return "Father's age"
      case "mother":
        return "Mother's age"
    }
  }

  const getMemberTypeIndex = (member: Member) => {
    return members.filter((m) => m.type === member.type).findIndex((m) => m.id === member.id)
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Select age of covered member(s)</h1>
      </div>

      <div className="space-y-6">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-4">
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
              👤
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {getMemberLabel(member, getMemberTypeIndex(member))}
              </label>
              <Select
                value={member.age?.toString()}
                onValueChange={(value) => updateMemberAge(member.id, Number.parseInt(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select age" />
                </SelectTrigger>
                <SelectContent>
                  {getAgeOptions(member.type).map((age) => (
                    <SelectItem key={age} value={age.toString()}>
                      {age} yr
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onContinue} className="w-full mt-6 flex items-center justify-center gap-2">
        Continue
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  )
}

