export default function Avatar({ name }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm">
      {name.charAt(0)}
    </div>
  );
}