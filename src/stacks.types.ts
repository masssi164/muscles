// stacks.types.ts

export type Card = string;

export type Stack = {
  cards: Card[];
};

export type DrawFunction = () => Card | undefined;

export type PutFunction = (card: Card) => void;

export type DiscardStack = Stack & {
  put: PutFunction;
};

export type DrawStack = Stack & {
  draw: DrawFunction;
  shuffle: (cards:Card[]) => Card[];
};
