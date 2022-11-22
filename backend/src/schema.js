const { gql } = require('apollo-server');

const typeDefs = gql`
    """
    Available Queries for the InterplanetaryFonts marketplace.
    Based on ERD.
    """
    type Query {
        users: [User!]!
        "There always be an user but some won't have projects"
        fontProjects: [FontProject!]
        "Some projects won't have streams"
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
        "Dates as ints, usefull for sorting"
        createdAt: Int!
        updatedAt: Int
        "Check if is creator ond/or collectors"
        creator: Boolean!
        collector: Boolean!
    }
    "If there's a link it will need this structure"
    type Link {
        name: String!
        address: String!
    }

    "Font Project"
    type FontProject {
        id: ID!
        name: String!
        "Descriptions are optional"
        description: String
        perCharacterMintPrice: Int!
        creator: User!
        "Superfluid related data"
        idaRoyaltyIndex: Int
        "Dates are received as integer and transformed with JS"
        launchDateTime: Int!
        createdAt: Int!
        updatedAt: Int
        "IPFS URL"
        fontFilesCID: String!
        "Number of mints defined by creator"
        mintings: Int
        "Superfluid token contract address"
        distributionToken: String!
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
        createdAt: Int!
        updatedAt: Int
        proposer: User!
        isApproved: Boolean!
        project: FontProject!
        "Superfluid SuperToken address"
        streamingSuperToken: String!
        fundings: [FontStreamFund!]
        collaborations: [FontStreamCollaboration!]
    }
    type FontStreamFund {
        id: ID!
        funder: User!
        amount: Int!
        rate: Int!
        stream: FontStream!
        createdAt: Int!
        updatedAt: Int
    }
    type FontStreamCollaboration {
        id: ID!
        proposer: User!
        "Path to ZIP file with source font"
        deliverablesCID: String!
        funderApprovedVoters: [User!]
        funderDisapprovedVoters: [User!]
        stream: FontStream!
        createdAt: Int!
        updatedAt: Int
    }
`;

module.exports = typeDefs;
