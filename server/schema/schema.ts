import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} from 'graphql';
import clientModel from '../modals/clientModel';
import projectModel from '../modals/projectModel';

/**
 * GraphQL Object Type for a Client.
 * Defines the fields available on a Client object.
 *
 * @type {GraphQLObjectType}
 */
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

/**
 * GraphQL Object Type for a Project.
 * Defines the fields available on a Project object and includes a reference to the Client object.
 *
 * @type {GraphQLObjectType}
 */
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clientModel.findById(parent.clientId);
            },
        },
    }),
});

/**
 * Root Query for the GraphQL schema.
 * Defines the entry points for reading data (queries) from the database.
 *
 * @type {GraphQLObjectType}
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projectModel.find({});
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projectModel.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clientModel.find({});
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return clientModel.findById(args.id);
            },
        },
    },
});

/**
 * GraphQL Mutations for the schema.
 * Defines the entry points for modifying data (mutations) in the database.
 *
 * @type {GraphQLObjectType}
 */
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        /**
         * Mutation to add a new client to the database.
         */
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new clientModel({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },

        /**
         * Mutation to delete a client from the database.
         */
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return clientModel.findByIdAndDelete(args.id);
            },
        },

        /**
         * Mutation to add a new project to the database.
         */
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new projectModel({
                    name: args.name,
                    description: args.description,
                    status: args.stats,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },

        /**
         * Mutation to delete a project from the database.
         */
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return projectModel.findByIdAndDelete(args.id);
            },
        },
        /**
         * Mutation to update an existing project in the database.
         */
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return projectModel.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    {
                        new: true,
                    }
                );
            },
        },
    },
});

/**
 * Exports the GraphQL schema, including root query and mutations.
 */
export default new GraphQLSchema({ query: RootQuery, mutation });
