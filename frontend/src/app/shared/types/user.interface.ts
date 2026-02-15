export interface IUserProfile {
	name: string;
	email: string;
	phone?: string;
	pdfUrls?: string[];
}

export interface IOrderItem {
	productSlug: string;
	productTitle: string;
	quantity: number;
	price: number;
}

export interface IOrder {
	id: string;
	date: any; // Firebase Timestamp or ISO string
	total: number;
	items: IOrderItem[];
}

export interface IUserData {
	profile: IUserProfile;
	orders: IOrder[];
}
