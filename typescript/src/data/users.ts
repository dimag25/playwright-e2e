/**
 * Typed test data for the Sauce Demo application.
 *
 * Credentials are non-secret demo values published by saucedemo.com.
 * Anything sensitive should come from environment variables instead — see
 * `.env.example` and `process.env` usage in the auth setup.
 */

export interface Credentials {
  readonly username: string;
  readonly password: string;
}

export const PASSWORD = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export const users = {
  standard: {
    username: process.env.SAUCE_USERNAME ?? 'standard_user',
    password: PASSWORD,
  },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: PASSWORD,
  },
  visual: { username: 'visual_user', password: PASSWORD },
} as const satisfies Record<string, Credentials>;

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;
