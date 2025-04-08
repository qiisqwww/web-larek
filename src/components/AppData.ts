import {
	formContactsErrors,
	formOrderErrors,
	IAppState,
	IContacts,
	IOrder,
	IOrderForm,
	IProduct,
	IProductList,
	Payment,
} from '../types';
import { Model } from './base/Model';
import { IBasketElement } from './BasketElement';

export class ProductItem extends Model<IProduct> {
	id: string;
	title: string;
	image: string;
	category: string;
	description: string;
	price: number;
}

export class AppState extends Model<IAppState> {
	basket: IBasketElement[] = [];
	gallery: ProductItem[];
	order: IOrder = {
		payment: 'online',
		address: '',
		email: '',
		total: 0,
		phone: '',
		items: [],
	};
	loading: boolean;
	formOrderErrors: formOrderErrors = {};
	formContactsErrors: formContactsErrors = {};
	preview: string | null;

	getTotal() {
		return this.order.items.reduce(
			(ans, item) => ans + this.gallery.find((it) => it.id === item).price,
			0
		);
	}

	setGallery(products: IProductList) {
		console.log(products);
		this.gallery = products.items.map((product) => new ProductItem(product, this.events));
		this.emitChanges('items:changed', { gallery: this.gallery });
	}

	addProduct(item: IBasketElement) {
		this.basket.push(item);
	}

	deleteProduct(id: number) {
		this.basket = this.basket.filter((item, i) => {
			return i + 1 !== id;
		});
		this.events.emit('basket:open');
	}

	clearBasket() {
		this.basket = [];
	}

	setOrderField(field: keyof IOrderForm, value: string & Payment) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactsField(field: keyof IContacts, value: string) {
		this.order[field] = value;
		console.log(field, value);
		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formOrderErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formOrderErrors = errors;
		this.events.emit('formOrderErrors:change', this.formOrderErrors);
		return Object.keys(errors).length === 0;
	}

	validateContacts() {
		const errors: typeof this.formContactsErrors = {};
		console.log(this.order);

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		if (!this.order.email) {
			errors.email = 'Необходимо указать почту';
		}
		this.formContactsErrors = errors;
		this.events.emit('formContactsErrors:change', this.formContactsErrors);
		return Object.keys(errors).length === 0;
	}

	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	hasInBasket(id: string) {
		return this.basket.find((item) => item.id === id) !== undefined;
	}
}
