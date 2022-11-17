const userMock = [
  {
    id: 1,
    username: 'teste',
    password: '$2b$10$OlBXc7Dwt0TyCwLyGYyor.CzI2PIHBGD357CxLo3uyqB2lIxxL/sy',
    accountId: 1,
    account: {
      balance: 100
    }
  }
]

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdGUiLCJhY2NvdW50SWQiOjF9LCJpYXQiOjE2Njg2NDk2MzIsImV4cCI6MTc1NTA0OTYzMn0.vBeQXdtc0VGoNOUdZfNoRM8a8gI4fLfNeS4OHIGQ9Fs"

const tokenWithAccountId2Mock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoidGVzdGUiLCJhY2NvdW50SWQiOjJ9LCJpYXQiOjE2Njg2NDk2ODksImV4cCI6MTc1NTA0OTY4OX0.AomOwQcNcJDlfaM8d5MpHv0Vtl-e5TG5ggsSCTypWJ8"
export { userMock, tokenMock, tokenWithAccountId2Mock }