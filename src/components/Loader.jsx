export default function Loader({ text = "Loading..." }) {
  return (
    <div className="text-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7329ce] mx-auto mb-6"></div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{text}</h3>
      <p className="text-gray-600">Please wait...</p>
    </div>
  )
}
