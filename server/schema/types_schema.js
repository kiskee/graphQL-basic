const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

const Person = new GraphQLObjectType({
    name: "Person",
    description: "Person",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        isMarried: { type: GraphQLBoolean },
        gpa: { type: GraphQLFloat },

        justAType: {
        type: Person,
        resolve(parent, args) {
            return parent;
        },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root query type",
  fields: {
    person: {
        type: Person,
        //args: {id: {type: GraphQLString}},
        resolve(parent, args) {
              //we resolve with data
              //get and return data from a datasource

              let personObj = {
                  //id: {type: GraphQLID},
                  name: 'Antonio',
                  age: 34,
                  isMarried: true,
                  gpa: 4.0,

              };

               return personObj;
              }
   }
  },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
});