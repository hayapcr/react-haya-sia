export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      
      <div className="bg-white w-96 rounded-lg p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>

        <div className="mb-4">
          {children}
        </div>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tutup
        </button>

      </div>

    </div>
  );
}