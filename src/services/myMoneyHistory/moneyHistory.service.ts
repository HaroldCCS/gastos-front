import { useDispatch } from "react-redux";
import configService from "services/config.service";
import { useAppDispatch } from "store"
import tokenAction from "store/auth/token/token.action";
import { Interface } from "store/personalFinance/myMoneyHistory";
import Swal from "sweetalert2";
import CustomAxios from "utility/customAxios";


export default class MoneyHistoryService {
  private token = '';
  private user_id = '';
  private path = configService.host + "/money-history";

  constructor(user?: Interface, token?: string) {
    const data = JSON.parse(localStorage.getItem('persist:root')  || '{}')
    this.token = token || JSON.parse(data.token).token;
    this.user_id = user?._id || JSON.parse(data.user)?.user?._id;
  }


  async create(data: Partial<Interface>): Promise<any> {
    try {
      data['user'] = this.user_id;
      const response = await CustomAxios({ method: 'POST', url: this.path, data, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data?._id) throw response

      return response?.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo ha salido mal',
      });
    }
  }


  async edit(data: Partial<Interface>): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'PATCH', url: this.path + "/" + data._id, data, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data?._id) throw response

      return response?.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo ha salido mal',
      });
    }
  }


  async getAllByUser(): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'GET', url: this.path + "/by-user/" + this.user_id, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data) throw response

      return response?.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo ha salido mal',
      });
    }
  }


  async delete(_id: string): Promise<any> {
    try {
      const response = await CustomAxios({ method: 'DELETE', url: this.path + '/' + _id, headers: { 'Authorization': `Bearer ${this.token}` } })
      if (!response?.data?._id) throw response

      return response?.data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo ha salido mal',
      });
    }
  }
}
