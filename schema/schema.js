const graphql = require("graphql");
var _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//dummy data
var usersData = [
  { id: "1", name: "Bond", age: 36, profession: "Programmer" },
  { id: "13", name: "Anna", age: 26, profession: "Baker" },
  { id: "211", name: "Bella", age: 16, profession: "Mechanic" },
  { id: "19", name: "Gina", age: 26, profession: "Painter" },
  { id: "150", name: "Georgina", age: 36, profession: "Teacher" },
];

var hobbiesData = [
  {
    id: "1",
    title: "Programming",
    description: "Using computers to make the world a better place",
    userId: "150",
  },
  {
    id: "2",
    title: "Rowing",
    description: "Sweat and feel better before eating donouts",
    userId: "211",
  },
  {
    id: "3",
    title: "Swimming",
    description: "Get in the water and learn to become the water",
    userId: "211",
  },
  {
    id: "4",
    title: "Fencing",
    description: "A hobby for fency people",
    userId: "13",
  },
  {
    id: "5",
    title: "Hiking",
    description: "Wear hiking boots and explore the world",
    userId: "150",
  },
];

 var postsData = [
     {id: '1', comment: 'Building a Mind', userId: '1'},
     {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
     {id: '3', comment: 'How to Change the World', userId: '19'},
     {id: '4', comment: 'How to Change the World', userId: '211'},
     {id: '5', comment: 'How to Change the World', userId: '1'}
 ]


//Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user...",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
});

const HobbbyType = new GraphQLObjectType({
  name: "Hobby",
  description: "Hobby description for",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    /**
         user: {
            type: UserType,
            resolve(parent, args) {
                 return User.findById(parent.userId);
            }
        }
         */
  }),
});

//Post type (id, comment)
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: () => ({
         id: {type: GraphQLID},
         comment: {type: GraphQLString},
         /*
         user: {
              type: UserType,
              resolve(parent, args) {
            
                return User.findById(parent.userId);
            
                   
              }
         }
         */
        
    })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },

      resolve(parent, args) {
        /**
         let user = {
            id: '123',
            age: 35,
            name: 'Daniel',
        }

        return user
         */
        return _.find(usersData, { id: args.id });
      },
    },

    hobby: {
      type: HobbbyType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        //return data for our hobby
        //return Hobby.findById(args.id);
        return _.find(hobbiesData, {id: args.id});
      },
    },

    post: {
        type: PostType,
        args: {id: {type: GraphQLID}},

        resolve(parent, args) {
             //return data (post data)

             //return Post.findById(args.id);

             return _.find(postsData, {id: args.id});
             
        }
   },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
