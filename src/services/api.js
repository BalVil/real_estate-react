import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_ARCGIS}`,
});

export const getProperties = async () => {
  try {
    const res = await api.get("/properties/all", { timeout: 10 * 1000 });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }

    if (res.status < 200 || res.status >= 300) {
      throw new Error(`Unexpected status code: ${res.status}`);
    }

    return res.data;
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const getProperty = async (id) => {
  try {
    const res = await api.get(`/properties/${id}`, { timeout: 10 * 1000 });

    if (res.status === 400 || res.status === 500) {
      throw res.data;
    }

    return res.data;
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const createProperty = async (data, token) => {
  try {
    await api.post(
      "/properties/create",
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    toast.error("Something went wrong while creating property");
    throw err;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    toast.error("Email in use. Please try again");
    throw err;
  }
};

export const fetchCurrentUser = async (email, token) => {
  try {
    const { data } = await api.post(
      `/user/current`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/visit/${propertyId}`,
      {
        email,
        id: propertyId,
        date,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const changeFavoriteStatus = async (id, email, token) => {
  try {
    await api.post(
      `/user/favorite/${id}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    toast.error("Something went wrong");
    throw err;
  }
};

export const getFavorites = async (email, token) => {
  if (!token) return;

  try {
    const res = await api.post(
      `/user/favorites`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data["favProperties"];
  } catch (err) {
    toast.error("Something went wrong while fetching favorites");
    throw err;
  }
};

export const getBookings = async (email, token) => {
  if (!token) return;

  try {
    const res = await api.post(
      "/user/bookings",
      { email },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return res.data["bookedVisits"];
  } catch (err) {
    toast.error("Something went wrong while fetching bookings");
    throw err;
  }
};
