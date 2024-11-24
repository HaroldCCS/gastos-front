import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "store";
import {Interface} from 'store/personalFinance/credit/credit.redux';
import creditAction from 'store/personalFinance/credit/credit.action';
import CreditService from 'services/myMoneyHistory/credit.service';


function useCredits({ not_initialized_getAll = false }: { readonly not_initialized_getAll?: boolean } = {}) {
  const service = new CreditService();
  const dispatch = useAppDispatch();

  const credits = useAppSelector(state => state?.credit?.credit);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!not_initialized_getAll && !credits?.length) getAll()
  }, [credits])


  const getAll = async () => {
    setIsLoading(true);
    const response = await service.getAllByUser()
    if (response?.length) dispatch(creditAction.addMany(response))
    setIsLoading(false);
  }

  const add = async (data: Partial<Interface>) => {
    const new_data = await service.create(data as Interface)
    dispatch(creditAction.add(new_data as Interface))
  }

  const remove = async (_id: string) => {
    await service.delete(_id)
    dispatch(creditAction.delete(_id))
  }

  const update = async (data: Partial<Interface>) => {
    const new_data = await service.edit(data as Interface)
    dispatch(creditAction.update(new_data as Interface))
  }


  return {
    credits,

    getAll,
    add,
    remove,
    update,

    isLoadingos: isLoading
  };
}

export default useCredits;