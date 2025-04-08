import { createElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';

export interface IBasketView {
	products: HTMLElement[];
	totalPrice: number;
	disabled: boolean;
}

export class Basket extends Component<IBasketView> {
	protected _submit: HTMLButtonElement;
	protected _price: HTMLElement;
	protected _list: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._submit = this.container.querySelector('.basket__button');
		this._price = this.container.querySelector('.basket__price');
		this._list = this.container.querySelector('.basket__list');

		if (this._submit) {
			this._submit.addEventListener('click', () => {
				this.events.emit('order:open');
			});
		}
	}

	set products(products: HTMLElement[]) {
		console.log(...products);
		if (products.length) {
			this._list.replaceChildren(...products);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set totalPrice(totalPrice: number) {
		this.setText(this._price, totalPrice);
	}

	set disabled(flag: boolean) {
		this._submit.disabled = flag;
	}
}
