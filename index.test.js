const Todos = require("./test/todos");
const assert = require("assert").strict;
const fs = require("fs");

describe("test de integracion de tareas", function () {
  it("deberia crear el contenedor de tareas vacio", function () {
    const todos = new Todos();
    assert.strictEqual(todos.list().length, 0);
  });

  it("deberia adicionar tareas correctamente", function () {
    const todos = new Todos();

    todos.add("run code");
    assert.strictEqual(todos.list().length, 1);
    assert.deepStrictEqual(todos.list(), [
      { title: "run code", complete: false },
    ]);

    todos.add("otra tarea");
    assert.strictEqual(todos.list().length, 2);
    assert.deepStrictEqual(todos.list(), [
      { title: "run code", complete: false },
      { title: "otra tarea", complete: false },
    ]);
  });

  it("deberia marcar una tarea como completa", function () {
    const todos = new Todos();

    todos.add("run code");
    todos.add("otra tarea");

    todos.complete("run code");
    assert.deepStrictEqual(todos.list(), [
      { title: "run code", complete: true },
      { title: "otra tarea", complete: false },
    ]);
  });
});

describe("comprobar error en tarea inexistente", function () {
  it("deberia dar error cuando no hay tareas cargadas", function () {
    const todos = new Todos();

    const errorEsperado = new Error("No hay tareas");
    assert.throws(() => {
      todos.complete("una tarea mas");
    }, errorEsperado);
  });

  it("deberia dar error cuando la tarea a completar no existe", function () {
    const todos = new Todos();
    todos.add("run code");

    const errorEsperado = new Error("Tarea no encontrada");
    assert.throws(() => {
      todos.complete("una tarea mas");
    }, errorEsperado);
  });

  it("deberia marcar una tarea como completa", function () {
    const todos = new Todos();

    todos.add("run code");
    todos.add("otra tarea");

    todos.complete("run code");
    assert.deepStrictEqual(todos.list(), [
      { title: "run code", complete: true },
      { title: "otra tarea", complete: false },
    ]);
  });
});

describe("comprobar que saveToFilecb() funcion", function () {
  it("deberia guardar una tarea en el archivo.txt", function (done) {
    const todos = new Todos();

    todos.add("guardar tarea callback");
    todos.saveToFileCb((err) => {
      assert.strictEqual(fs.existsSync("todos.txt"), true);
      let contenidoEsperado = "guardar tarea callback, false";
      let content = fs.readFileSync("todos.txt").toString();
      assert.strictEqual(content, contenidoEsperado);
      done(err);
    });
  });
});

describe("comprobar que saveToFilePromises() funcion bien", function () {
  before(function () {
    console.log("\n********Comienzo TOTAL de teste***");
  });

  after(function () {
    console.log("\n********Comienzo TOTAL de teste***");
  });

  beforeEach(function () {
    console.log("\n********Comienzo TOTAL de teste***");
  });

  before(function () {
    this.todos = new Todos();
  });

  afterEach(function () {
    if (fs.existsSync("todos.txt")) {
      fs.unlinkSync("todos.txt");
    }
  });

  afterEach(function () {
    console.log("**********FIN TEST********\n");
  });

  it("deberia guardar la tarea en el archivo todos.txt (then/catch)"),
    function () {
      this.todos.add("guardar tarea Promises TC");

      return this.todos.saveToFilePromise().then(() => {
        assert.strictEqual(fs.existsSync("todos.txt"), true);
        let contenidoEsperado = "guardar tarea Promises TC, false";
        let content = fs.readFileSync("todos.txt").toString();
        assert.strictEqual(content, contenidoEsperado);
      });
    };

  it("deberia guardar la tarea en el archivo todos.txt (then/catch)", async function () {
    this.todos.add("guardar tarea Promises AA");

    assert.strictEqual(fs.existsSync("todos.txt"), true);
    let contenidoEsperado = "guardar tarea Promises TC, false";
    let content = fs.readFileSync("todos.txt").toString();
    assert.strictEqual(content, contenidoEsperado);
  });
});
