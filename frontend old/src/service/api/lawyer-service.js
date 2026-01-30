import api from "../api/axios";


// Get all cases
export const getAllCases = async () => {
  const response = await api.get("lawyer");
  return response.data;
};


export const getMyProfile = async () => {
  const res = await api.get("/lawyer/me");
  return res.data;
};

// Get case by ID
export const getCaseById = async (caseId) => {
  const response = await api.get(`/lawyer/${caseId}`);
  return response.data;
};

export const getPendingIntakes = async ({ page = 1, limit = 10 } = {}) => {
  return api.get("/lawyer/intakes", {
    params: {
      page,
      limit,
    },
  });
};

export const addReview = async(intakeId, review)=>{
  const resp = await api.post(`lawyer/intakes/${intakeId}/comment`,review);
  return resp.data;
}
