1- Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro
	A- Incorporo Imagenes de las pruebas realizada: Con y sin compresion respectivamente.
	
2- Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
	A- Ruta y método de todas las peticiones recibidas por el servidor (info): Incorporo el log INFO en la ruta INFO como lo plantea la consigna 1. Aunque es poco clara la consiga, no pude llegar a comprender si lo que se esta buscando en el trabajo es que todas las rutas largen un log diciendo que ruta se esta ejecutando (al ser poco clara la consigna, incorporo de todos modos en cada una de las rutas un log que indica la ruta aplicada con un INFO).-

	
3- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
	A- Incorporo warning en la ruta /*. El warning se refleja en el log cuando el usuario esta desloeado.
	
4- Errores lanzados por las apis de mensajes y productos, únicamente (error)
	A- Incorporo el log de ERROR el cual se podra ver en caso de errores ya sea en las rutas como en productos y chat. Los incorpore en los controlers tambien.

5- Considerar el siguiente criterio:
	Loggear todos los niveles a consola (info, warning y error)
	Registrar sólo los logs de warning a un archivo llamada warn.log
	Enviar sólo los logs de error a un archivo llamada error.log
		A: Se pueden ver por consola todos los niveles pedidos. Se crean los archivos warn.log y error.log donde se plazman los resultados.

6- Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'
	A- Realizo, con artillery, el teste sobre la ruta solicitada. Dejo los Resultados con el nombre de archivos: result_cluster.txt y result_fork.txt. Realice la prueba en ambos modos y se pueden observar las diferencias:
		MODO CLUSTER:http.request_rate: 40/sec /   median:308
		MOPO FORK: http.request_rate: 43/sec   /   median:528.6
	B- Cada request tarda al rededor de 3 milisegundos menos que en modo fork. sin perjuicio de que la media es inferior, por lo tanto entiendo que mas efectiva.
7- Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
	1) El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.
		Realizo el test con el comando NODE --PROF SERVER.JS creandose el archivo ISOLATE. 
		Realizo en otra consola los comandos curl -x  y lo ejecuto con artillery en cumplimiento con la cantidad de request solicitados por la consigna.
		Se crea el archivo result_prof_process_info.txt
		Ejecuto el comando NODE --INSPECT SERVER.JS. Abro chrome://inspect y abro el lector de javaScrip. Incorporo imagen con los resultados, no pude observar el lin "run" a pesar de haberlo hecho varias veces.
		Se crean los archivos result:afterChromeInspect.txt (nombre que coloque para el reslultado del inspect). Agrego imagen de los resultados test.chromeInspect.
8- El ejercio de la ultima consigna quedo realizada con autocanon con los resultados que no pude obtener en imagenes. Me encuentro a la espera de poder ver un after para entender bien el tema.