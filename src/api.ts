import axios from "axios";

const API_URL = "https://ztbm3dqt-5000.inc1.devtunnels.ms/api/projects"; // Backend URL

export const fetchProjects = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const fetchProjectById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const submitProject = async (projectData: any) => {
  const res = await axios.post(API_URL, projectData);
  return res.data;
};

export const fetchAllProjects = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
