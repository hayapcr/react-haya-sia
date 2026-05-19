export default function Alert({ type = "info", message }) {
  const colors = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <div className={`px-4 py-3 rounded-lg mb-3 ${colors[type]}`}>
      {message}
    </div>
  );
}