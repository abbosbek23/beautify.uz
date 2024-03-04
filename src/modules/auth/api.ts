import axios from "axios";
import { IApi, IForm } from "./types";
import { BASE_URL } from "../../config";

export const Register = ( body : IApi.Register.Request) => axios.post<IApi.Register.Response>(`${BASE_URL}/v1/users/register`,body);
export const ActiveCode = ( body : IApi.ActiveCodes.Request) => axios.post<IApi.ActiveCodes.Response>(`${BASE_URL}/v1/users/activate-code`,body);
export const Posts = (body: )
