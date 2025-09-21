export type TUser = {
  id: number;
  name: string;
  email: string;
};

export class User implements TUser {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}
}
