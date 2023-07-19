class MapReplacer {
  dataType: 'Map';
  value: Array<[any, any]>;
  constructor(value: Array<[any, any]>) {
    this.dataType = 'Map';
    this.value = value;
  }
}

export function replacer(key: string, value: unknown) {
  if (value instanceof Map) {
    return new MapReplacer(Array.from(value.entries()));
  }
  return value;
}

export function reviver(key: string, value: unknown) {
  if (typeof value === 'object' && value && 'dataType' in value) {
    return new Map((value as MapReplacer).value);
  }
  return value;
}

const MapJSON = {
  stringify: (v: any) => JSON.stringify(v, replacer),
  parse: (v: string) => JSON.parse(v, reviver),
};

export default MapJSON;
