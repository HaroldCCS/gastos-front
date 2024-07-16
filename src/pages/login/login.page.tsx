import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebasea/firebase_credentials';


import loginService from 'services/auth/login.service';
import tokenAction from 'store/auth/token/token.action';
import { useAppDispatch } from 'store';
import userAction from 'store/auth/user/user.action';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc'; // Importa el logo de Google

import styles from './index.module.scss';
import LoaderGoogleComponent from '../../components/loaders/loaderV2/loaderGoogle.component';
import MoneyHistoryService from 'services/myMoneyHistory/moneyHistory.service';
import myMoneyHistoryAction from 'store/personalFinance/myMoneyHistory/myMoneyHistory.action';


const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();


	const [loading, setLoading] = useState(false);

	const handleLoginWithGoogle = async () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);

		const email = result?.user?.email;
		if (email) {
			const resposne = await loginService.loginWithGoogle(email);
			const user = resposne?.user;
			const token = resposne?.access_token;
			if (user && token) {
				dispatch(userAction.set(user))
				dispatch(tokenAction.set(token))
				//redirect to home
				//hacer codigo para redireccionar a la pagina de inicio

				const service = new MoneyHistoryService(user, token);
				const response = await service.getAllByUser();
				if (response) dispatch(myMoneyHistoryAction.addMany(response));

				navigate(ROUTES.PRINCIPAL_PAGE_ROUTE);
				return;
			}
		}
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'No se pudo iniciar sesión con Google',
		});
		setLoading(false);
	}


	// const doSignOut = async () => {
	//     const response = await auth.signOut();
	//     console.log('doSignOut', response);
	// }

	return (
		<div className={styles.main}>
			{loading && <LoaderGoogleComponent />}
			{!loading &&
				<button className={styles.signin} onClick={handleLoginWithGoogle} disabled={loading}>
					<FcGoogle className={styles.googleLogo} />
					Inicia sesión con Google
				</button>
			}
		</div>
	)
}

export default LoginPage
