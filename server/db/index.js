
const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt")

/* Creates a Prisma client and encrypts any password with bcrypt */
  

const prisma = new PrismaClient().$extends({
    query: {
      User: {
        create({ model, operation, args, query }) {
          args.data = {...args.data, password: bcrypt.hashSync(args.data.password, Number(process.env.SALT_ROUNDS))}
          return query(args);
        }
    }
  }
}); 


module.exports = { prisma };