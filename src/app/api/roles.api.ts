import { http } from "../../services";
import type { RolesType } from "../../types/roles.types";

export const getRoles = async (setRoles: (data: RolesType[]) => void) => {
  try {
    const res = await http.get("roles");
    setRoles(res.data || []);
  } catch (err) {
    console.log(err);
  }
};
