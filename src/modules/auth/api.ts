/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { IApi, IForm } from "./types";
import { BASE_URL } from "../../config";

export const Register = ( body : IApi.Register.Request) => axios.post<IApi.Register.Response>(`${BASE_URL}/v1/users/register`,body);
export const Register2step = (body: IApi.Register2steps.Request) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
        'Content-Type': 'application/json' // Assuming JSON is being sent in the body
    };

    return axios.post<IApi.Register2steps.Response>(
        `${BASE_URL}/v1/users/register-step2`,
        body,
        { headers }
    );
};
export const ActiveCode = ( body : IApi.ActiveCodes.Request) => axios.post<IApi.ActiveCodes.Response>(`${BASE_URL}/v1/users/register-activate-code`,body);
export const Login = ( body : IApi.Login.Request) => axios.post<IApi.Login.Response>(`${BASE_URL}/v1/users/login`,body)
export const ResetPassword = ( body : IApi.Verification.Request) => axios.post<IApi.Verification.Response>(`${BASE_URL}/v1/users/reset-password`,body);
export const ResetPasswordConfirm = ( body : IApi.ResetPasswords.Request) => axios.post<IApi.ResetPasswords.Response>(`${BASE_URL}/v1/users/reset-password-confirm`,body);
export const Regions = () => axios.get<IForm.Region[]>(`${BASE_URL}/v1/region`)
export const SecondRegions = (body: IForm.Region) => axios.get<IForm.Region[]>(`${BASE_URL}/v1/district?region_id=${body}`)
export const Mahalla = (body: IForm.Region) => axios.get<IForm.Region[]>(`${BASE_URL}/v1/mahalla?district_id=${body}`)
export const UserProfil = () => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("access")}`,
        'Content-Type': 'application/json' // Assuming JSON is being sent in the body
    };
    
    return axios.get<IApi.Profile.Response>(
        `${BASE_URL}/v1/users/profile`,
        { headers }
        );
    };
    export const UserUpdateProfile = (body: IApi.ProfileUpdate.Request) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        };
    
        return axios.put<IApi.ProfileUpdate.Response>(
            `${BASE_URL}/v1/users/profile`,
            body,
            { headers }
        );
    };
export const NewPostss = () => axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service/list`)
export const CategoryPosts = (body:number) => axios.get<IForm.PostsApi[]>(`${BASE_URL}/v1/service/category?category_id=${body}`)
