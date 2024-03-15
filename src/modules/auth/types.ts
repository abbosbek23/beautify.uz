/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
// import { GENDER } from "./constants";

import { ICategory } from "../../interface";

export namespace IEntity {
  export interface User {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    username: string;
    bio: string;
    gender: string;
    telegram: string;
    instagram: string;
    facebook: string;
    address: {
      id: number;
      region: string;
      district: string;
      mahalla: string;
      house: string;
    };
    image: string;
    is_master: boolean;
    data?: undefined;
  }
  export interface Tokens {
    email: any;
    access: string;
    refresh: string;
  }
}
export namespace IForm {
  export interface Login {
    username: string;
    password: string;
  }
  export interface Region {
    id: number;
    name: string;
    data?: undefined;
  }
  export interface ActiveCodes {
    email: string;
    activate_code?: number | undefined;
  }
  export interface Register {
    id: number;
    full_name: string;
    email: string;
    username: string;
    password: string;
    activate_code?: number | undefined;
    is_master: string | null;
  }
  export interface Register2steps {
    phone: string;
    gender: string;
    address: {
      region?: number | undefined;
      district?: number | undefined;
      mahalla?: number | undefined;
      house: string;
    };
  }
  export interface Verification {
    email: string;
    data?: undefined;
  }
  export interface CheckEmail {
    email: string;
  }
  export interface PostsApi {
    id: number | null;
    name: string;
    price: string;
    description: string;
    category: ICategory | undefined;
    image: string;
	duration: string;
    data?: undefined;
	filteredPosts?: undefined;
	user: {
		full_name: string;
		address: {
		  id: number | null;
		  region: string;
		  district: string;
		  mahalla: string;
		  house: string;
		},
		image: string;
	  },
	  is_like: string;
	  is_saved: string;
  }
  export interface Checkpassword {
    email: string;
    code: string;
  }

  export interface ResetPassword {
    email: string;
    code: string;
    new_password: string;
    confirm_password: string;
    detail: string;
  }

  export interface UserProfil {
    first_name?: string;
    last_name?: string;
    birthday?: string;
    gender?: string;
    phone?: string;
    image: string;
    balance: string;
    email: string;
    job?: string;
    username: string;
    about: string;
    is_active: boolean;
    is_spiker: boolean;
  }
}

export interface IToken {
  access: string;
  refresh: string;
}

export namespace IApi {
  export namespace Register {
    export interface Request extends IForm.Register {}
    export interface Response extends IForm.Register {}
  }
  export namespace Verification {
    export interface Request extends IForm.Verification {}
    export interface Response extends IForm.Verification {}
  }

  export namespace ResetPasswords {
    export interface Request extends IForm.ResetPassword {}
    export interface Response extends IForm.ResetPassword {}
  }
  export namespace Register2steps {
    export interface Request extends IForm.Register2steps {}
    export interface Response extends IForm.Register2steps {}
  }
  export namespace ActiveCodes {
    export interface Request extends IForm.ActiveCodes {}
    export interface Response {
      access_token: string;
      refresh_token: string;
    }
  }
  export namespace Profile {
    export interface Request {}
    export interface Response extends IEntity.User {}
  }
  export namespace Login {
    export interface Request extends IForm.Login {}
    export interface Response extends IToken {}
  }
  export namespace CheckEmail {
    export type Request = {
      email: string;
    };
  }
  export namespace ResetEmail {
    export type Request = {
      email: string;
    };
  }
  export namespace ResetPassword {
    export type Request = {
      email: string;
      code: string;
      new_password: string;
      confirm_password: string;
    };
  }
  export namespace Checkpassword {
    export type Request = {
      email: string;
      code: string;
    };
  }

  export namespace ProfileUpdate {
    export type Request = {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone_number?: string;
      gender?: string;
      birthdate?: string;
    };

    export type Response = {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      gender: string;
      birthdate: string;
    };
  }
  export namespace EditProfil {
    export type Request = {
      first_name?: string;
      last_name?: string;
      phone?: string;
      image?: string;
      balance?: string;
      email?: string;
      username?: string;
      gender?: string;
      job?: string;
      birthday?: string;
      about?: string;
      is_active?: boolean;
      is_spiker?: boolean;
    };
  }
}
