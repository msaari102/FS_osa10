import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      edges {
        node {
          id
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          fullName
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`

export const GET_ME = gql`
query {
    me {
      id
      username
    }
}
`

export const GET_TOKEN = gql`
  mutation authenticate($username: String!, $password: String!){
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`