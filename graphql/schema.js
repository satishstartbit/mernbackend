const { buildSchema } = require("graphql")

module.exports = buildSchema(`
        type Post {
            _id:ID!
            title:String!
            description:String!
            price:String!
        }

        input PostInputData {
            title:String!
            description:String!
            price:String!
        }
      
        type User {
            _id:ID!
            email:String!
            password:String!
            status:String!
            name:String!
            post:[Post!]!
        }         


        input userInputData {
            email:String!
            password:String!
            name:String!
        }
   
        
        type AuthData{
            token:String!
            userId:String!
        }
        type  RootQuery{
            login(email:String!, password:String!):AuthData!
        }

        type Rootmutation {
            createUser(userInput:userInputData):User!
            addproduct(userproduct:PostInputData):Post!
        }

        schema {
            query:RootQuery
            mutation:Rootmutation
        }
`)