export interface ILarekAPI {
	getProductList(): Promise<IProductList>;
	getProduct(id: string): Promise<IProduct>;
	makeOrder(order: IOrder): Promise<IOrderResult>;
}