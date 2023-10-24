// Lista de 400 frases motivadoras relacionadas con el trabajo
const frasesMotivadoras = [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "Cree en ti mismo y todo será posible.",
    "La persistencia es la clave del éxito.",
    "La disciplina es el puente entre las metas y el logro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "El fracaso es la oportunidad de empezar de nuevo, pero más inteligentemente.",
    "La diferencia entre una persona exitosa y los demás no es la falta de fuerza, no es la falta de conocimiento, sino la falta de voluntad.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "Nunca he encontrado una persona que se haya hecho rica sin trabajar duro.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Los desafíos son lo que hacen que la vida sea interesante y superarlos es lo que hace que la vida tenga un significado.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "No es lo que logramos, sino lo que superamos lo que importa.",
    "La mejor manera de predecir el futuro es crearlo.",
    "La suerte es lo que sucede cuando la preparación se encuentra con la oportunidad.",
    "El éxito es un 1% de inspiración y un 99% de transpiración.",
    "Si caes siete veces, levántate ocho.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto para avanzar es comenzar.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "La recompensa de una cosa bien hecha es haberla hecho.",
    "Tu tiempo es limitado, no lo gastes viviendo la vida de alguien más.",
    "La clave para hacer cosas grandiosas es comenzar.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "Nunca te arrepientas de un día en tu vida. Los buenos días te dan felicidad y los malos te dan experiencia.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "El trabajo duro siempre supera al talento cuando el talento no trabaja duro.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "Las oportunidades no ocurren. Las creas tú mismo.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "La única forma de hacer un gran trabajo es amar lo que haces.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No sueñes tu vida, vive tu sueño.",
    "La única forma de hacer un gran trabajo es amar lo que haces.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto de levantarse está en acostarse.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La clave para hacer cosas grandiosas es comenzar.",
    "Nunca te arrepientas de un día en tu vida. Los buenos días te dan felicidad y los malos te dan experiencia.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "Nunca te arrepientas de un día en tu vida. Los buenos días te dan felicidad y los malos te dan experiencia.",
    "La diferencia entre una persona exitosa y los demás no es la falta de fuerza, no es la falta de conocimiento, sino la falta de voluntad.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "Nunca te arrepientas de un día en tu vida. Los buenos días te dan felicidad y los malos te dan experiencia.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Nunca te arrepientas de un día en tu vida. Los buenos días te dan felicidad y los malos te dan experiencia.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "Un sueño no se vuelve realidad a través de la magia; se necesita sudor, determinación y trabajo duro.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El secreto para avanzar es comenzar.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "El trabajo que nunca empiezas es el que más tiempo lleva en finalizar.",
    "Cada logro comienza con la decisión de intentarlo.",
    "El secreto de levantarse está en acostarse.",
    "No importa cuán lento vayas mientras no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El secreto para avanzar es comenzar.",
    "El éxito no está garantizado, pero el fracaso está garantizado si no lo intentas.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No te detengas cuando estés cansado. Detente cuando hayas terminado.",
    "Nunca te rindas en un sueño solo por el tiempo que tomará lograrlo. El tiempo pasará de todos modos.",
    "No tienes que ser grande para comenzar, pero debes comenzar para ser grande.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa cuántos obstáculos encuentres en el camino, si tienes una meta, sigue adelante.",
    "Cree en ti mismo y todo será posible.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El trabajo arduo siempre supera al talento cuando el talento no trabaja duro.",
    "No sueñes tu vida, vive tu sueño.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "El trabajo en equipo divide el trabajo y multiplica los resultados.",
    "Cada logro comienza con la decisión de intentarlo.",
    "No dejes para mañana lo que puedes hacer hoy.",
    "El secreto de levantarse está en acostarse.",
    "Si no intentas, nunca sabrás lo que podrías haber logrado.",
    "La disciplina es el puente entre tus metas y tus logros.",
    "No importa cuán lento vayas mientras no te detengas.",
    "La perseverancia no es una carrera larga, es muchas carreras cortas, una tras otra.",
    "La paciencia es amarga, pero su fruto es dulce.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No puedes tener un mejor mañana si no dejas de pensar en el ayer.",
    "Si no esperas lo inesperado, no lo encontrarás, ya que es difícil de encontrar y está fuera de tus planes.",
    "No importa cuántos amigos tengas, pero cuántos amigos puedas contar cuando tengas un problema... eso es lo que importa.",
    "El trabajo duro vence al talento cuando el talento no trabaja duro.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El éxito es la capacidad de ir de fracaso en fracaso sin perder entusiasmo.",
    "No es lo que dices sobre tus sueños, sino lo que haces para alcanzarlos.",
];

// Función para obtener una frase motivadora aleatoria
function obtenerFraseMotivadoraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * frasesMotivadoras.length);
    return frasesMotivadoras[indiceAleatorio];
}

// Función para mostrar una frase motivadora
function mostrarFraseMotivadora() {
    const fraseMotivadora = obtenerFraseMotivadoraAleatoria();
    const contenedorFrases = document.getElementById("frases-motivadoras-container");
    contenedorFrases.innerHTML = `<h2>${fraseMotivadora}</h2>`;
}

// Llama a la función para mostrar la frase motivadora
mostrarFraseMotivadora();
