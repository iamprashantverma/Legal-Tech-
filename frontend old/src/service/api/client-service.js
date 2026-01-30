import api from "./axios"

//  Get logged-in client profile
export const getMyProfile = async () => {
  const res = await api.get("/client/me");
  return res.data;
};

//  Create new intake 
export const createIntake = async (formData) => {
  const res = await api.post("/client/intake", formData);
  return res.data;
};

// Get intakes of logged-in client 
export const getMyIntakes = ({ status, page = 1, limit = 10 } = {}) => {
  return api.get("/client/intakes", {
    params: {
      status,
      page,
      limit,
    },
  });
};

// Get intakes of logged-in client 
export const getMyCases= () => {
  // to be implemented
};

//  Get intake by ID
export const getIntakeById = async (id) => {
  const res = await api.get(`/client/intakes/${id}`);
  return res.data;
};
