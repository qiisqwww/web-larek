import { IProduct } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';
import { IBasketView } from './Basket';

export interface IPage {
	counter: number;
	basket: IBasketView;
	products: IProduct[];
	locked: boolean;
}

export class Page extends Component<IPage> {
	protected _counter: HTMLElement;
	protected _gallery: HTMLElement;
	protected _basket: HTMLButtonElement;
	protected _wrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = this.container.querySelector('.header__basket-counter');
		this._gallery = this.container.querySelector('.gallery');
		this._basket = this.container.querySelector('.header__basket');
		this._wrapper = this.container.querySelector('.page__wrapper');

		if (this._basket) {
			this._basket.addEventListener('click', () => {
				this.events.emit('basket:open');
			});
		}
	}

	set counter(val: number) {
		this.setText(this._counter, val);
	}

	set gallery(products: HTMLElement[]) {
		this._gallery.replaceChildren(...products);
	}

	set locked(val: boolean) {
		if (val) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
