import { http } from "../../../services";

export interface Hotel {
  id: number;
  name: string;
  address: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
export interface HotelForm {
  name: string;
  address: string;
  description: string;
}
export interface ApiResponse {
  items: Hotel[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
export interface HotelResponse {
  items: Hotel[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
export interface Floor {
  id: number;
  number: number;
  building_id: number;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface FloorsApiResponse {
  items: Floor[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface Building {
  id: number;
  name: string;
  user_id: number;
  hotel_id: number;
  description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BuildingsApiResponse {
  items: Building[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface BuildingForm {
  name: string;
  user_id: number;
  hotel_id: number;
  description: string;
}

// Backendga so‘rov yuboradigan funksiya
export const fetchHotelsApi = (page: number, pageSize: number) => {
  return http.get<ApiResponse>("hotels", {
    params: { page, page_size: pageSize },
  });
};

// POST bilan yangi hotel qo‘shish
export const addHotelApi = (data: {
  name: string;
  address: string;
  description: string;
}) => {
  return http.post<Hotel>("hotels/", data);
};

// GET Floors
export const getFloors = async (page: number, page_size: number) => {
  const res = await http.get<FloorsApiResponse>("floors", {
    params: { page, page_size },
  });
  return res.data;
};

// POST Floor
export const createFloor = async (floor: {
  number: number;
  building_id: number;
  description: string;
}) => {
  const res = await http.post("floors", floor);
  return res.data;
};

export const getBuildings = async (page: number, page_size: number) => {
  const res = await http.get<BuildingsApiResponse>("buildings", {
    params: { page, page_size },
  });
  return res.data;
};

// POST Building
export const createBuilding = async (building: {
  name: string;
  user_id: number;
  hotel_id: number;
  description: string;
}) => {
  const res = await http.post("buildings", building);
  return res.data;
};

// Update hotel
export const updateHotelApi = (id: number, data: HotelForm) => {
  return http.put(`hotels/${id}/`, data);
};

// Delete hotel
export const deleteHotelApi = (id: number) => {
  return http.delete(`hotels/${id}/`);
};

// PATCH Update Building
export const updateBuilding = async (
  id: number,
  data: Omit<BuildingForm, "hotel_id">
) => {
  const res = await http.patch(`buildings/${id}`, data);
  return res.data;
};

// DELETE Building
export const deleteBuilding = async (id: number) => {
  const res = await http.delete(`buildings/${id}`);
  return res.data;
};

export const deleteFloor = async (id: number) => {
  const res = await http.delete(`floors/${id}`);
  return res.data;
};
