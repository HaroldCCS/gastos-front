import { createAction } from '@reduxjs/toolkit'
import { Interface } from "./index";

const fn_name = 'home'


const add = createAction<Interface>(`${fn_name}/add`)


export default{
  add
}