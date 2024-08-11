export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly created_at?: Date,
    public readonly password?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, email, password, created_at } = object;

    return new UserEntity(id, name, email, created_at, password);
  }

  static fromObjectPublic(object: { [key: string]: any }): UserEntity {
    const { id, name, email } = object;

    return this.fromObject({ id, name, email });
  }
}
