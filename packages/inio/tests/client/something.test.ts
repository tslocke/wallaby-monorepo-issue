import { initTesting } from "./helpers"
import { describe, test, expect } from 'vitest'
import { render } from '@inio/clarity'

initTesting()

describe('Something:', () => {

  test('The test', () => {
    render()
    expect(1).toBe(1)
  })

})
