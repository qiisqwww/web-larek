import { IBasketView } from '../components/Basket';

export interface IProduct {
	id: string;
	title: string;
	image: string;
	category: string;
	description: string;
	price: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type Payment = 'online' | 'offline';

export interface IOrderForm {
	payment: Payment;
	address: string;
}

export interface IContacts {
	phone: string;
	email: string;
}

export interface IOrder extends IOrderForm, IContacts {
	total: number;
	items: string[];
}

export interface IAppState {
	basket: IBasketView[];
	gallery: IProduct[];
	order: IOrder | null;
	loading: boolean;
}

export type formOrderErrors = Partial<Record<keyof IOrderForm, string>>;
export type formContactsErrors = Partial<Record<keyof IContacts, string>>;

export interface IProductList {
	total: number;
	items: IProduct[];
}