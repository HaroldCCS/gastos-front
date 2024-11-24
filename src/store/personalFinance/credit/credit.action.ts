import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'credit'


const addMany = createAction<Interface[]>(`${fn_name}/addMany`)
const add = createAction<Interface>(`${fn_name}/add`)
const changeStatus = createAction<{_id: string, status: Interface.Status}>(`${fn_name}/changeStatus`)
const update = createAction<Interface>(`${fn_name}/update`)
const delete_action = createAction<string>(`${fn_name}/delete`)
const delete_all = createAction(`${fn_name}/deleteAll`)

export default{
  addMany,
  add,
  changeStatus,
  delete: delete_action,
  delete_all,
  update
}
