export class BaseApi {
    privateRequest = async config => {
        return axiosInstance.request(config).then(response => response.data);
      };
}