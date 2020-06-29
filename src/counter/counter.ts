import './counter.css';
import store, { increment, decrement } from '../store';

class Counter {
  private readonly store = store;

  protected readonly increment = (): void => {
    this.store.dispatch(increment());
  };

  protected readonly decrement = (): void => {
    this.store.dispatch(decrement());
  };

  private decrementButton = createButton('-', this.decrement);
  private incrementButton = createButton('+', this.increment);
  private counter = createCounter(this.store.getState());

  constructor(rootElement: HTMLElement) {
    if (!(rootElement instanceof HTMLElement))
      throw new TypeError(`${rootElement} must be an HTML Element`);

    rootElement.append(
      this.decrementButton,
      this.counter,
      this.incrementButton
    );

    this.store.subscribe(this.render);
  }

  private render = (): void => {
    this.counter.innerText = String(this.store.getState());
  };
}

type EventHandler = (event?: Event) => any;

const createCounter = (value: number): HTMLElement => {
  const counter = document.createElement('div');
  counter.classList.add('counter-current');
  counter.innerText = String(value);

  return counter;
};

const createButton = (text: string, onClick: EventHandler): HTMLElement => {
  if (typeof onClick !== 'function')
    throw new TypeError(`${onClick} must be a function`);

  const button = document.createElement('button');
  button.innerText = String(text);
  button.classList.add('counter-button');
  button.addEventListener('click', onClick);

  return button;
};

export default Counter;
