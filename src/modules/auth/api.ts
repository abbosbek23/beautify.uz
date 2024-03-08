import axios from "axios";
import { IApi, IForm } from "./types";
import { BASE_URL } from "../../config";

export const Register = ( body : IApi.Register.Request) => axios.post<IApi.Register.Response>(`${BASE_URL}/v1/users/register`,body);
export const ActiveCode = ( body : IApi.ActiveCodes.Request) => axios.post<IApi.ActiveCodes.Response>(`${BASE_URL}/v1/users/register-activate-code`,body);
export const NewPostss = () => axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service`)
export const Regions = () => axios.get<IForm.Region[]>(`${BASE_URL}/v1/region`)
export const SecondRegions = (id: number) => axios.get<IForm.Region[]>(`${BASE_URL}/v1/district?region_id=${id}`)
export const Mahalla = (id: number) => axios.get<IForm.Region[]>(`${BASE_URL}/v1/mahalla?district_id=${id}`)
// export const Posts = (body: 
