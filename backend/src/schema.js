const { gql } = require('apollo-server');

const typeDefs = gql`
    """
    Available Queries for the InterplanetaryFonts marketplace.
    Based on ERD
    """
    type Query {
        users: [User!]!
        fontProjects: [FontProject!]!
        fontStreams: [FontStream!]
    }

    "User"
    type User {
        address: String!
        email: String
        name: String
        website: String
        bio: String
        links: [Link!]
        lensHandle: String
        "Check if is creator ond/or collectors"
        creator: Boolean!
        collector: Boolean!
    }
    type Link {
        name: String!
        address: String!
    }

    "Font Project"
    type FontProject {
        id: ID!
        perCharacterMintPrice: Int!
        creator: User!
        name: String!
        "Superfluid related data"
        idaRoyaltyIndex: Int
        description: String
        "Dates are received as integer and transformed with JS"
        startDateTime: Int!
        "IPFS URL"
        fontFilesCID: String!
        "Number of mints defined by creator"
        mintings: Int
    }

    "Font Stream, funders, and collaborators"
    type FontStream {
        id: ID!
        name: String!
        description: String
        duration: Int!
        fundingGoalAmount: Int!
        "Dates are received as integer and transformed with JS"
        startDateTime: Int!
        proposer: User!
        isApproved: Boolean!
        project: FontProject!
        "Superfluid"
        streamingURL: String
        fundings: [FontStreamFund!]
        collaborations: [FontStreamCollaboration!]
    }
    type FontStreamFund {
        id: ID!
        funder: User!
        amount: Int!
        rate: Int!
        stream: FontStream
    }
    type FontStreamCollaboration {
        id: ID!
        proposer: User!
        "ZIP file with source font"
        deliverablesCID: String!
        funderApprovedVoters: [User!]
        funderDisapprovedVoters: [User!]
        stream: FontStream
    }
`;

module.exports = typeDefs;
