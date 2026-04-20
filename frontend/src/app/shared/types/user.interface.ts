import { ISanityImage } from './product.inteface';

export interface IDocument {
	name: string;
	url: string;
}

export interface IUserProfile {
	name: string;
	email: string;
	phone?: string;
	documents?: IDocument[];
}

export interface IOrderItem {
	productSlug: string;
	productTitle: string;
	quantity: number;
	price: number;
	cover?: ISanityImage | null;
}

export interface IOrder {
	id: string;
	date: string | number | { seconds: number; nanoseconds: number }; // Firebase Timestamp or ISO string
	total: number;
	items: IOrderItem[];
}

export interface IUserData {
	profile: IUserProfile;
	orders: IOrder[];
}
