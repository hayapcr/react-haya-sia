export default function FeatureSection() {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Fitur Utama
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-4 border rounded-lg">
          <h3 className="font-bold mb-2">Cepat</h3>
          <p className="text-gray-600">Aplikasi berjalan dengan performa tinggi.</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-bold mb-2">Reusable</h3>
          <p className="text-gray-600">Component bisa digunakan ulang.</p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-bold mb-2">Modern</h3>
          <p className="text-gray-600">Menggunakan React dan Tailwind CSS.</p>
        </div>

      </div>

    </section>
  );
}