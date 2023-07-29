export interface IProduct    {
	id?: number,
	title: string,
	price: number,
	description: string,
	image: string,
	category: string
}
export interface IToken    {
	access_token: string,
	refresh_token: string
}
export interface IUserCredentials {
	email: string,
	password: string,
	token?: IToken
}