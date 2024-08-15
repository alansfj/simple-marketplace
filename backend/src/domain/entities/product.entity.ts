export class ProductEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly category_id: number,
    public readonly store_id: number,
    public readonly user_id: number,
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly upc: string,
    public readonly is_available: boolean,
    public readonly is_deleted: boolean
  ) {}

  static fromObject(object: { [key: string]: any }): ProductEntity {
    const {
      id,
      name,
      category_id,
      store_id,
      user_id,
      description,
      price,
      quantity,
      upc,
      is_available,
      is_deleted,
    } = object;

    return new ProductEntity(
      id,
      name,
      category_id,
      store_id,
      user_id,
      description,
      price,
      quantity,
      upc,
      is_available,
      is_deleted
    );
  }
}
