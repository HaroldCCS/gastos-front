import configService from "services/config.service";
import { useAppDispatch } from "store"
import tokenAction from "store/auth/token/token.action";
import CustomAxios from "utility/customAxios";


class LoginService {
  async login(email: string, password: string): Promise<string> {
    return 'token'
  }

  async loginWithGoogle(email: string): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/auth/login-google", data: { email }})
      return response?.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async logout(): Promise<void> {
    const dispatch = useAppDispatch();
    dispatch(tokenAction.drop())
    return
  }
}

const loginService = new LoginService();
export default loginService;