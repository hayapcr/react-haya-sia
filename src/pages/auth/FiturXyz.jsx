import PageHeader from "../../components/PageHeader";

export default function FiturXyz() {
  const hotIssues = [
    { id: 1, isu: "Transformasi Digital UMKM", kategori: "Ekonomi", status: "Trending" },
    { id: 2, isu: "Pembangunan IKN Fase Lanjutan", kategori: "Infrastruktur", status: "Hot" },
    { id: 3, isu: "Kebijakan Energi Baru Terbarukan", kategori: "Lingkungan", status: "Populer" },
    { id: 4, isu: "Stabilitas Harga Pangan Nasional", kategori: "Ekonomi", status: "Hot" },
    { id: 5, isu: "Pengembangan Talenta AI Lokal", kategori: "Teknologi", status: "Trending" },
    { id: 6, isu: "Reformasi Sistem Kesehatan", kategori: "Kesehatan", status: "Populer" },
    { id: 7, isu: "Peningkatan Kualitas Pendidikan Vokasi", kategori: "Edukasi", status: "Populer" },
    { id: 8, isu: "Isu Keamanan Siber Nasional", kategori: "Teknologi", status: "Hot" },
    { id: 9, isu: "Subsidi Transportasi Publik", kategori: "Transportasi", status: "Trending" },
    { id: 10, isu: "Pelestarian Budaya di Era Digital", kategori: "Sosial", status: "Populer" },
  ];

  return (
    <div className="p-6 bg-[#f0f4f8] min-h-screen font-sans text-slate-900">
      <PageHeader
        title={
          <div className="flex flex-col">
            <span className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
              Fitur Xyz
            </span>
            <span className="text-sm font-medium text-slate-500 mt-1">Laporan Tren Mingguan</span>
          </div>
        }
        breadcrumb={["Dashboard", "Order List"]}
      />

      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          Top 10 Isu Nasional
        </h2>
        <div className="text-xs font-semibold px-3 py-1 bg-white rounded-full shadow-sm border border-slate-200 text-slate-500 uppercase tracking-widest">
          Mei 2026
        </div>
      </div>

      {/* --- Card Container --- */}
      <div className="mt-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-900/5 border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="px-6 py-5 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">Rank</th>
                <th className="px-6 py-5 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">Topik Isu</th>
                <th className="px-6 py-5 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 text-center">Kategori</th>
                <th className="px-6 py-5 bg-slate-50/50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {hotIssues.map((item, index) => (
                <tr key={item.id} className="group hover:bg-blue-50/30 transition-all duration-200">
                  <td className="px-6 py-4">
                    <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold ${
                      index < 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[15px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors cursor-default">
                      {item.isu}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-tight text-slate-500 bg-slate-100 border border-slate-200 rounded-md">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                      item.status === 'Hot' 
                        ? 'bg-red-50 text-red-600 ring-red-500/20' : 
                      item.status === 'Trending' 
                        ? 'bg-blue-50 text-blue-600 ring-blue-500/20' : 
                          'bg-emerald-50 text-emerald-600 ring-emerald-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${
                        item.status === 'Hot' ? 'bg-red-500' : 
                        item.status === 'Trending' ? 'bg-blue-500' : 
                        'bg-emerald-500'
                      }`}></span>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-slate-50/80 p-4 text-center border-t border-slate-100">
          <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-all">
            Lihat Analisis Detail &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}