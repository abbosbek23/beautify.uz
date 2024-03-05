/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { GENDER } from "./constants";

export namespace IEntity  {
	export interface User {
		firstName: string;
		lastName: string;
		phone: string;
		img: string | null;
		balance: string;
		email: string;
		username: string;
		gender: GENDER;
		birthday: string;
		about: string;
		isActive: boolean;
		isSpiker: boolean;
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
    export interface ActiveCodes{
        email:string;
        activate_code?:number | undefined;
    }
	export interface Register {
		id:number,
        full_name: string,
        email: string,
        username: string,
        password: string,
        activate_code?:number | undefined,
        is_master:string
	}
	export interface Verification {
		email: string;
	}
	export interface CheckEmail {
		email: string;
	}
	export interface PostsApi {
		id: number | null,
		name:string;
		price:string;
		duration:string;
		description:string;
		category:number | null;
		image:string;
		data?:undefined;
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
    export namespace ActiveCodes {
		export interface Request extends IForm.ActiveCodes {}
		export interface Response extends IForm.ActiveCodes {}
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