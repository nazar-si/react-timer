export type size = number | string;

export default function length(x?: size) {
  if (x === undefined) return undefined;
  return typeof x === 'string' ? x : `${x / 4}rem`;
}
