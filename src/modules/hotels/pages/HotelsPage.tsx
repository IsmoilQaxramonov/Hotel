import React, { useEffect, useState } from "react";
import {
  fetchHotelsApi,
  addHotelApi,
  updateHotelApi,
  deleteHotelApi,
} from "../api/hotel.api";
import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Button loading
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [form, setForm] = useState({ name: "", address: "", description: "" });

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await fetchHotelsApi(page, pageSize);
      setHotels(res.data.items || []);
      setTotalPages(res.data.total_pages || 1);
    } catch {
      setHotels([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingHotel(null);
    setForm({ name: "", address: "", description: "" });
    setModalOpen(true);
  };

  const openEditModal = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setForm({
      name: hotel.name,
      address: hotel.address,
      description: hotel.description,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (editingHotel) {
        await updateHotelApi(editingHotel.id, form);
      } else {
        await addHotelApi(form);
      }
      setModalOpen(false);
      fetchHotels();
    } catch (err) {
      console.log("Error saving hotel:", err);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Rostdan ham bu mehmonxonani o'chirmoqchimisiz?")) return;

    setDeleteId(id);
    // Loader uchun 3 sekund kutish
    setTimeout(async () => {
      try {
        await deleteHotelApi(id);
        fetchHotels();
      } catch (err) {
        console.log("Error deleting hotel:", err);
      } finally {
        setDeleteId(null);
      }
    }, 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Mehmonxonalar
        </h1>
        <button
          onClick={openAddModal}
          className={`px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center`}
        >
          {btnLoading && !editingHotel ? (
            <span className="loader-border mr-2"></span>
          ) : null}
          + Qo'shish
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && hotels.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🏨</span>
          </div>
          <p className="text-gray-400 text-lg">Mehmonxonalar topilmadi</p>
        </div>
      )}

      {/* HOTEL CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="group bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 overflow-hidden relative"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {hotel.name}
                </h3>
                <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">
                  #{hotel.id}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500 flex items-start gap-2">
                  <span className="text-gray-400">📍 Manzil: </span>
                  <span>{hotel.address}</span>
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {hotel.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
                <span>ID: {hotel.user_id}</span>
                <span>{new Date(hotel.created_at).toLocaleDateString()}</span>
              </div>

              {/* EDIT / DELETE BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(hotel)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 rounded-lg transition-colors duration-200 ${
                    btnLoading && editingHotel?.id === hotel.id
                      ? "opacity-60"
                      : ""
                  }`}
                  disabled={btnLoading && editingHotel?.id === hotel.id}
                >
                  {btnLoading && editingHotel?.id === hotel.id && (
                    <span className="loader-border mr-2"></span>
                  )}
                  <Pencil size={16} />
                  <span className="text-sm font-medium">Tahrirlash</span>
                </button>

                <button
                  onClick={() => handleDelete(hotel.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-colors duration-200 ${
                    deleteId === hotel.id ? "opacity-60" : ""
                  }`}
                  disabled={deleteId === hotel.id}
                >
                  {deleteId === hotel.id && (
                    <span className="loader-border mr-2"></span>
                  )}
                  <Trash size={16} />
                  <span className="text-sm font-medium">O'chirish</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page <= 1 || loading}
          onClick={() => setPage((p) => p - 1)}
          className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-gray-600 font-medium px-4 py-2 bg-gray-50 rounded-lg">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
          className="p-2 bg-white border border-gray-200 text-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-[scaleIn_0.25s_ease]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editingHotel ? "Tahrirlash" : "Qo'shish"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mehmonxona nomi
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nomi"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Manzil
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Manzil"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Ta'rif
                </label>
                <textarea
                  name="description"
                  placeholder="Ta'rif"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  disabled={btnLoading}
                >
                  {btnLoading && <span className="loader-border mr-2"></span>}
                  {editingHotel ? "Yangilash" : "Saqlash"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loader CSS */}
      <style>{`
        .loader-border {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #6366f1;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
