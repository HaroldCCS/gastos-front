import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'user'


const set = createAction<Interface>(`${fn_name}/set`)


export default{
  set
}