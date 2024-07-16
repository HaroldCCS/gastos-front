import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'home'


const add = createAction<Interface>(`${fn_name}/add`)
const delete_all = createAction(`${fn_name}/deleteAll`)

export default{
  add,
  delete_all
}