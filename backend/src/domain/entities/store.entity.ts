export class StoreEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly user_id: number,
    public readonly is_deleted: boolean,
    public readonly categories: { id: number; name: string }[]
  ) {}

  static fromObject(object: { [key: string]: any }): StoreEntity {
    const { id, name, user_id, is_deleted, categories = [] } = object;

    return new StoreEntity(id, name, user_id, is_deleted, categories);
  }
}
