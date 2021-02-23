import gql from 'graphql-tag';


export const loginWithGoogle = gql`
    mutation LoginWithGoogle($accessToken:String,$code:String,$imageUrl:String){
      loginWithGoogle(accessToken:$accessToken,code:$code,imageUrl:$imageUrl){
        errors{
          field
          errors
        }
        accessToken
      }
    }
  `
;
