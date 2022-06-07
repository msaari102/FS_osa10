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


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`