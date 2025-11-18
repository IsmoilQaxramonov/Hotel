import { useEffect, useState } from "react";
import { X, Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getBuildings,
  createBuilding,
  updateBuilding,
  deleteBuilding,
} from "../api/hotel.api";

interface Building {
  id: number;
  name: string;
  user_id: number;
  hotel_id: number;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);

  const [name, setName] = useState("");
  const [userId, setUserId] = useState<number | "">("");
  const [hotelId, setHotelId] = useState<number | "">("");
  const [description, setDescription] = useState("");

  // Button loaders
  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const res = await getBuildings(page, pageSize);
      setBuildings(
        (res.items || []).map((b) => ({
          ...b,
          deleted_at: b.deleted_at ?? "",
        }))
      );
      setTotalPages(res.total_pages || 1);
    } catch {
      setBuildings([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, [page]);

  const openAddModal = () => {
    setEditingBuilding(null);
    setName("");
    setUserId("");
    setHotelId("");
    setDescription("");
    setModalOpen(true);
  };

  const openEditModal = (b: Building) => {
    setEditingBuilding(b);
    setName(b.name);
    setUserId(b.user_id);
    setHotelId(b.hotel_id);
    setDescription(b.description);
    setModalOpen(true);
  };

  const saveBuilding = async () => {
    setBtnLoading(true);
    try {
      if (editingBuilding) {
        await updateBuilding(editingBuilding.id, {
          name,
          description,
          user_id: Number(userId),
        });
      } else {
        await createBuilding({
          name,
          description,
          user_id: Number(userId),
          hotel_id: Number(hotelId),
        });
      }
      setModalOpen(false);
      fetchBuildings();
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;
    setDeleteId(id);
    try {
      await deleteBuilding(id);
      fetchBuildings();
    } catch (err) {
      console.log("Delete error:", err);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Binolar
        </h1>
        <button
          onClick={openAddModal}
          className={`px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center`}
        >
          {btnLoading && !editingBuilding ? (
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
      {!loading && buildings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🏢</span>
          </div>
          <p className="text-gray-400 text-lg">Bino topilmadi</p>
        </div>
      )}

      {/* BUILDING CARDS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {buildings.map((b) => (
          <div
            key={b.id}
            className="group bg-white rounded-xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 overflow-hidden relative"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {b.name}
                  </h3>
                </div>
                <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2 py-1 rounded-md">
                  #{b.id}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-500 flex items-start gap-2">
                  <span className="text-gray-400">👤</span>
                  <span>User ID: {b.user_id}</span>
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {b.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100">
                <span>Yaratilgan</span>
                <span>{new Date(b.created_at).toLocaleDateString()}</span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(b)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600  rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-1"
                  disabled={btnLoading && editingBuilding?.id === b.id}
                >
                  {btnLoading && editingBuilding?.id === b.id && (
                    <span className="loader-border mr-2"></span>
                  )}
                  <Pencil size={16} /> Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-1"
                  disabled={deleteId === b.id}
                >
                  {deleteId === b.id && (
                    <span className="loader-border mr-2"></span>
                  )}
                  <Trash size={16} /> O'chirish
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-[scaleIn_0.25s_ease] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editingBuilding ? "Bino tahrirlash" : "Bino qo'shish"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Bino nomi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
              <input
                type="number"
                placeholder="User ID"
                value={userId}
                onChange={(e) =>
                  setUserId(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                required
              />
              {!editingBuilding && (
                <input
                  type="number"
                  placeholder="Hotel ID"
                  value={hotelId}
                  onChange={(e) =>
                    setHotelId(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                />
              )}
              <textarea
                placeholder="Ta'rif"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                required
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  disabled={btnLoading}
                >
                  Bekor qilish
                </button>
                <button
                  onClick={saveBuilding}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                  disabled={btnLoading}
                >
                  {btnLoading && <span className="loader-border mr-2"></span>}
                  Saqlash
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
