type ExtraPropertyType = {
  [key: string]: string;
};

export type Todo = {
  id: string;
  title: string;
  contents: string;
  createdAt: number;
  extraProperty: ExtraPropertyType;
};
