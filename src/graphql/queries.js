/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHvData = /* GraphQL */ `
  query GetHvData($id: ID!) {
    getHvData(id: $id) {
      id
      html
      author
      createdAt
      updatedAt
    }
  }
`;
export const listHvData = /* GraphQL */ `
  query ListHvData(
    $filter: ModelHvDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHvData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        html
        author
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      img
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        img
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;