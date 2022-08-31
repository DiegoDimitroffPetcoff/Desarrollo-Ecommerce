const {buildSchema} = require('graphql');

let schema = buildSchema(`
  type Query {
      getPersonaById(id: Int!): Persona
      getPersonasByName(nombre: String): [Persona]
      getAllPersonas: [Persona]
  },
  type Mutation {
      updatePersona(id: Int!, nombre: String): Persona
  },
  type Persona {
      id: ID!
      nombre: String
      edad: Int
  }
`);


const personas = [
  {
    id: 1,
    nombre: 'Agustin',
    edad: 30
  },
  {
    id: 2,
    nombre: 'Matias',
    edad: 40
  },
  {
    id: 3,
    nombre: 'Jorge',
    edad: 20
  },
  {
    id: 4,
    nombre: 'Mauricio',
    edad: 22
  },
  {
    id: 5,
    nombre: 'Esteban',
    edad: 35
  }
];


class Schema {
    constructor(){}
    {



var getPersonaById = function (args) {
  var id = args.id;
  return personas.filter(persona => {
      return persona.id == id;
  })[0];
}

var getPersonasByName = function (args) {
  if (args.nombre) {
      var nombre = args.nombre;
      return personas.filter(persona => persona.nombre === nombre);
  } else {
      return personas;
  }
}

var getAllPersonas = function () {
  return personas
}

var updatePersona = function ({ id, nombre }) {
  personas.map(persona => {
      if (persona.id === id) {
          persona.nombre = nombre;
          return persona;
      }
  });
  return personas.filter(persona => persona.id === id)[0];
}

}
}
