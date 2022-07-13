1- CONSIGNA 1: Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
	A- En este caso generé el archivo server.js En el mismo se puede inicializar el servidor de manera normal con un fork (el cual sera /api/ramdoms con las querys que se le agreguen de cant=)
	B- Se puede ejecutar node server cluster en la consola y el mismo se iniciara en modo cluster utilizandose la cantidad de nucleos que la computadora tenga. 
	c- Hice un log en consola que indica modo Fork o modo Cluster segun si se inicializa el server segun el punto A o B anterior.
2- Agregar en la vista info, el número de procesadores presentes en el servidor.
	A- En la ruta /info se agrega número de procesadores presentes en el servidor, el cual indica con numero la cantidad que la maquina tiene.
3- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
	A- Haciendo correr en la consola npm run start (teniendo en cuenta que configure en el package.json ese comando) la aplicacion comienza a correr con nodemon y en consola se pueden ver los nucleos corriendo. Agrego print con imagen de nombra cluster-nodemon (en carpeta imagenes).
	B- Me aseguro de lo dicho en el punto A haciendo un tasklist en consola y puedo ver los nucleos corriendo. Agrego imagen de nombre cluster-nodemom-taklist. Luego de reinicializar el servidor de la misma manera pude comprobar con tasklist que todo esta correctamente ejecutandose, se mantuvieron los node.exe que se estaban ejecutando (los cuales puse en amarillo) y se renovaron los cluster con un nuevo PID, tanto master como forks (los cuales pinte de azul) imagen: nodemo-tasklist-2daprueba.
4- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
	A- Ejecuto el archivo server.js con forever. Primero sin ningun argument, para comprobar que se inicializa sin problemas con el Fork que se encuentra en /api/ramdoms. En la imagen forever-fork se observan tres consolas. la primera muestra la ejecucion del compando, la segunda la lista de forever y la tercera las tareas que se encuentran ejecutandose por nodemon(comprobandose que se inicializo de manera correcta, un solo nucleo ya que es fork en esta prueba).
	B- Comandos ejecutados en el punto anterior: 
		forever start server.js 
		forever list
		tasklist /fi "imagename eq node.exe"
	c- Se hace la misma prueba en el punto A y se agrega parametro Cluster. Agrego imagen forever-cluster. Se ve el comando ejecutado con el parametro Cluster, la lista de tareas y el cluster corriendo (pinte de verde los comandos)
	D- Comandos ejecutados en el punto C:
		forever start server.js cluster
		forever list
		tasklist /fi "imagename eq node.exe"
5- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
	A-Se realiza ejecucion de compandos con PM2 en el archivo server2. Se levantan tres veces la app (siendo escuchadas en los puertos 8080 8081 y 8082 respectivamente) en modo fork (en la imagen pinte estos archivos de color rosado: fork2,fork3 y server2).
	B- Levanto la app dos veces en modo cluster con pm2 en los puertos 8083 y 8084 respectivamente. en la imagen se observan estos archivos en color amarillo (cluster1 y cluste2). 
	C- Imagen: "pm2".
	D- Icorporo imagen de la ejecucion de pm2 en modo escucha: "pm2-modoescucha" y tambien el tasklist del sis operativo de windows: "pm2-lecturaSisOperativ"
	F- Comandos ejecutados:
		pm2 start server2.js
		pm2 start server2.js --name="fork2" --watch -- 8081
		pm2 start server2.js --name="fork3" --watch -- 8082
		pm2 start server2.js --name="cluste1" --watch -i max -- 8083
		pm2 start server2.js --name="cluste2" --watch -i max -- 8084
6- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
	A-Para complir con esta consigna genere un server3.js en donde /api/randoms va a estar siempre siendo escuchando en el puerto 8081, siendo la misma inicializada en modo cluster con su modulo nativo. para ello tuve que agregar y modificar codigo.
	B- El mismo puede ser inicializado sin arfumentos numericos y toda la app se levanta en el puerto 8080. Se puede modiciar con argumentos el puerto de la app. Se agregan imagenes de ejemplo: "server3-conParams" y "server3-sinParams"
	C- Comandos utilizados: 
		node server3
		node server3 3000
7- modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.
	A- Se debe ejecutar con server2. El puerto de la app principal queda en el 8080 y /api/ramdoms se administra equitativamente entre los puertos que la consigna solicia.
	B- Se incorpora archivo nginx.conf
	C- Comandos ejecutados:
		pm2 start server2.js --name="fork2" --watch -- 8081
		pm2 start server2.js --name="fork3" --watch -- 8082
		pm2 start server2.js --name="cluste1" --watch -i max -- 8083
		pm2 start server2.js --name="cluste2" --watch -i max -- 8084
		pm2 start server2.js
	D- Teniendo en cuenta la consiga, ejecute los compandos en ese orden para verificar que la app no funcione hasta ejecutar el ultimo compando (el cual por defecto levanta el puerto 8080). Con esto pude corroborar que lee de manera correcta la ruta /api/ramdoms en los puertos solicitados y que la app principal se encuentra corriendo unicamente en el puerto 8080.
	F- Incorporo dos imagenes nginex. Una de la consola mostrando la lectura de los ultimos tres comandos. y otra con la tabla mostrando la app corriendo sin le puerto 8080 y la ultima corriendo con el 8080.
