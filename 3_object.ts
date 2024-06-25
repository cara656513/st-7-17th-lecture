// 단순 객체 타입
type Person = {
  name: string;
  age: number;
  isStudent: boolean;
};

const student: Person = {
  name: "Jane",
  age: 22,
  isStudent: true,
};

// 중첩 객체 타입
type Address = {
  street: string;
  city: string;
  country: string;
};

type PersonWithAddress = Person & {
  address: Address;
};

const studentWithAddress: PersonWithAddress = {
  name: "John",
  age: 24,
  isStudent: false,
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "USA",
  },
};
