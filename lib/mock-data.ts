import { User } from "@/types/user";
import { faker } from "@faker-js/faker";

export const generateData = () => {
  let data: User[] = [];

  for (let i = 0; i < 100; i++) {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      jobTitle: faker.person.jobTitle(),
      gender: faker.person.gender(),
      jobArea: faker.person.jobArea(),
      jobDescriptor: faker.person.jobDescriptor(),
      bio: faker.person.bio(),
      jobType: faker.person.jobType(),
      sex: faker.person.sex(),
    };
    data.push(user);
  }

  return data
};
