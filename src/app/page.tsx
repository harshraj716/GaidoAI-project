import InsuranceForm from "@/app/components/insurance-form"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <InsuranceForm />
      </div>
    </main>
  )
}
