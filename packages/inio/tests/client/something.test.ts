import { initTesting } from "./helpers"
import { describe, test, expect } from 'vitest'
import { doSomething } from '@inio/clarity'

initTesting()

describe('Something:', () => {

  test('The test', () => {
    expect(doSomething()).toBe(1)
  })

})
