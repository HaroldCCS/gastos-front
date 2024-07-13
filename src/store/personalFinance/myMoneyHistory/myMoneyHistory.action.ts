import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'myMoneyHistory'


const add = createAction<Interface>(`${fn_name}/add`)
const changeStatus = createAction<{_id: string, status: Interface.Status}>(`${fn_name}/changeStatus`)


export default{
  add,
  changeStatus
}
