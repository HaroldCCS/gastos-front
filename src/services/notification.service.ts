import CustomAxios from "utility/customAxios";
import AbstractCrudService from "./abstract-crud.service";


export default class NotificationService extends AbstractCrudService{

  constructor(user?: any, token?: string) {
    super(user, token, '/notification');
  }

  async getMyNotifications(): Promise<any> {
    return this.getByUser();
  }

  async getByUser(): Promise<any> {
    try {
      if (!this.user_id) return;
      const response = await CustomAxios({ method: 'GET', url: this.path + '/by-user/'  + this.user_id, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data?.data) throw response

      return response?.data?.data;
    } catch (error) {
      this.showError(error)
    }
  }

}
