"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState } from "react"
import { useInsuranceStore } from "../../store/useInsuranceStore"

interface CitySelectionProps {
  onBack: () => void
  onContinue: (city: string) => void
}

const popularCities = ["Mumbai", "Bangalore", "Chennai", "Delhi", "Goa", "Kochi", "Kolkata", "Mangalore", "Hyderabad"]

// Added state capitals
const stateCapitals = [
  "Amaravati", // Andhra Pradesh
  "Itanagar", // Arunachal Pradesh
  "Dispur", // Assam
  "Patna", // Bihar
  "Raipur", // Chhattisgarh
  "Panaji", // Goa
  "Gandhinagar", // Gujarat
  "Chandigarh", // Haryana
  "Shimla", // Himachal Pradesh
  "Ranchi", // Jharkhand
  "Bengaluru", // Karnataka
  "Thiruvananthapuram", // Kerala
  "Bhopal", // Madhya Pradesh
  "Mumbai", // Maharashtra
  "Imphal", // Manipur
  "Shillong", // Meghalaya
  "Aizawl", // Mizoram
  "Kohima", // Nagaland
  "Bhubaneswar", // Odisha
  "Chandigarh", // Punjab
  "Jaipur", // Rajasthan
  "Gangtok", // Sikkim
  "Chennai", // Tamil Nadu
  "Hyderabad", // Telangana
  "Agartala", // Tripura
  "Lucknow", // Uttar Pradesh
  "Dehradun", // Uttarakhand
  "Kolkata", // West Bengal
  "New Delhi", // Delhi
]

export default function CitySelection({ onBack, onContinue }: CitySelectionProps) {
  const { city, setCity } = useInsuranceStore()
  const [selectedCity, setSelectedCity] = useState<string>(city)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
    setCity(city)
    setSearchQuery(city)
    setShowSuggestions(false)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    setSelectedCity("")
    setShowSuggestions(false)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setShowSuggestions(value.length > 0)
  }

  const filteredPopularCities = popularCities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))

  const filteredStateCapitals = stateCapitals.filter(
    (city) => city.toLowerCase().includes(searchQuery.toLowerCase()) && !popularCities.includes(city),
  )

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">Select your city</h1>
      </div>

      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search city"
            className="w-full pr-10"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* City Suggestions */}
          {showSuggestions && searchQuery && (filteredStateCapitals.length > 0 || filteredPopularCities.length > 0) && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredPopularCities.length > 0 && (
                <div className="p-2">
                  <div className="text-xs font-semibold text-gray-500 px-2 py-1">Popular Cities</div>
                  {filteredPopularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {filteredStateCapitals.length > 0 && (
                <div className="p-2 border-t">
                  <div className="text-xs font-semibold text-gray-500 px-2 py-1">State Capitals</div>
                  {filteredStateCapitals.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular Cities */}
        <div className="space-y-4">
          <h2 className="text-lg text-gray-600">Popular cities</h2>
          <div className="flex flex-wrap gap-3">
            {popularCities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                onClick={() => handleCitySelect(city)}
                className="rounded-full"
              >
                {city}
              </Button>
            ))}
          </div>
        </div>

        {/* Info Message */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Building className="h-6 w-6 text-gray-600 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            This will help us in finding the network of{" "}
            <span className="font-medium text-gray-900">Cashless Hospitals in your city</span>
          </p>
        </div>
      </div>

      <Button
        onClick={() => onContinue(selectedCity)}
        disabled={!selectedCity}
        className="w-full mt-6 flex items-center justify-center gap-2"
      >
        Continue
        <ChevronRight className="h-4 w-4" />
      </Button>
    </>
  )
}


