export function parseToDateArrayProp(list: Record<string, any>[], key: string) {
  list.forEach((item) => {
    item[key] = new Date(item[key] as string);
  });
}
