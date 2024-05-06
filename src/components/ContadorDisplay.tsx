import React, { useEffect } from'react'
import { useAppSelector, useAppDispatch } from '../store/reducers/store';
import { incrementarContador, decrementarContador, restableserContador } from '../store/actions/contador';

function ContadorDisplay() {
  const dispatch = useAppDispatch();
  const cantidad = useAppSelector(state => state.contador.cantidad);

  const handleIncrement = () => {
    dispatch(incrementarContador(null));
  };

  const handleDecrement = () => {
    dispatch(decrementarContador(null));
  };

  const handleReset = () => {
    dispatch(restableserContador(null));
  };

  useEffect(() => {
    console.log('Cantidad:', cantidad);
  }, [cantidad]);

  return (
    <div>
      <h1>Contador</h1>
      <p>{cantidad}</p>
      <button onClick={handleIncrement}>Sumar</button>
      <button onClick={handleDecrement}>Restar</button>
      <button onClick={handleReset}>Restablecer</button>
      <hr />
    </div>
  );
}

export default ContadorDisplay;