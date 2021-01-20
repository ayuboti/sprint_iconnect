import gql from "graphql-tag";

export const MEMBER_PLAN_QUERY = gql`
query MemberPlanQuery{
  user{
    id
    plan {
      name
      monthlyPrice
      commission
      expiryDate
      isActive
    }
  }
  pricing{
    free{
      name
      monthlyPrice
      commission
    }
    basic{
      name
      monthlyPrice
      commission
    }
    premium{
      name
      monthlyPrice
      commission
    }
  }
}
`
