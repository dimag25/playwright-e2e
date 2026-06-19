import { faker } from '@faker-js/faker';

/**
 * Faker-backed helpers for generating realistic, randomised test data.
 * Uses the maintained `@faker-js/faker` package (the abandoned `faker`
 * package is intentionally avoided).
 */

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export function randomCheckoutInfo(): CheckoutInfo {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };
}

/** Seed Faker for deterministic data when reproducibility matters. */
export function seedFaker(seed = 1234): void {
  faker.seed(seed);
}
