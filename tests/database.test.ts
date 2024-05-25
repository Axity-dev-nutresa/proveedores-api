import {migrate} from '@db/migrate'

describe('Database migrate', () => {
  test('should execute without throwing an error', async () => {
    await expect(migrate()).resolves.not.toThrow()
  })
})
