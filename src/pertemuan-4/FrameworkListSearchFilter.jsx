import { useState } from "react";

import frameworkData from "./framework.json";

export default function FrameworkList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /*Inisialisasi DataForm*/
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedTag: "",
    /*Tambah state lain beserta default value*/
  });

  /*Inisialisasi Handle perubahan nilai input form*/
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const _selectedTag = dataForm.selectedTag.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm);

    const matchesTag = dataForm.selectedTag
      ? framework.tags.includes(dataForm.selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-8 text-white">
      {/* Header dengan Glow Effect */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-black mb-4 tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-sm">
            Tech Ecosystem
          </span>
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-lg font-light">
          Koleksi framework masa depan untuk membangun aplikasi impian.
        </p>

        <input
          type="text"
          name="searchTerm"
          placeholder="Search framework..."
          className="w-full p-2 border border-white-300 rounded mb-4 text-white"
          onChange={handleChange}
        />

        <select
          name="selectedTag"
          className="w-full p-2 border border-white-300 rounded mb-4 text-black"
          onChange={handleChange}
        >
          <option value="">All Tags</option>
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredFrameworks.map((item, idx) => (
          <div
            key={item.id}
            className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500"
          >
            {/* Background Glow saat Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />

            {/* Bagian Atas: Badge & Icon */}
            <div className="flex justify-between items-center mb-8">
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-2xl transition-transform duration-500 group-hover:rotate-12 
                    ${
                      idx % 3 === 0
                        ? "bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-cyan-500/40"
                        : idx % 3 === 1
                          ? "bg-gradient-to-tr from-fuchsia-500 to-purple-700 shadow-fuchsia-500/40"
                          : "bg-gradient-to-tr from-orange-400 to-red-600 shadow-orange-500/40"
                    }`}
              >
                {item.name.charAt(0)}
              </div>
              <span className="px-4 py-1 rounded-full border border-white/20 text-[10px] font-bold tracking-widest bg-white/5 uppercase">
                Est. {item.details.releaseYear}
              </span>
            </div>

            {/* Info Utama */}
            <h2 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
              {item.name}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light italic">
              "{item.description}"
            </p>

            {/* Developer Info */}
            <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl mb-8 border border-white/5 group-hover:bg-white/10 transition-colors">
              <div className="h-10 w-10 rounded-full bg-gradient-to-b from-gray-600 to-gray-800 flex items-center justify-center text-xs font-bold ring-2 ring-white/10">
                {item.details.developer.charAt(0)}
              </div>
              <div>
                <p className="text-[10px] text-blue-400 uppercase font-black tracking-tighter">
                  Powered By
                </p>
                <p className="text-sm font-semibold">
                  {item.details.developer}
                </p>
              </div>
            </div>

            {/* Tags & Action */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold px-3 py-1 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 group-hover:border-blue-500/30 transition-all"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>

              <a
                href={item.details.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 rounded-2xl text-center text-sm font-black tracking-widest transition-all duration-300 transform active:scale-95
                    ${
                      idx % 3 === 0
                        ? "bg-cyan-500 hover:bg-cyan-400 text-cyan-950 shadow-lg shadow-cyan-500/30"
                        : idx % 3 === 1
                          ? "bg-fuchsia-500 hover:bg-fuchsia-400 text-fuchsia-950 shadow-lg shadow-fuchsia-500/30"
                          : "bg-orange-500 hover:bg-orange-400 text-orange-950 shadow-lg shadow-orange-500/30"
                    }`}
              >
                VISIT WEBSITE →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
