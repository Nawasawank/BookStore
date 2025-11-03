export type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  thumbnail: string;
  price: number | null;
  category: string;
  description?: string;
};

export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  BookDetail: { bookId: string; book: Book };
  Cart: undefined;
  Checkout: undefined;
  Profile: undefined;
  History: undefined;
};