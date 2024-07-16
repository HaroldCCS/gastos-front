import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'myMoneyHistory'


const addMany = createAction<Interface[]>(`${fn_name}/addMany`)
const add = createAction<Interface>(`${fn_name}/add`)
const changeStatus = createAction<{_id: string, status: Interface.Status}>(`${fn_name}/changeStatus`)
const delete_action = createAction<{_id: string}>(`${fn_name}/delete`)
const delete_all = createAction(`${fn_name}/deleteAll`)

export default{
  addMany,
  add,
  changeStatus,
  delete: delete_action,
  delete_all
}
