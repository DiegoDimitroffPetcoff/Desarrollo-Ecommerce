DOCUMENTACION:
El proyecto se encuentra dividido segun arquitectura MDV.
Diseño adaptable para su escalabilidad con los metodos CRUD que encuentran su respectiva logica en la carpeta
service. Con una clase Api que contienen los metodos CRUD: create(content),read(),delete(element) y getLastId().
Cumpliendo con esos nombres se pueden agregar nuevos DAOs con la respectiva administracion de una nueva DBS
en este caso se esta utilizando Fs y MongoDB

PRUEBA DE AXIOS:
Lo incorpore en la carpeta UTILS realizandose la lectura de tipo GET con el ingreso al root. 
el consumo se da de la api como prueba.
Los test los realice segun lo planteado en clase y aun sigo practicandolos ya que en clase solo se bien teoria
y se me esta complicando un poco con la practica.