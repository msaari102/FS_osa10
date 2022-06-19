import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query getRepositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int){
    repositories (orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first){
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`

export const GET_ME = gql`
query Me ($includeReviews: Boolean = false){
  me {
    id
    username
    reviews @include(if: $includeReviews){
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          text
          rating
          createdAt
          repository {
            fullName
          }
        }
      }
    }
  }
}
`


export const GET_SINGLEREPO = gql`
query getSingleRepositoyry($id: ID!, $after: String, $first: Int){
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
      reviews(after: $after, first: $first) {
        totalCount
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
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