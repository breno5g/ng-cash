// Used prisma documentation to learn how to create this mock
// Reference link: https://www.prisma.io/docs/guides/testing/unit-testing

import { PrismaClient } from '@prisma/client'
import { beforeEach } from "vitest"
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended'
import { vitest } from 'vitest'

import prisma from './client'


vitest.mock('./client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
