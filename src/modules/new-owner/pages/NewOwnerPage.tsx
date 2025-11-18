import { useState } from "react";
import { addOwnerApi } from "../api/owner.api";
import AddOwnerForm from "../components/AddOwnerForm";
import type { CreateUserFormData } from "../../../types/userFormData";
import CreatedUserInfo from "../components/CreatedUserInfo";

const defaultValues: CreateUserFormData = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  role_id: 2, // Owner
};

const NewOwnerPage = () => {
  const [formData, setFormData] = useState<CreateUserFormData>(defaultValues);
  const [createdUser, setCreatedUser] = useState<CreateUserFormData>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await addOwnerApi(formData, setFormData, setCreatedUser);
    setLoading(false);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Form */}
      <AddOwnerForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={loading}
      />

      {/* Created User Info */}
      {createdUser && <CreatedUserInfo user={createdUser} />}
    </div>
  );
};

export default NewOwnerPage;
