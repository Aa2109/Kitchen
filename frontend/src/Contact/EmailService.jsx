import { api } from "../Config/Api";

export const sendEmailWithoutFile = async (reqData, jwt) => {
  const res = (
    await api.post("api/email/send-without-file", reqData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  ).data;
  return res;
};

export const sendEmailWithFile = async (formData, jwt) => {
  const res = (
    await api.post("api/email/send-with-file", formData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
  return res;
};
