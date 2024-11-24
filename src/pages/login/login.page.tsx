import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebasea/firebase_credentials';


import loginService from 'services/auth/login.service';
import tokenAction from 'store/auth/token/token.action';
import { useAppDispatch } from 'store';
import userAction from 'store/auth/user/user.action';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'resources/routes-constants';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc'; // Importa el logo de Google

import styles from './index.module.scss';
import LoaderGoogleComponent from '../../components/loaders/loaderV2/loaderGoogle.component';
import { Fade } from 'react-awesome-reveal';
import { AlertLink, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputComponent from '../../components/inputForm/input.component';
import MoneyHistoryService from 'services/myMoneyHistory/moneyHistory.service';
import myMoneyHistoryAction from 'store/personalFinance/myMoneyHistory/myMoneyHistory.action';
import NotificationService from 'services/notification.service';
import notificationAction from 'store/app/notification/notification.action';



const LoginPage: React.FC = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div className={styles.main}>
			<Fade cascade duration={500} className='d-flex justify-content-center align-items-center' direction='up'>
				{isLogin ? <LoginComponent goToRegister={() => setIsLogin(false)} /> : <RegisterComponent goToLogin={() => setIsLogin(true)} />}
			</Fade>
		</div>
	)
}

const useHookLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const postLogin = async (response: any, ignoreError?: boolean) => {
		if (response?.error && !ignoreError) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: response?.error,
			});
		}

		if (response?.access_token) {
			const user = response?.user;
			const token = response?.access_token;
			if (user && token) {
				dispatch(userAction.set(user))
				dispatch(tokenAction.set(token))


				await Promise.all([
					(async () => {
						const service = new NotificationService(user, token);
						const response = await service.getByUser();
						if (response) dispatch(notificationAction.set_many(response));
					})(),
					(async () => {
						const service = new MoneyHistoryService(user, token);
						const response = await service.getAllByUser();
						if (response) dispatch(myMoneyHistoryAction.addMany(response));
					})(),
				])

				navigate(ROUTES.PRINCIPAL_PAGE_ROUTE);
				return;
			}
		}
	}

  return {
    postLogin
  }
}


const LoginComponent: React.FC<{ goToRegister: () => void }> = (props: { goToRegister: () => void }) => {
	const { postLogin } = useHookLogin()

	const [loading, setLoading] = useState(false);
	const [validated, setValidated] = useState(false);

	//Formulario
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const handleLoginWithGoogle = async () => {
		setLoading(true);
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);

		const email = result?.user?.email;
		if (email) {
			const resposne = await loginService.loginWithGoogle(email);
			postLogin(resposne)
		}

		setLoading(false);
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const form = event.currentTarget;
		if (form.checkValidity()) {
			setLoading(true);
			const resposne = await loginService.login(email, password);
			postLogin(resposne)
			setLoading(false);
	
			setValidated(true);
		}
	};

	if (loading) return <div className={styles.container}><LoaderGoogleComponent /></div>

	return (<div className={styles.container}>
		<h1 className={styles.h1}>Inicia sesión con tu correo y contraseña</h1>

		<Form className="d-flex justify-content-center flex-wrap gap-3" onSubmit={handleSubmit} validated={validated}>

			<InputComponent required label="Correo" set={setEmail} value={email} type="email" />
			<InputComponent required label="Contraseña" set={setPassword} value={password} type="password" minLength={4} />

			<Button variant="primary" type="submit" className={styles.button}>Iniciar sesión</Button>
		</Form>

		<h1 className={styles.h1}>o</h1>

		<button className={styles.signin} onClick={handleLoginWithGoogle} disabled={loading}>
			<FcGoogle className={styles.googleLogo} />
			Inicia sesión con Google
		</button>

		<AlertLink onClick={() => props.goToRegister()}>Da clic aquí para registrarte</AlertLink>
	</div>)
}

const RegisterComponent: React.FC<{ goToLogin: () => void }> = (props: { goToLogin: () => void }) => {
	const { postLogin } = useHookLogin()

	const [validated, setValidated] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isGoogleData, setIsGoogleData] = useState(false);

	//Formulario
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const handleLoginWithGoogle = async () => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			const resposne = await loginService.loginWithGoogle(result?.user?.email as string);
			postLogin(resposne, true)

			setName(result?.user?.displayName || '');
			setEmail(result?.user?.email || '');
			setIsGoogleData(true);

		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'No se pudo Registrar con Google',
			});
		} finally {
			setLoading(false);
		}
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		if (form.checkValidity()) {
			setLoading(true);
			const resposne = await loginService.register(name, email, password);
			postLogin(resposne)

			setLoading(false);
			setValidated(true);
		}
	};


	if (loading) return <div className={styles.container}><LoaderGoogleComponent /></div>

	return (<div className={styles.container}>
		<h1 className={styles.h1}> {isGoogleData ? "Termina de ingresar tus datos basicos para continuar" : "Ingresa los datos de tu nueva cuenta"} </h1>

		<Form className="d-flex justify-content-center flex-wrap gap-3" onSubmit={handleSubmit} validated={validated}>

			<InputComponent required label="Nombre" set={setName} value={name} type="string" />
			<InputComponent required label="Correo" set={setEmail} value={email} disabled={isGoogleData} type="email" />
			<InputComponent required label="Contraseña" set={setPassword} value={password} type="password" minLength={4} />

			<Button variant="primary" type="submit" className={styles.button}> Registrarme </Button>
		</Form>


		{!isGoogleData ? <>
			<h1 className={styles.h1}>o</h1>

			<button className={styles.signin} onClick={handleLoginWithGoogle} disabled={loading}>
				<FcGoogle className={styles.googleLogo} />
				Registrarme con Google
			</button>
		</> : null}

		<AlertLink onClick={() => props.goToLogin()}>Da clic aquí para iniciar sesión</AlertLink>
	</div>)
}

export default LoginPage
