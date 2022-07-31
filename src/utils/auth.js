import { get, set, remove } from "./storage"

const TOKEN_KEY = 'TOUTIAO_SER'

export const getItem = () => get(TOKEN_KEY)

export const setItem = (value) => set(TOKEN_KEY, value)

export const removeItem = () => remove(TOKEN_KEY)