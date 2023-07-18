class MapReplacer {
  dataType: 'Map';
  value: Array<[any, any]>;
  constructor(value: Array<[any, any]>) {
    this.dataType = 'Map';
    this.value = value;
  }
}

function replacer(key: string, value: unknown) {
  if (value instanceof Map) {
    return new MapReplacer(Array.from(value.entries()));
  }
  return value;
}

function reviver(key: string, value: unknown) {
  if (value instanceof MapReplacer) {
    return new Map(value.value);
  }
  return value;
}

const MapJSON = {
  stringify: (v: any) => JSON.stringify(v, replacer),
  parse: (v: string) => JSON.parse(v, reviver),
};

export default MapJSON;
