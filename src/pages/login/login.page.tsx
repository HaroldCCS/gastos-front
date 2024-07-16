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
			{loading && <GoogleLoading />}
			{!loading &&
				<button className={styles.signin} onClick={handleLoginWithGoogle} disabled={loading}>
					<FcGoogle className={styles.googleLogo} />
					Inicia sesión con Google
				</button>
			}
		</div>
	)
}


const GoogleLoading: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.blue}></div>
			<div className={styles.red}></div>
			<div className={styles.yellow}></div>
			<div className={styles.green}></div>
		</div>
	);
}

export default LoginPage
