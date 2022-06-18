import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy){
    repositories (orderDirection: $orderDirection, orderBy: $orderBy){
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

export const GET_SINGLEREPO = gql`
query getSingleRepositoyry($id: ID!){
  repository(id: $id)
    {
      id
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      fullName
      ownerAvatarUrl
      description
      language
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
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

export const ADD_REVIEW = gql`
mutation addReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repository {
      id
    }
  }
}
`

export const ADD_USER = gql`
mutation addUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
  }
}
`