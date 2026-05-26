import PageHeader from "../../components/PageHeader";

export default function FiturXyz() {
  return (
    <div className="p-4 bg-[#f5f9fc] min-h-screen">
      <PageHeader
        title={
          <span className="text-3xl font-bold text-gray-800">
            Fitur Xyz
          </span>
        }
        breadcrumb={["Dashboard", "Order List"]}
      />

      <div className="mt-10">
        <h2 className="text-2xl text-gray-800 font-medium">
          Ini Halaman Fitur Xyz
        </h2>
      </div>
    </div>
  );
}