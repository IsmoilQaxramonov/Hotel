import { http } from "../../../services";
import type { CreateUserFormData } from "../../../types/userFormData";

export const addOwnerApi = async (
  formData: CreateUserFormData,
  setUser: (data: CreateUserFormData) => void,
  setCreatedData: (data: CreateUserFormData) => void
) => {
  try {
    const res = await http.post("auth/create-new-user/", formData);
    setUser(res.data)
    setCreatedData(formData)
  } catch (err) {
    console.log(err);
  }
};
