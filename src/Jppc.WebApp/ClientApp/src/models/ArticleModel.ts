export interface IArticleModel {
  id: string;
  name: string;
  file: File;
  language: string;
  description: string;
  price: string;
}

export class ArticleModel implements IArticleModel {
  [key: string]: string | File;
  public id: string;
  public name: string;
  public file: File;
  public language: string;
  public description: string;
  public price: string;

  constructor ();
  constructor (id: string, name: string, description: string, file: File, language: string, price: string);
  constructor (id?: string, name?: string, description?: string, file?: File, language?: string, price?: string) {
    this.id = id || '';
    this.name = name || '';
    this.description = description || '';
    this.file = file || null;
    this.language = language || '';
    this.price = price || '0';
  }

  static create (model: ArticleModel): ArticleModel {
    const instance = new ArticleModel();
    Object.assign<ArticleModel, ArticleModel>(instance, model);

    return instance;
  }
}
