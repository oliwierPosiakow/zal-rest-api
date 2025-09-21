export type TBook = {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
};

export class Book implements TBook {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public publishedYear: number,
  ) {}
}
