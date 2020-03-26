import {APP_QUERY} from "../../components/app/queries";
import cookie from 'js-cookie';

const getUserSelection = (userID) => {
  let votes = cookie.get("votes");
  if (votes) {
    votes = JSON.parse(votes);

    const keys = Object.keys(votes);
    if (keys.find(value => value === userID) && (keys.length > 1)) {
      // remove other user ids from cookies to prevent voting leaks
      keys.forEach(
        value => {
          if (value !== userID)
            delete votes[value]
        }
      );
      // set the cookies
      cookie.set("votes", votes);
    }
    return votes[userID]
  }
  return {}
};

const vote = (userID, {seatSlug, candidateID}) => {
  // initialize votes as an empty project
  let votes = {};
  // get the parsed user selection from votes
  let userSelection = getUserSelection(userID);

  // set the seat and candidate
  userSelection[seatSlug] = candidateID;

  // stringify the cbject and set the cookie
  votes[userID] = userSelection;

  // set the votes to cookie
  cookie.set("votes", votes)
};


export const Mutation = {
  vote: async (obj, args, {cache}, info) => {
    // get seat id and candidate id from arguments
    const {seatSlug, candidateID} = args;
    // get user id from apollo cache
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });

    // vote
    await vote(id, {seatSlug, candidateID});
  }
};

export const SeatType = {
  voted: async (obj, args, {cache}, info) => {
    // get id from cache
    const {user: {id}} = cache.readQuery({
      query: APP_QUERY
    });
    // get user selection from cookies
    const selection = getUserSelection(id);
    // check if the object has beend selected
    // if so return a CandidateType to field
    if (selection[obj.slug]) {
      // get object candidates and check whether
      // the id in the cookies matches the candidates
      // returned by the object
      // if so return the candidate
      if (obj.candidates) {
        return obj.candidates.find(
          ({id}) => {
            return id === selection[obj.slug]
          }
        )
      }
    }
    // return null if the candidate has not been selected
    return null;
  }
};