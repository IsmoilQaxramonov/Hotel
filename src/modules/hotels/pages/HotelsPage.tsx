// HotelsPage.tsx
import { useEffect, useState } from "react";
import { http } from "../../../services";

interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  items: Hotel[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  search: string;
  sorted_by: string;
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await http.get<ApiResponse>("hotels", {
        params: { page, page_size: pageSize },
      });

      setHotels(res.data.items || []);
      setTotalPages(res.data.total_pages > 0 ? res.data.total_pages : 1);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setHotels([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  // POST — Create hotel
  const addHotel = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await http.post("hotels", {
        name,
        address,
        description,
      });

      // Formni tozalaymiz
      setName("");
      setAddress("");
      setDescription("");

      // Listni yangilaymiz
      fetchHotels();
    } catch (err) {
      console.error("Error creating hotel:", err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "15px", textAlign: "center" }}>Hotels List</h1>

      {/* Add Hotel Form */}
      <form
        onSubmit={addHotel}
        style={{
          marginBottom: "25px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Add New Hotel</h3>

        <input
          type="text"
          placeholder="Hotel name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ ...inputStyle, height: "80px", resize: "vertical" }}
        />

        <button type="submit" style={btnStyle}>
          ➕ Add Hotel
        </button>
      </form>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {!loading && hotels.length === 0 && (
        <p style={{ textAlign: "center" }}>No hotels found.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            style={{
              padding: "15px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0" }}>{hotel.name}</h3>
            <p style={{ margin: "0 0 5px 0", fontWeight: 500 }}>
              {hotel.address}
            </p>
            <p style={{ margin: 0, color: "#555" }}>{hotel.description}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          disabled={page <= 1 || loading}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          style={btnStyle}
        >
          ⬅ Prev
        </button>

        <span style={{ alignSelf: "center" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages || loading}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          style={btnStyle}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "8px 16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  cursor: "pointer",
  background: "#f5f5f5",
  transition: "all 0.2s",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};
