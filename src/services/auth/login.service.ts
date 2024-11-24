import configService from "services/config.service";
import { useAppDispatch } from "store"
import tokenAction from "store/auth/token/token.action";
import InterfaceUser from "store/auth/user/user.redux";
import CustomAxios from "utility/customAxios";


interface LoginResponse {
  user: InterfaceUser,
  access_token: string
}

class LoginService {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/auth/login", data: { email, password }})
      return response?.data?.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async loginWithGoogle(email: string): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/auth/login-google", data: { email }})
      return response?.data?.data as LoginResponse;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async logout(): Promise<void> {
    const dispatch = useAppDispatch();
    dispatch(tokenAction.drop())
    return
  }


  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/auth/signup", data: { name, email, password }})
      return response?.data?.data;
    } catch (error: any) {
      return error?.response?.data
    }
  }
}

const loginService = new LoginService();
export default loginService;