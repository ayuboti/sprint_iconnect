import authResolvers from "./auth";

export default {
  Mutation: {
    ...authResolvers
  }
};