export default function Loading() {
  return (
    <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm w-fit">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span>Loading...</span>
    </div>
  );
}