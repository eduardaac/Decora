const { response } = require('express');
const user = require('../models/userData');

module.exports = {

    async read(request, response) {
        const userList = await user.find();
        return response.json(userList);
    },

    async create(request, response) {
        const { nome, email,} = request.body;
        const userCreated = await user.create({
            nome,
            email
        })
    },
    async delete(request, response){
       const {id} = request.params;
       const userDeleted = await user.findOneAndDelete({_id: id}); 
      if(userDeleted){
        return response.json(userDeleted);
      }
      return response.status(401).json({error: 'Não foi encontrado esse registro'})
    }
};