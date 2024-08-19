export class CategoryEntity {
  constructor(public readonly id: number, public readonly name: string) {}

  static fromObject(object: { [key: string]: any }): CategoryEntity {
    const { id, name } = object;

    return new CategoryEntity(id, name);
  }
}
