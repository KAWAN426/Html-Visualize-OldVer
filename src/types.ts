export interface ICompData {
  id: number;
  name: string;
  descript: string;
  comp: string;
  tag: string;
}

export interface ICom {
  tagName: string;
  style: string;
  ableStyle: TAbleStyle;
  [key: string]: string | TAbleStyle;
}

export type TAbleStyle = {
  [key: string]: "value" | "detail" | "color" | string[];
}

export interface IHvData {
  id: String;
  html: String;
  author: String;
  title: String;
  createdAt: String;
  updatedAt: String;
}

export interface IUser {
  img: String;
  name: String;
  uid: String;
  joinId: String;
}