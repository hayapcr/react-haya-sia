export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">

      <table className="w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left font-semibold border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">
          {children}
        </tbody>

      </table>

    </div>
  );
}