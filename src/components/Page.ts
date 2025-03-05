export interface IPage {
	counter: number;
	basket: IBasketView;
	products: IProduct[];
	locked: boolean;
}