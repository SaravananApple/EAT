import axios from "axios";

class API {
  getInformation = async (end_point, queryParams) => {
    try {
      const response = await axios.get(end_point);
      return response;
    } catch (err) {
      if (err) {
        return err;
      }
    }
  };

  updateInformationById = async (id, params, end_point) => {
    try {
      const response = await axios.put(`${end_point}/${id}`, {
        data: params,
      });

      return response;
    } catch (err) {
      if (err instanceof Error) {
        return err;
      }
    }
  };

  postData = (data, end_point) => {
    return axios.post(end_point, { data: data });
  };

  loginRegisterPostData = (data, end_point) => {
    return axios.post(end_point, data);
  };

  deleteData = (id, end_point) => {
    return axios.delete(end_point + "/" + id);
  };
}

export default new API();
