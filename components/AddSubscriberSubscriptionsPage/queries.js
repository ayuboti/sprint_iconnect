import gql from "graphql-tag";

export const SUBSCRIPTIONS_QUERY = gql`
  query Subscriptions($query:String,$number:Int,$fromItem:Int) {
    subscriptions(query:$query,number:$number,fromItem:$fromItem){
      id
      name
      description
      dailyPrice
      weeklyPrice
      monthlyPrice
      yearlyPrice
    }
  }`;
