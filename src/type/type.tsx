type extraProperty = {
  [key: string]: string;
};

export type todo = {
  contents: string;
  createdAt: number;
  extraProperty: extraProperty;
  id: string;
  title: string;
};
