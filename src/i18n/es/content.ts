// Contenido de las fichas en español: nombres, textos de las especies, conservación y rescate.
// Misma estructura que fr/content.ts y en/content.ts.
//
// Nombres: solo se indica un nombre común español cuando es fiable (G = figura entre los
// nombres vernáculos españoles de GBIF, noviembre de 2026; W = nombre español estándar y muy
// extendido). Sin nombre fiable, se omite `name` y la app muestra el nombre inglés; el nombre
// científico se muestra siempre.
import type { ContentPack } from '../types';

export const content: ContentPack = {
  species: {
    // #001 Osphranter rufus — nombre: W
    1: {
      name: "Canguro rojo",
      habitat: "Llanuras áridas y semiáridas del interior",
      description: "El mayor marsupial vivo: un macho puede superar 1,8 m de pie. Vive en grupos llamados «mobs».",
      funFact: "Puede dar saltos de 8 m y alcanzar 60 km/h.",
      diet: "Hierbas y hojas",
    },
    // #002 Macropus giganteus — nombre: G
    2: {
      name: "Canguro gris oriental",
      habitat: "Bosques abiertos, praderas, campos de golf",
      description: "Un canguro muy extendido por el este de Australia, de pelaje gris pardo y hocico peludo.",
      funFact: "Se le ve a menudo pastando en el césped al anochecer.",
      diet: "Hierbas y hojas",
    },
    // #003 Notamacropus rufogriseus — nombre: G
    3: {
      name: "Ualabí de cuello rojo",
      habitat: "Bosques de eucaliptos y sus lindes",
      description: "Un ualabí de tamaño medio que se reconoce por el tono rojizo del cuello y los hombros.",
      funFact: "En Tasmania lo llaman «Bennett’s wallaby» y tiene un pelaje más espeso.",
      diet: "Hierbas y hojas",
    },
    // #004 Osphranter robustus — sin nombre español fiable: se usa el inglés
    4: {
      habitat: "Zonas rocosas y escarpes",
      description: "Un macropódido robusto de hombros potentes, adaptado a los terrenos rocosos.",
      funFact: "Puede pasar meses sin beber refugiándose del calor en cuevas.",
      diet: "Hierbas y hojas",
    },
    // #005 Setonix brachyurus — nombre: W
    5: {
      name: "Quokka",
      habitat: "Isla Rottnest y bosques del suroeste",
      description: "Un pequeño macropódido de cara sonriente, famoso por los selfis en la isla Rottnest.",
      funFact: "Está prohibido tocarlo o darle de comer… ¡y las multas son altas!",
      diet: "Hierbas y hojas",
    },
    // #006 Phascolarctos cinereus — nombre: W
    6: {
      name: "Koala",
      habitat: "Bosques de eucaliptos",
      description: "Un marsupial arborícola que se alimenta casi solo de hojas de eucalipto.",
      funFact: "Duerme hasta 20 horas al día para ahorrar energía.",
      diet: "Hojas de eucalipto",
    },
    // #007 Vombatus ursinus — nombre: G
    7: {
      name: "Wombat común",
      habitat: "Bosques templados, brezales y praderas",
      description: "Un marsupial excavador y corpulento que cava largos túneles. Su marsupio se abre hacia atrás.",
      funFact: "¡Sus excrementos tienen forma de cubo, así no ruedan!",
      diet: "Hierbas",
    },
    // #008 Ornithorhynchus anatinus — nombre: G
    8: {
      name: "Ornitorrinco",
      habitat: "Ríos y arroyos de agua dulce",
      description: "Un mamífero que pone huevos, con pico de pato y cola de castor.",
      funFact: "Los machos tienen un espolón venenoso en las patas traseras.",
      diet: "Larvas, gusanos y gambas de agua dulce",
    },
    // #009 Tachyglossus aculeatus — nombre: G
    9: {
      name: "Equidna de hocico corto",
      habitat: "Casi todos los hábitats, del desierto al bosque",
      description: "Un mamífero que pone huevos, cubierto de púas, que se alimenta de hormigas y termitas.",
      funFact: "Su lengua pegajosa puede medir 18 cm.",
      diet: "Hormigas y termitas",
    },
    // #010 Sarcophilus harrisii — nombre: G
    10: {
      name: "Demonio de Tasmania",
      habitat: "Bosques y tierras de cultivo de Tasmania",
      description: "El mayor marsupial carnívoro vivo, conocido por sus chillidos aterradores en la noche.",
      funFact: "En proporción a su tamaño, su mandíbula es de las más potentes del reino animal.",
      diet: "Carroña y pequeños animales",
    },
    // #011 Canis dingo — nombre: W
    11: {
      name: "Dingo",
      habitat: "Desiertos, bosques, costas",
      description: "Un perro salvaje que llegó a Australia hace unos 4000 años; el gran depredador del continente.",
      funFact: "Los dingos casi nunca ladran: aúllan.",
    },
    // #012 Trichosurus vulpecula — nombre: G
    12: {
      name: "Pósum de cola de cepillo",
      habitat: "Bosques, parques… y tejados de las afueras",
      description: "Un pósum nocturno de cola tupida, muy bien adaptado a la vida en la ciudad.",
      funFact: "Le encanta instalarse bajo los tejados de las casas australianas.",
      diet: "Hojas, flores y frutos",
    },
    // #013 Pseudocheirus peregrinus — nombre: G
    13: {
      name: "Falangero de cola anillada",
      habitat: "Bosques, matorrales y jardines",
      description: "Un pequeño pósum de cola prensil con la punta blanca que construye nidos llamados «dreys».",
      funFact: "Se come sus propios excrementos blandos para digerir mejor las hojas.",
      diet: "Hojas, flores y frutos",
    },
    // #014 Petaurus breviceps — nombre: G
    14: {
      name: "Petauro del azúcar",
      habitat: "Bosques de eucaliptos",
      description: "Un pequeño marsupial planeador que vuela de árbol en árbol gracias a una membrana entre sus patas.",
      funFact: "Puede planear más de 50 metros.",
      diet: "Savia, néctar e insectos",
    },
    // #015 Myrmecobius fasciatus — nombre: W
    15: {
      name: "Numbat",
      habitat: "Bosques de wandoo del suroeste",
      description: "Un marsupial rayado y diurno que come hasta 20 000 termitas al día. Emblema de Australia Occidental.",
      funFact: "Quedan menos de 1000 numbats adultos en libertad.",
      diet: "Termitas",
    },
    // #016 Macrotis lagotis — nombre: G
    16: {
      name: "Bilbi",
      habitat: "Desiertos áridos y praderas",
      description: "Un marsupial nocturno con orejas de conejo, símbolo de la lucha contra las especies invasoras.",
      funFact: "En Australia, en Pascua se regalan bilbies de chocolate en lugar de conejos.",
      diet: "Insectos, semillas, bulbos y hongos",
    },
    // #017 Dasyurus maculatus — nombre: G
    17: {
      name: "Dasiuro de cola moteada",
      habitat: "Selvas y bosques esclerófilos húmedos",
      description: "Un marsupial carnívoro de pelaje marrón salpicado de manchas blancas, excelente trepador.",
      funFact: "Es el segundo mayor marsupial carnívoro, después del demonio de Tasmania.",
      diet: "Pequeños mamíferos y aves",
    },
    // #018 Perameles nasuta — nombre: G
    18: {
      name: "Bandicut listado hociquilargo",
      habitat: "Bosques, brezales y jardines",
      description: "Un pequeño marsupial de hocico puntiagudo que cava agujeritos en forma de cono para buscar insectos.",
      funFact: "Su gestación dura solo 12 días, una de las más cortas de los mamíferos.",
      diet: "Insectos e invertebrados",
    },
    // #019 Pteropus poliocephalus — nombre: G
    19: {
      name: "Zorro volador de cabeza gris",
      habitat: "Bosques costeros, parques urbanos",
      description: "Un gran murciélago frugívoro con collar rojizo que forma enormes colonias en las ciudades.",
      funFact: "Poliniza los eucaliptos a lo largo de decenas de kilómetros cada noche.",
      diet: "Néctar, polen y frutos",
    },
    // #020 Petrogale xanthopus — nombre: G
    20: {
      name: "Ualabí de las rocas de patas amarillas",
      habitat: "Gargantas y acantilados del interior",
      description: "Uno de los macropódidos más bonitos, con un pelaje rayado de gris, blanco, amarillo y naranja.",
      funFact: "Las plantas rugosas de sus patas le dan un agarre perfecto en la roca.",
    },
    // #021 Thylogale billardierii — nombre: G
    21: {
      name: "Pademelón de Tasmania",
      habitat: "Sotobosque húmedo de Tasmania",
      description: "Un macropódido pequeño, rechoncho y tímido, de pelaje espeso y cola corta.",
      funFact: "Ha desaparecido del continente y hoy solo sobrevive en Tasmania.",
      diet: "Hierbas",
    },
    // #022 Dendrolagus lumholtzi — nombre: G
    22: {
      name: "Canguro arborícola de Lumholtz",
      habitat: "Selvas de la meseta de Atherton",
      description: "¡Un canguro que vive en los árboles! Trepa con sus musculosas patas delanteras.",
      funFact: "Puede saltar al suelo desde 15 m de altura sin hacerse daño.",
      diet: "Hojas",
    },
    // #023 Oryctolagus cuniculus — nombre: G
    23: {
      name: "Conejo europeo",
      habitat: "Praderas, campos, terrenos degradados",
      description: "Introducido en 1859, se convirtió en una de las peores especies invasoras del país.",
      funFact: "La valla más larga del mundo (más de 3000 km) se construyó para frenarlo.",
      diet: "Hierbas y hojas",
    },
    // #024 Vulpes vulpes — nombre: G
    24: {
      name: "Zorro rojo",
      habitat: "Casi en todas partes salvo el extremo norte tropical",
      description: "Introducido en el siglo XIX para la caza, hoy amenaza a muchos pequeños marsupiales.",
      funFact: "Se calcula que hay más de 1,7 millones de zorros en Australia.",
      diet: "Pequeños mamíferos, aves, insectos, frutos",
    },
    // #025 Camelus dromedarius — nombre: G
    25: {
      name: "Dromedario asilvestrado",
      habitat: "Desiertos del centro",
      description: "Importados en el siglo XIX para explorar el Outback, sus descendientes viven hoy en libertad.",
      funFact: "Australia tiene la mayor población de dromedarios salvajes del mundo.",
      diet: "Plantas del desierto",
    },
    // #026 Dromaius novaehollandiae — nombre: G
    26: {
      name: "Emú",
      habitat: "Llanuras, sabanas y bosques abiertos",
      description: "La segunda ave más grande del mundo, después del avestruz, e incapaz de volar.",
      funFact: "El macho incuba los huevos durante 8 semanas sin comer.",
      diet: "Semillas, frutos, insectos",
    },
    // #027 Casuarius casuarius — nombre: G
    27: {
      name: "Casuario común",
      habitat: "Selvas tropicales del norte de Queensland",
      description: "Un ave gigante con un casco óseo y el cuello azul intenso, jardinera esencial de la selva.",
      funFact: "Sus garras de 12 cm la convierten en una de las aves más peligrosas del mundo.",
      diet: "Frutos caídos",
    },
    // #028 Dacelo novaeguineae — nombre: G
    28: {
      name: "Cucaburra común",
      habitat: "Bosques abiertos, parques y jardines",
      description: "El famoso cucaburra, cuyo canto suena como una carcajada.",
      funFact: "Caza serpientes dejándolas caer desde lo alto.",
      diet: "Insectos, lagartos, serpientes, roedores",
    },
    // #029 Cacatua galerita — nombre: G
    29: {
      name: "Cacatúa galerita",
      habitat: "Bosques, parques y ciudades",
      description: "Una gran cacatúa blanca con cresta amarilla, ruidosa y muy inteligente.",
      funFact: "En Sídney han aprendido a abrir los contenedores de basura… ¡y se enseñan el truco unas a otras!",
      diet: "Semillas y frutos",
    },
    // #030 Eolophus roseicapilla — nombre: G
    30: {
      name: "Cacatúa galah",
      habitat: "Llanuras, tierras de cultivo y pueblos",
      description: "Una cacatúa rosa y gris, muy común, que se ve a menudo en grandes bandadas en el suelo.",
      funFact: "En la jerga australiana, «galah» significa… ¡«tonto»!",
      diet: "Semillas",
    },
    // #031 Trichoglossus moluccanus — nombre: W
    31: {
      name: "Lori arcoíris",
      habitat: "Bosques costeros, jardines con flores",
      description: "Un loro de colores brillantes que se alimenta de néctar con su lengua en forma de cepillo.",
      funFact: "Se reúnen en dormideros de varios miles de aves en las ciudades.",
      diet: "Néctar, polen y frutos",
    },
    // #032 Melopsittacus undulatus — nombre: G
    32: {
      name: "Periquito australiano",
      habitat: "Sabanas áridas y praderas",
      description: "Un pequeño loro nómada verde y amarillo que sigue las lluvias por el interior.",
      funFact: "En libertad vuelan en bandadas de decenas de miles.",
      diet: "Semillas de gramíneas",
    },
    // #033 Nymphicus hollandicus — nombre: G
    33: {
      name: "Cacatúa ninfa",
      habitat: "Zonas áridas cerca del agua",
      description: "Una pequeña cacatúa gris con cresta amarilla y mejillas naranjas.",
      funFact: "Es el miembro más pequeño de la familia de las cacatúas.",
      diet: "Semillas",
    },
    // #034 Calyptorhynchus banksii — nombre: G
    34: {
      name: "Cacatúa colirroja",
      habitat: "Bosques abiertos y sabana",
      description: "Una gran cacatúa negra cuya cola muestra bandas rojo vivo al volar.",
      funFact: "Puede vivir más de 50 años.",
      diet: "Semillas de eucalipto y de banksia",
    },
    // #035 Lophochroa leadbeateri — nombre: G
    35: {
      name: "Cacatúa abanderada",
      habitat: "Matorral árido y mallee",
      description: "Una cacatúa rosa salmón con cresta roja, amarilla y blanca: una de las más bonitas del mundo.",
      funFact: "Cuando la levanta, su cresta parece un abanico de fuego.",
    },
    // #036 Menura novaehollandiae — nombre: G
    36: {
      name: "Ave lira soberbia",
      habitat: "Bosques húmedos de montaña",
      description: "Un ave lira de cola espectacular, campeona mundial de la imitación.",
      funFact: "Imita a otras aves, ¡pero también obturadores de cámara y motosierras!",
      diet: "Insectos e invertebrados",
    },
    // #037 Gymnorhina tibicen — nombre: G
    37: {
      name: "Verdugo flautista",
      habitat: "Parques, campos de deporte, campo",
      description: "Un ave blanca y negra de canto melodioso, símbolo de las mañanas australianas.",
      funFact: "En primavera, algunos machos se lanzan en picado sobre los ciclistas que se acercan a su nido.",
      diet: "Gusanos e insectos del suelo",
    },
    // #038 Threskiornis molucca — nombre: G
    38: {
      name: "Ibis blanco australiano",
      habitat: "Humedales, parques urbanos",
      description: "Una gran zancuda blanca de pico curvo que se ha vuelto habitual de las papeleras urbanas.",
      funFact: "Le llaman cariñosamente «bin chicken» («pollo de la basura»).",
      diet: "Cangrejos de río y restos de comida",
    },
    // #039 Pelecanus conspicillatus — nombre: G
    39: {
      name: "Pelícano australiano",
      habitat: "Lagos, estuarios y costas",
      description: "Un gran pelícano blanco y negro con el pico más largo de todas las aves.",
      funFact: "Su pico puede medir hasta 50 cm.",
      diet: "Peces",
    },
    // #040 Cygnus atratus — nombre: G
    40: {
      name: "Cisne negro",
      habitat: "Lagos, pantanos y estuarios",
      description: "Un cisne completamente negro con el pico rojo vivo, emblema de Australia Occidental.",
      funFact: "Los europeos creían que los cisnes negros no existían… hasta 1697.",
      diet: "Plantas acuáticas y algas",
    },
    // #041 Eudyptula minor — nombre: G
    41: {
      name: "Pingüino azul",
      habitat: "Costas e islas del sur",
      description: "El pingüino más pequeño del mundo, de plumaje azulado, que vuelve contoneándose a su madriguera al anochecer.",
      funFact: "El «desfile de pingüinos» de Phillip Island atrae a miles de visitantes cada tarde.",
      diet: "Peces pequeños y calamares",
    },
    // #042 Malurus cyaneus — nombre: G
    42: {
      name: "Maluro soberbio",
      habitat: "Arbustos, jardines y parques",
      description: "Un diminuto pájaro cantor cuyo macho luce un plumaje azul eléctrico en la época de cría.",
      funFact: "Las hembras enseñan una «contraseña» a sus huevos antes de que eclosionen.",
      diet: "Insectos",
    },
    // #043 Aquila audax — nombre: G
    43: {
      name: "Águila audaz",
      habitat: "Casi todos los hábitats abiertos",
      description: "La mayor rapaz de Australia, con la cola en forma de rombo.",
      funFact: "Su envergadura puede alcanzar 2,8 m.",
      diet: "Conejos, ualabíes, carroña",
    },
    // #044 Haliaeetus leucogaster — nombre: W
    44: {
      name: "Pigargo oriental",
      habitat: "Costas, grandes lagos y ríos",
      description: "Un gran águila blanca y gris que caza peces y serpientes marinas cerca de la costa.",
      funFact: "Las parejas reutilizan el mismo nido gigante durante años.",
      diet: "Peces, serpientes marinas, aves",
    },
    // #045 Podargus strigoides — nombre: G
    45: {
      name: "Podargo australiano",
      habitat: "Bosques abiertos y parques",
      description: "Un ave nocturna de camuflaje perfecto que de día imita una rama rota.",
      funFact: "No es un búho: está más emparentado con los chotacabras.",
      diet: "Insectos e invertebrados",
    },
    // #046 Ninox boobook — nombre: G
    46: {
      name: "Nínox australiano",
      habitat: "Bosques y arboledas",
      description: "Un pequeño búho pardo cuyo canto «bu-buk» le dio su nombre en inglés.",
      funFact: "Es el búho más pequeño y más extendido de Australia.",
      diet: "Insectos y pequeños mamíferos",
    },
    // #047 Ninox strenua — nombre: G
    47: {
      name: "Nínox robusto",
      habitat: "Bosques húmedos de árboles altos",
      description: "El búho más grande de Australia, capaz de atrapar pósums.",
      funFact: "A menudo guarda su presa entre las garras todo el día.",
      diet: "Pósums y petauros",
    },
    // #048 Antigone rubicunda — nombre: W
    48: {
      name: "Grulla brolga",
      habitat: "Humedales y llanuras inundables",
      description: "Una gran grulla gris de cabeza roja, famosa por sus danzas de cortejo.",
      funFact: "Su danza ha inspirado muchos bailes aborígenes.",
      diet: "Insectos y ranas",
    },
    // #049 Ephippiorhynchus asiaticus — nombre: G
    49: {
      name: "Jabirú asiático",
      habitat: "Pantanos tropicales y billabongs",
      description: "Una gran cigüeña de cuello negro tornasolado y patas rojas, llamada «jabirú» en Australia.",
      funFact: "Es la única cigüeña de Australia.",
      diet: "Peces y ranas",
    },
    // #050 Manorina melanocephala — nombre: G
    50: {
      name: "Mielero chillón",
      habitat: "Parques, jardines y bosques abiertos",
      description: "Un melífago gris con antifaz amarillo, muy territorial y muy parlanchín.",
      funFact: "Se unen para expulsar a otras aves de su territorio.",
      diet: "Néctar, insectos y frutos",
    },
    // #051 Ptilonorhynchus violaceus — nombre: G
    51: {
      name: "Pergolero satinado",
      habitat: "Selvas y jardines",
      description: "El macho, negro azulado, construye un emparrado decorado con objetos azules para atraer a una hembra.",
      funFact: "Colecciona tapones, pinzas y pajitas… ¡siempre que sean azules!",
      diet: "Frutos e insectos",
    },
    // #052 Alectura lathami — nombre: G
    52: {
      name: "Talégalo cabecirrojo",
      habitat: "Selvas, jardines de las afueras",
      description: "Una gran ave negra de cabeza roja que construye un enorme montículo de compost para incubar sus huevos.",
      funFact: "El macho comprueba la temperatura del nido con el pico.",
    },
    // #053 Chloebia gouldiae — nombre: W
    53: {
      name: "Diamante de Gould",
      habitat: "Sabanas tropicales del norte",
      description: "Un pequeño pinzón de colores increíbles: morado, verde, amarillo y rojo.",
      funFact: "Solo quedan unos pocos miles en libertad.",
      diet: "Semillas de gramíneas",
    },
    // #054 Pardalotus punctatus — nombre: G
    54: {
      name: "Pardalote moteado",
      habitat: "Bosques de eucaliptos",
      description: "Un pajarito cubierto de puntos blancos que anida en túneles excavados en el suelo.",
      funFact: "Pesa apenas 8 gramos.",
    },
    // #055 Rhipidura leucophrys — nombre: G
    55: {
      name: "Abanico lavandera",
      habitat: "En todas partes salvo el bosque denso",
      description: "Un pequeño pájaro blanco y negro que mueve sin parar su cola en abanico.",
      funFact: "No duda en acosar a águilas mucho más grandes que él.",
      diet: "Insectos e invertebrados",
    },
    // #056 Alisterus scapularis — nombre: G
    56: {
      name: "Papagayo australiano",
      habitat: "Selvas y jardines",
      description: "Un gran loro cuyo macho tiene la cabeza y el vientre rojo vivo y el dorso verde.",
      funFact: "Solo el macho tiene la cabeza roja: la hembra es verde.",
      diet: "Semillas y frutos",
    },
    // #057 Platycercus elegans — nombre: G
    57: {
      name: "Perico elegante",
      habitat: "Bosques de montaña y parques",
      description: "Un loro carmesí con mejillas y alas azules.",
      funFact: "Los jóvenes son casi enteramente verdes.",
      diet: "Semillas y frutos",
    },
    // #058 Crocodylus porosus — nombre: G
    58: {
      name: "Cocodrilo de agua salada",
      habitat: "Estuarios, ríos y costas tropicales",
      description: "El mayor reptil vivo: los machos pueden superar 6 m y 1000 kg.",
      funFact: "Su mordisco es el más potente jamás medido en un animal.",
      diet: "Peces, aves, mamíferos",
    },
    // #059 Crocodylus johnstoni — nombre: W
    59: {
      name: "Cocodrilo de agua dulce",
      habitat: "Ríos y gargantas de agua dulce",
      description: "Un cocodrilo de hocico fino, más pequeño y tímido que su primo de agua salada.",
      funFact: "Puede «galopar» en tierra para escapar del peligro.",
      diet: "Peces, insectos, ranas",
    },
    // #060 Chlamydosaurus kingii — nombre: G
    60: {
      name: "Clamidosaurio",
      habitat: "Sabanas y bosques tropicales secos",
      description: "Un lagarto que despliega una enorme gola alrededor del cuello para asustar a sus enemigos.",
      funFact: "Cuando huye, corre erguido sobre las patas traseras.",
      diet: "Insectos e invertebrados",
    },
    // #061 Moloch horridus — nombre: G
    61: {
      name: "Diablo espinoso",
      habitat: "Desiertos arenosos",
      description: "Un pequeño lagarto cubierto de púas que solo come hormigas.",
      funFact: "Bebe a través de la piel: el agua llega a su boca por diminutos canales.",
      diet: "Hormigas",
    },
    // #062 Tiliqua scincoides — nombre: G
    62: {
      name: "Escinco de lengua azul",
      habitat: "Jardines, bosques abiertos, praderas",
      description: "Un lagarto grande y tranquilo que saca una lengua azul cobalto para asustar a los depredadores.",
      funFact: "Los jardineros lo adoran: come caracoles.",
      diet: "Caracoles, insectos y frutos",
    },
    // #063 Tiliqua rugosa — sin nombre español fiable: se usa el inglés
    63: {
      habitat: "Zonas semiáridas y mallee",
      description: "Un lagarto rechoncho de escamas como una piña y cola con forma de cabeza.",
      funFact: "Las parejas permanecen juntas más de 20 años.",
      diet: "Plantas, flores, caracoles",
    },
    // #064 Pogona vitticeps — nombre: G
    64: {
      name: "Dragón barbudo central",
      habitat: "Zonas áridas y bosques secos",
      description: "Un lagarto con una «barba» espinosa que hincha y oscurece cuando se siente amenazado.",
      funFact: "Saluda a los demás moviendo en círculos una de sus patas delanteras.",
      diet: "Insectos y plantas",
    },
    // #065 Intellagama lesueurii — nombre: G
    65: {
      name: "Dragón de agua australiano",
      habitat: "Orillas de arroyos, parques urbanos",
      description: "Un gran lagarto semiacuático que se ve a menudo tomando el sol junto al agua.",
      funFact: "Puede quedarse bajo el agua hasta 90 minutos.",
      diet: "Insectos, pequeños animales, frutos",
    },
    // #066 Varanus varius — sin nombre español fiable: se usa el inglés
    66: {
      habitat: "Bosques y áreas de pícnic",
      description: "Un gran varano negro y crema que trepa a los árboles para saquear nidos.",
      funFact: "Puede superar los 2 m de longitud.",
      diet: "Huevos y carroña",
    },
    // #067 Varanus giganteus — nombre: G
    67: {
      name: "Varano gigante australiano",
      habitat: "Desiertos rocosos del centro",
      description: "El mayor lagarto de Australia y el cuarto más grande del mundo.",
      funFact: "Puede alcanzar 2,5 m y correr muy rápido sobre las patas traseras.",
      diet: "Lagartos, mamíferos, aves",
    },
    // #068 Saltuarius cornutus — sin nombre español fiable: se usa el inglés
    68: {
      habitat: "Selvas tropicales del noreste",
      description: "Un geco de camuflaje increíble que se confunde con la corteza de los árboles.",
      funFact: "Su cola plana parece una hoja seca.",
      diet: "Insectos",
    },
    // #069 Oxyuranus microlepidotus — nombre: G
    69: {
      name: "Taipán del interior",
      habitat: "Llanuras inundables áridas del centro-este",
      description: "La serpiente con el veneno más potente del mundo, pero muy tímida y rara vez vista.",
      funFact: "Su piel cambia de color con las estaciones: más oscura en invierno.",
      diet: "Roedores",
    },
    // #070 Pseudonaja textilis — nombre: W
    70: {
      name: "Serpiente marrón oriental",
      habitat: "Campos, praderas y afueras",
      description: "Una serpiente muy venenosa y rápida, responsable de la mayoría de las mordeduras graves en Australia.",
      funFact: "Caza ratones, lo que la acerca a las granjas.",
      diet: "Roedores, lagartos, aves",
    },
    // #071 Pseudechis porphyriacus — nombre: G
    71: {
      name: "Serpiente negra de vientre rojo",
      habitat: "Humedales y orillas de ríos",
      description: "Una serpiente negra brillante de flancos rojos, venenosa pero no agresiva.",
      funFact: "Caza ranas y puede quedarse 20 minutos bajo el agua.",
      diet: "Ranas y pequeños animales",
    },
    // #072 Morelia spilota — nombre: G
    72: {
      name: "Pitón de alfombra",
      habitat: "Bosques, zonas rocosas y desvanes",
      description: "Una gran pitón no venenosa con dibujos de alfombra, que a menudo se encuentra en los tejados.",
      funFact: "Percibe el calor de sus presas gracias a unas fosetas en los labios.",
      diet: "Roedores y aves",
    },
    // #073 Chelodina longicollis — nombre: G
    73: {
      name: "Tortuga de cuello de serpiente australiana",
      habitat: "Pantanos, charcas y balsas de granja",
      description: "Una tortuga de agua dulce cuyo cuello es casi tan largo como su caparazón.",
      funFact: "Pliega el cuello de lado en lugar de meterlo dentro.",
      diet: "Insectos, crustáceos, renacuajos",
    },
    // #074 Ranoides caerulea — nombre: W
    74: {
      name: "Rana arborícola verde australiana",
      habitat: "Bosques, jardines y… ¡baños!",
      description: "Una gran rana verde y regordeta, con una sonrisa permanente, a la que le encantan las casas.",
      funFact: "Su piel produce sustancias que se estudian para combatir bacterias.",
      diet: "Insectos",
    },
    // #075 Litoria chloris — sin nombre español fiable: se usa el inglés
    75: {
      habitat: "Selvas de la costa este",
      description: "Una ranita arborícola verde brillante con ojos naranjas y muslos azulados.",
      funFact: "Solo aparece en gran número tras las grandes tormentas de verano.",
    },
    // #076 Limnodynastes peronii — sin nombre español fiable: se usa el inglés
    76: {
      habitat: "Charcas, zanjas y estanques de jardín",
      description: "Una rana parda rayada cuyo canto suena como el «toc» de una pelota de ping-pong.",
      funFact: "Pone los huevos en un nido de espuma flotante.",
    },
    // #077 Pseudophryne corroboree — sin nombre español fiable: se usa el inglés
    77: {
      habitat: "Turberas alpinas del Kosciuszko",
      description: "Una ranita de rayas amarillo vivo y negras, una de las más amenazadas del mundo.",
      funFact: "Fabrica su propio veneno, a diferencia de la mayoría de las ranas tóxicas.",
      diet: "Hormigas e insectos pequeños",
    },
    // #078 Rhinella marina — nombre: G
    78: {
      name: "Sapo de caña",
      habitat: "Casi todos los hábitats tropicales",
      description: "Introducido en 1935 para controlar un escarabajo, se convirtió en una plaga tóxica.",
      funFact: "Sus glándulas venenosas pueden matar a un cocodrilo o a un dasiuro que se lo coma.",
      diet: "Insectos, pequeños animales, comida de mascotas",
    },
    // #079 Carcharodon carcharias — nombre: G
    79: {
      name: "Gran tiburón blanco",
      habitat: "Aguas costeras templadas",
      description: "El gran depredador de los océanos, que puede superar los 6 m de longitud.",
      funFact: "Puede detectar una gota de sangre en 100 litros de agua.",
      diet: "Focas, peces, rayas",
    },
    // #080 Rhincodon typus — nombre: G
    80: {
      name: "Tiburón ballena",
      habitat: "Arrecife Ningaloo y aguas tropicales",
      description: "El pez más grande del mundo, un gigante inofensivo que filtra plancton.",
      funFact: "Cada tiburón ballena tiene un dibujo de manchas único, como una huella dactilar.",
      diet: "Plancton y peces pequeños",
    },
    // #081 Megaptera novaeangliae — nombre: G
    81: {
      name: "Ballena jorobada",
      habitat: "Costas este y oeste durante la migración",
      description: "Una ballena acróbata que migra a lo largo de la costa australiana cada invierno.",
      funFact: "Los machos cantan canciones complejas que cambian cada año.",
      diet: "Kril y peces pequeños",
    },
    // #082 Tursiops aduncus — nombre: G
    82: {
      name: "Delfín mular del Indo-Pacífico",
      habitat: "Bahías y aguas costeras",
      description: "Un delfín costero muy sociable, que a menudo se ve desde playas y puertos.",
      funFact: "En Shark Bay, algunos usan esponjas para protegerse el hocico mientras buscan comida.",
      diet: "Peces y calamares",
    },
    // #083 Dugong dugon — nombre: G
    83: {
      name: "Dugongo",
      habitat: "Praderas marinas tropicales",
      description: "Un mamífero marino herbívoro, primo del manatí, que pasta en las praderas marinas.",
      funFact: "Los marineros de antaño quizá lo confundieron con una sirena.",
      diet: "Pastos marinos",
    },
    // #084 Chelonia mydas — nombre: W
    84: {
      name: "Tortuga verde",
      habitat: "Arrecifes de coral y praderas marinas",
      description: "Una gran tortuga marina que anida en playas de Queensland, como la isla Raine.",
      funFact: "Su caparazón no es verde: su nombre viene del color de su grasa.",
      diet: "Pastos marinos y algas",
    },
    // #085 Arctocephalus pusillus doriferus — sin nombre español fiable: se usa el inglés
    85: {
      habitat: "Islas rocosas del estrecho de Bass",
      description: "Un lobo marino robusto que descansa en grandes colonias sobre las rocas.",
      funFact: "Puede bucear a más de 200 m de profundidad para cazar.",
      diet: "Peces y calamares",
    },
    // #086 Neophoca cinerea — nombre: G
    86: {
      name: "León marino australiano",
      habitat: "Playas e islas del sur",
      description: "Un león marino endémico, curioso y juguetón con los buceadores.",
      funFact: "Su ciclo reproductivo dura 18 meses, algo único entre focas y leones marinos.",
      diet: "Peces, calamares, crustáceos",
    },
    // #087 Phycodurus eques — nombre: G
    87: {
      name: "Dragón de mar foliado",
      habitat: "Bosques de kelp del sur",
      description: "Un primo del caballito de mar adornado con apéndices como hojas que parecen algas.",
      funFact: "El macho lleva los huevos bajo la cola.",
      diet: "Pequeños crustáceos (misidáceos)",
    },
    // #088 Amphiprion percula — nombre: W
    88: {
      name: "Pez payaso",
      habitat: "Anémonas de la Gran Barrera de Coral",
      description: "Un pececito naranja y blanco que vive en asociación con las anémonas de mar.",
      funFact: "Todos nacen machos; el más grande del grupo se convierte en hembra.",
      diet: "Algas y zooplancton",
    },
    // #089 Cheilinus undulatus — nombre: W
    89: {
      name: "Pez napoleón",
      habitat: "Arrecifes de coral",
      description: "Un enorme lábrido azul verdoso con una joroba en la frente, que puede superar los 2 m.",
      funFact: "Es uno de los pocos depredadores de la estrella de mar corona de espinas.",
      diet: "Moluscos, crustáceos, erizos",
    },
    // #090 Mobula alfredi — nombre: G
    90: {
      name: "Manta de arrecife",
      habitat: "Arrecifes y estaciones de limpieza",
      description: "Una elegante raya gigante con el cerebro más grande de todos los peces.",
      funFact: "Su envergadura puede alcanzar 5 m.",
      diet: "Plancton",
    },
    // #091 Sepia apama — nombre: W
    91: {
      name: "Sepia gigante australiana",
      habitat: "Arrecifes rocosos del golfo Spencer",
      description: "La sepia más grande del mundo, maestra del cambio de color.",
      funFact: "En Whyalla, miles de ellas se reúnen cada invierno para reproducirse.",
      diet: "Peces y crustáceos",
    },
    // #092 Hapalochlaena maculosa — nombre: G
    92: {
      name: "Pulpo de anillos azules",
      habitat: "Charcas de marea y costas rocosas",
      description: "Un pulpo pequeño con anillos azules fluorescentes y un veneno mortal.",
      funFact: "Cabe en la palma de la mano… pero nunca hay que tocarlo.",
      diet: "Cangrejos y gambas",
    },
    // #093 Chironex fleckeri — nombre: G
    93: {
      name: "Avispa marina",
      habitat: "Aguas costeras tropicales (de octubre a mayo)",
      description: "Una medusa casi transparente, entre los animales más venenosos del planeta.",
      funFact: "Tiene 24 ojos, algunos de los cuales forman imágenes reales.",
      diet: "Gambas y peces pequeños",
    },
    // #094 Mictyris longicarpus — sin nombre español fiable: se usa el inglés
    94: {
      habitat: "Llanuras de fango y playas resguardadas",
      description: "Un cangrejito azul que marcha en «ejércitos» de miles con la marea baja.",
      funFact: "A diferencia de otros cangrejos, camina hacia delante.",
      diet: "Materia orgánica de la arena",
    },
    // #095 Atrax robustus — nombre: W
    95: {
      name: "Araña de embudo de Sídney",
      habitat: "Suelos húmedos de los alrededores de Sídney",
      description: "Una araña negra brillante cuyo veneno es muy peligroso para las personas.",
      funFact: "No se ha registrado ninguna muerte desde la llegada del antídoto en 1981.",
      diet: "Insectos",
    },
    // #096 Latrodectus hasselti — nombre: G
    96: {
      name: "Viuda negra de espalda roja",
      habitat: "Cobertizos, buzones, aseos exteriores",
      description: "Una pequeña araña negra con una franja roja en el dorso, prima de la viuda negra.",
      funFact: "El macho a veces se sacrifica colocándose en la boca de la hembra.",
      diet: "Insectos",
    },
    // #097 Holconia immanis — sin nombre español fiable: se usa el inglés
    97: {
      habitat: "Corteza de árboles, paredes y parasoles de coche",
      description: "Una araña grande, plana y rápida: impresionante pero inofensiva.",
      funFact: "Puede medir más de 15 cm de lado a lado, patas incluidas.",
    },
    // #098 Papilio ulysses — nombre: W
    98: {
      name: "Mariposa Ulises",
      habitat: "Selvas tropicales del norte de Queensland",
      description: "Una gran mariposa de alas azul eléctrico, emblema turístico de Queensland.",
      funFact: "Le atrae todo lo que sea azul intenso, incluso un paraguas.",
      diet: "Oruga: hojas",
    },
    // #099 Extatosoma tiaratum — sin nombre español fiable: se usa el inglés
    99: {
      habitat: "Selvas",
      description: "Un insecto palo disfrazado de hoja seca espinosa, que se balancea como una hoja al viento.",
      funFact: "Las hormigas se llevan sus huevos porque los confunden con semillas.",
      diet: "Hojas de eucalipto y de zarza",
    },
    // #100 Dryococelus australis — nombre: W
    100: {
      name: "Insecto palo de la isla de Lord Howe",
      habitat: "Pirámide de Ball y programas de cría",
      description: "La «langosta de árbol», que se creyó extinta durante 80 años antes de redescubrirse en 2001.",
      funFact: "Toda la especie silvestre vivía bajo un único arbusto, en una roca en medio del mar.",
      diet: "Melaleuca",
    },
    // #101 Myrmecia gulosa — sin nombre español fiable: se usa el inglés
    101: {
      habitat: "Bosques abiertos y suelos arenosos",
      description: "Una hormiga grande con mandíbulas impresionantes y una picadura muy dolorosa.",
      funFact: "Tiene una vista excelente y puede seguir tus movimientos.",
      diet: "Insectos",
    },
    // #102 Cyclochila australasiae — sin nombre español fiable: se usa el inglés
    102: {
      habitat: "Árboles de parques y bosques",
      description: "Una gran cigarra verde cuyo canto ensordecedor es la banda sonora del verano australiano.",
      funFact: "Su canto puede superar los 120 decibelios, tanto como un concierto de rock.",
      diet: "Savia de los árboles",
    },
    // #103 Amegilla cingulata — sin nombre español fiable: se usa el inglés
    103: {
      habitat: "Jardines y lindes con flores",
      description: "Una abeja solitaria con el cuerpo rayado de azul metálico.",
      funFact: "Poliniza las tomateras haciendo vibrar las flores («polinización por zumbido»).",
      diet: "Néctar y polen",
    },
    // #104 Arachnocampa richardsae — sin nombre español fiable: se usa el inglés
    104: {
      habitat: "Cuevas y barrancos húmedos",
      description: "Una larva de mosquito de los hongos que brilla en la oscuridad para atraer presas a sus hilos pegajosos.",
      funFact: "El techo de algunas cuevas parece un cielo estrellado.",
      diet: "Insectos pequeños",
    },
    // #105 Cherax destructor — sin nombre español fiable: se usa el inglés
    105: {
      habitat: "Balsas de granja, ríos y pantanos",
      description: "Un cangrejo de río muy resistente que puede sobrevivir a la sequía en su madriguera.",
      funFact: "Los niños australianos los pescan con un trozo de carne atado a un cordel.",
    },
    // #106 Wallabia bicolor — nombre: G
    106: {
      name: "Ualabí de pantano",
      habitat: "Bosque denso, sotobosque y brezales",
      description: "Un ualabí oscuro y robusto que se mueve por el sotobosque con la cabeza baja. Común en Phillip Island.",
      funFact: "Las hembras pueden quedarse preñadas de nuevo antes incluso de que nazca la cría actual, algo único entre los mamíferos.",
      diet: "Helechos y arbustos",
    },
    // #107 Felis catus — nombre: G
    107: {
      name: "Gato asilvestrado",
      habitat: "En todas partes, del desierto al bosque y las islas",
      description: "Un gato doméstico que se ha vuelto salvaje, presente en casi toda Australia.",
      funFact: "Se calcula que los gatos asilvestrados matan más de mil millones de animales autóctonos al año en Australia.",
      diet: "Pequeños mamíferos, aves, reptiles",
    },
    // #108 Vespula germanica — nombre: G
    108: {
      name: "Avispa germánica",
      habitat: "Jardines, parques y áreas de pícnic",
      description: "Una avispa amarilla y negra que llegó a Australia a finales de los años 1950; agresiva cerca de su nido subterráneo.",
      funFact: "A diferencia de la abeja, puede picar varias veces.",
      diet: "Insectos",
    },
    // #109 Haematopus longirostris — nombre: G
    109: {
      name: "Ostrero pío australiano",
      habitat: "Playas de arena y estuarios",
      description: "Un ave costera blanca y negra con un largo pico naranja vivo y patas rosas.",
      funFact: "Pese a su nombre en inglés («ostrero»), come sobre todo almejas como las pipis y no tanto ostras.",
      diet: "Moluscos",
    },
    // #110 Ardenna tenuirostris — nombre: G
    110: {
      name: "Pardela de cola corta",
      habitat: "Islas y costas del sur; mar abierto el resto del año",
      description: "Un ave marina apodada «muttonbird» que anida en madrigueras por cientos de miles en Phillip Island y las islas del estrecho de Bass.",
      funFact: "Cada año hace un viaje de ida y vuelta de más de 30 000 km hasta el Pacífico Norte.",
    },
    // #111 Crinia signifera — sin nombre español fiable: se usa el inglés
    111: {
      habitat: "Charcas, zanjas y jardines húmedos",
      description: "Una ranita parda diminuta, de las más comunes del sureste, que se oye mucho más de lo que se ve.",
      funFact: "Su canto suena como el «cri-cri-cri» de un grillo.",
      diet: "Insectos",
    },
    // #112 Trichonephila edulis — sin nombre español fiable: se usa el inglés
    112: {
      habitat: "Jardines, lindes de bosque y bosques abiertos",
      description: "Una araña grande cuya tela, resistente y dorada, puede superar el metro de diámetro.",
      funFact: "El macho es mucho más pequeño que la hembra y a menudo vive en el borde de su tela.",
      diet: "Insectos",
    },
    // #113 Badumna insignis — sin nombre español fiable: se usa el inglés
    113: {
      habitat: "Esquinas de ventanas, paredes y cortezas",
      description: "Una araña negra y rechoncha que teje telas desordenadas en forma de embudo alrededor de las ventanas.",
      funFact: "Su picadura es dolorosa pero rara vez grave.",
      diet: "Insectos",
    },
    // #114 Anoplognathus — sin nombre español fiable: se usa el inglés
    114: {
      habitat: "Eucaliptos de parques y bosques",
      description: "Grandes escarabajos con reflejos dorados, verdes o pardos que aparecen en masa hacia Navidad, en pleno verano austral. (Esta ficha agrupa todo el género).",
      funFact: "Hay unas 35 especies, casi todas en Australia.",
      diet: "Eucalipto",
    },
    // #115 Heterodontus portusjacksoni — nombre: G
    115: {
      name: "Dormilón toro",
      habitat: "Fondos rocosos y arenosos poco profundos",
      description: "Un pequeño tiburón inofensivo de frente abultada y dibujos como un arnés, que tritura erizos y moluscos.",
      funFact: "Las hembras encajan entre las rocas sus cápsulas de huevos en forma de sacacorchos.",
      diet: "Erizos de mar y moluscos",
    },
    // #116 Asterias amurensis — nombre: G
    116: {
      name: "Estrella de mar japonesa",
      habitat: "Bahía de Port Phillip y estuarios de Tasmania",
      description: "Una estrella de mar llegada del norte de Asia en el agua de lastre de los barcos, convertida en una gran especie invasora.",
      funFact: "Una sola hembra puede liberar hasta 20 millones de huevos al año.",
      diet: "Moluscos",
    },
    // #117 Cereopsis novaehollandiae — nombre: G
    117: {
      name: "Ganso cenizo",
      habitat: "Islas costeras, praderas y pastos",
      description: "Un ganso gris cuyo pico está casi cubierto por una cera verde lima, a menudo en bandadas en Phillip Island.",
      funFact: "Puede beber agua salobre, lo que le permite vivir en islas sin agua dulce.",
      diet: "Hierbas y plantas suculentas",
    },
    // #118 Morus serrator — nombre: G
    118: {
      name: "Alcatraz australiano",
      habitat: "Mares costeros; colonias en islas y cabos",
      description: "Una gran ave marina blanca de cabeza amarillo pálido que se lanza en picado para pescar.",
      funFact: "Se zambulle desde decenas de metros y entra en el agua a casi 100 km/h.",
      diet: "Peces",
    },
    // #119 Zanda funerea — nombre: G
    119: {
      name: "Cacatúa fúnebre coliamarilla",
      habitat: "Bosques, pinares y parques",
      description: "Una gran cacatúa negra con manchas amarillas en las mejillas y la cola, y un grito quejumbroso.",
      funFact: "Destroza piñas y cortezas para sacar semillas y larvas.",
      diet: "Semillas y larvas",
    },
    // #120 Hydromys chrysogaster — nombre: G
    120: {
      name: "Rata de agua australiana",
      habitat: "Ríos, lagos, estuarios y puertos",
      description: "Un roedor acuático autóctono de patas palmeadas y cola con la punta blanca, apodado la «nutria australiana».",
      funFact: "Ha aprendido a dar la vuelta a los sapos de caña y comer solo sus partes no tóxicas.",
      diet: "Peces, crustáceos, ranas",
    },
    // #121 Rusa unicolor — nombre: G
    121: {
      name: "Ciervo sambar",
      habitat: "Bosques de montaña de Victoria y Nueva Gales del Sur",
      description: "Un gran ciervo asiático introducido en el siglo XIX, hoy extendido por los Alpes de Victoria.",
      funFact: "Daña los humedales alpinos al pisotearlos y revolcarse en el barro.",
      diet: "Hierbas y hojas",
    },
    // #122 Tiliqua nigrolutea — sin nombre español fiable: se usa el inglés
    122: {
      habitat: "Bosques frescos, brezales y praderas del sureste",
      description: "Un lagarto de lengua azul oscuro con manchas rosas, crema o naranjas, adaptado a las regiones frescas.",
      funFact: "Como otros lagartos de lengua azul, la hembra pare crías vivas.",
      diet: "Caracoles, insectos, frutos",
    },
    // #123 Notechis scutatus — nombre: G
    123: {
      name: "Serpiente tigre",
      habitat: "Humedales, orillas de lagos e islas costeras",
      description: "Una serpiente muy venenosa, a menudo con bandas claras y oscuras, común en los humedales de Melbourne.",
      funFact: "En algunas islas han crecido mucho alimentándose de polluelos de aves marinas.",
    },
    // #124 Austrelaps superbus — sin nombre español fiable: se usa el inglés
    124: {
      habitat: "Pantanos y praderas húmedas del sureste",
      description: "Una serpiente venenosa de color marrón cobrizo que sigue activa incluso con tiempo fresco.",
      funFact: "Soporta el frío mejor que la mayoría de las serpientes australianas.",
      diet: "Ranas y lagartos",
    },
    // #125 Phyllopteryx taeniolatus — nombre: G
    125: {
      name: "Dragón de mar común",
      habitat: "Praderas marinas y arrecifes rocosos del sur",
      description: "El emblema marino de Victoria, un primo rojo y amarillo del caballito de mar adornado con pequeños apéndices como algas.",
      funFact: "Como en el dragón de mar foliado, es el macho quien lleva los huevos.",
      diet: "Pequeños crustáceos",
    },
    // #126 Maratus volans — nombre: W
    126: {
      name: "Araña pavo real",
      habitat: "Brezales y matorrales costeros",
      description: "Una araña saltadora de unos 5 mm cuyo macho despliega un abdomen de colores en una danza de cortejo.",
      funFact: "Si el baile no le gusta, la hembra puede comerse al macho.",
      diet: "Insectos",
    },
    // #127 Agrotis infusa — nombre: W
    127: {
      name: "Polilla bogong",
      habitat: "Llanuras del sureste en invierno, cuevas alpinas en verano",
      description: "Una polilla parda que migra cada primavera a cuevas de los Alpes australianos para pasar el verano.",
      funFact: "Se orienta de noche gracias a las estrellas y al campo magnético terrestre.",
      diet: "Néctar (oruga: plantas)",
    },
    // #128 Maccullochella peelii — nombre: W
    128: {
      name: "Bacalao de Murray",
      habitat: "Ríos de la cuenca Murray-Darling",
      description: "El mayor pez de agua dulce de Australia y una figura importante de los relatos aborígenes.",
      funFact: "Puede vivir más de 50 años y superar el metro de longitud.",
      diet: "Peces, cangrejos de río, ranas",
    },
    // #129 Callocephalon fimbriatum — nombre: G
    129: {
      name: "Cacatúa gang-gang",
      habitat: "Bosques de montaña; parques de Canberra en invierno",
      description: "Una pequeña cacatúa gris cuyo macho tiene la cabeza rojo vivo; emblema del Territorio de la Capital Australiana.",
      funFact: "Su grito suena como una puerta que chirría al abrirse.",
    },
    // #130 Thinornis cucullatus — nombre: G
    130: {
      name: "Chorlito encapuchado",
      habitat: "Playas oceánicas expuestas",
      description: "Un pequeño chorlito de playa que pone sus huevos directamente en la arena en pleno verano, justo por donde pasan bañistas y perros.",
      funFact: "Sus huevos se parecen tanto a la arena que se pueden pisar sin darse cuenta.",
      diet: "Pequeños invertebrados de la playa",
    },
    // #131 Leipoa ocellata — nombre: G
    131: {
      name: "Talégalo leipoa",
      habitat: "Mallee y bosques secos del sur",
      description: "Un ave terrestre que construye un enorme montículo de arena y hojas para incubar sus huevos.",
      funFact: "El macho pasa casi todo el año manteniendo el montículo a unos 33 °C.",
    },
    // #132 Petauroides volans — nombre: G
    132: {
      name: "Falangero planeador grande",
      habitat: "Bosques viejos de eucaliptos con grandes árboles huecos",
      description: "El mayor marsupial planeador: nocturno, de grandes orejas peludas, y solo come hojas de eucalipto.",
      funFact: "Puede planear unos 100 metros dirigiéndose con las extremidades.",
    },
    // #133 Potorous tridactylus — nombre: G
    133: {
      name: "Potoro hociquilargo",
      habitat: "Sotobosque denso y húmedo",
      description: "Un pequeño marsupial saltador de hocico largo que desentierra hongos subterráneos.",
      funFact: "Al comer trufas, dispersa sus esporas, que los bosques necesitan para estar sanos.",
      diet: "Hongos subterráneos e insectos",
    },
    // #134 Perameles gunnii — nombre: G
    134: {
      name: "Bandicut barrado del este",
      habitat: "Praderas y tierras de cultivo; islas sin zorros",
      description: "Un pequeño bandicut con rayas claras en la grupa que desapareció en libertad del continente y se reintrodujo en islas de Victoria como Phillip Island.",
      funFact: "En 2021 fue el primer mamífero australiano que pasó de «extinto en estado silvestre» a «en peligro».",
      diet: "Invertebrados",
    },
    // #135 Miniopterus orianae bassanii — sin nombre español fiable: se usa el inglés
    135: {
      habitat: "Cuevas y bosques del suroeste de Victoria y el sureste de Australia Meridional",
      description: "Un pequeño murciélago insectívoro que depende de unas pocas cuevas de cría.",
      funFact: "Las hembras se reúnen para parir sobre todo en dos cuevas, en Naracoorte y cerca de Warrnambool.",
    },
    // #136 Litoria raniformis — sin nombre español fiable: se usa el inglés
    136: {
      habitat: "Charcas y humedales herbosos",
      description: "Una rana grande verde y dorada de canto grave como un gruñido, antes común en los alrededores de Melbourne.",
      funFact: "También come otras ranas, a veces incluso de su propia especie.",
      diet: "Ranas",
    },
    // #137 Eubalaena australis — nombre: G
    137: {
      name: "Ballena franca austral",
      habitat: "Bahías resguardadas del sur (de junio a octubre)",
      description: "Una gran ballena negra sin aleta dorsal y con callosidades blancas en la cabeza, que se acerca a la costa para parir.",
      funFact: "Se puede ver desde la playa en Warrnambool (Logans Beach).",
      diet: "Kril",
    },
    // #138 Tursiops australis — sin nombre español fiable: se usa el inglés
    138: {
      habitat: "Bahía de Port Phillip y lagos de Gippsland",
      description: "Un delfín descrito en 2011, del que quizá queden solo unos cientos. Todavía se debate si es una especie aparte.",
      funFact: "Su nombre viene de una palabra aborigen que significaría «gran pez marino de la clase de las marsopas».",
      diet: "Peces",
    },
    // #139 Dermochelys coriacea — nombre: W
    139: {
      name: "Tortuga laúd",
      habitat: "Mar abierto; visita las costas australianas",
      description: "La tortuga más grande del mundo, con un caparazón blando y sin escamas.",
      funFact: "Puede bucear a más de 1000 m para cazar medusas.",
      diet: "Medusas",
    },
    // #140 Synemon plana — sin nombre español fiable: se usa el inglés
    140: {
      habitat: "Praderas autóctonas",
      description: "Una polilla diurna cuyos adultos no tienen boca funcional: viven solo unos días, únicamente para reproducirse.",
      funFact: "Las hembras apenas vuelan; atraen a los machos mostrando sus alas traseras doradas.",
      diet: "Ninguno (adulto); oruga: raíces de hierbas",
    },
    // #141 Paralucia pyrodiscus lucida — sin nombre español fiable: se usa el inglés
    141: {
      habitat: "Unos pocos bosques secos de Victoria (Eltham, Castlemaine…)",
      description: "Una pequeña mariposa de reflejos cobrizos que solo vive en algunos bosques de Victoria.",
      funFact: "Sus orugas están custodiadas por hormigas, que las protegen a cambio de un líquido azucarado.",
    },
    // #142 Burramys parvus — nombre: G
    142: {
      name: "Pósum pigmeo de montaña",
      habitat: "Pedregales de los Alpes australianos",
      description: "El único marsupial australiano que vive solo en la alta montaña, bajo la nieve en invierno.",
      funFact: "Hiberna hasta 7 meses y depende de las polillas bogong para recuperar fuerzas en primavera.",
      diet: "Polillas bogong, semillas y frutos",
    },
    // #143 Gymnobelideus leadbeateri — nombre: G
    143: {
      name: "Falangero de Leadbeater",
      habitat: "Viejos bosques de fresno de montaña de las Central Highlands",
      description: "Emblema faunístico de Victoria, este pequeño pósum se creyó extinto hasta su redescubrimiento en 1961.",
      funFact: "Vive en pequeñas colonias en los huecos de árboles muy viejos, a menudo de más de 150 años.",
      diet: "Savia, goma e insectos",
    },
    // #144 Lichenostomus melanops cassidix — sin nombre español fiable: se usa el inglés
    144: {
      habitat: "Bosques pantanosos de Yellingbo",
      description: "El ave emblema de Victoria, con una cresta dorada en la frente; solo queda una población silvestre.",
      funFact: "La población silvestre depende de un programa de cría y suelta iniciado a finales de los años 1980.",
      diet: "Insectos, savia y néctar",
    },
    // #145 Neophema chrysogaster — nombre: G
    145: {
      name: "Periquito ventrinaranja",
      habitat: "Brezales de Tasmania (verano), marismas costeras del sur (invierno)",
      description: "Un pequeño loro verde de vientre naranja que cruza el estrecho de Bass cada año.",
      funFact: "En 2017, solo 17 adultos volvieron a criar en libertad.",
      diet: "Semillas de plantas de marisma",
    },
    // #146 Anthochaera phrygia — nombre: G
    146: {
      name: "Mielero regente",
      habitat: "Bosques de box e ironbark del sureste",
      description: "Un melífago negro y amarillo vivo, antes común y hoy una de las aves más amenazadas de Australia.",
      funFact: "Se han vuelto tan raros que algunos machos cantan la canción «equivocada»: ya no quedan adultos de su especie de los que aprender.",
      diet: "Néctar e insectos",
    },
    // #147 Philoria frosti — sin nombre español fiable: se usa el inglés
    147: {
      habitat: "Turberas de la meseta de Baw Baw",
      description: "Una rana parda que vive en una sola meseta de los Alpes de Victoria.",
      funFact: "Sus renacuajos crecen sin alimentarse, gracias a las reservas del huevo.",
    },
    // #148 Tympanocryptis pinguicolla — sin nombre español fiable: se usa el inglés
    148: {
      habitat: "Praderas basálticas autóctonas al oeste de Melbourne",
      description: "Un pequeño dragón de unos 15 cm, que se creyó perdido durante más de 50 años y se redescubrió en 2023.",
      funFact: "Se esconde en madrigueras de arañas y en grietas del suelo.",
    },
    // #149 Pedionomus torquatus — nombre: G
    149: {
      name: "Torillo australiano",
      habitat: "Praderas llanas y ralas del interior",
      description: "Un ave única, el único miembro de su familia, que corre en lugar de volar.",
      funFact: "En esta especie la hembra es la más colorida, y el macho incuba los huevos.",
      diet: "Semillas",
    },
    // #150 Megascolides australis — sin nombre español fiable: se usa el inglés
    150: {
      habitat: "Suelos arcillosos húmedos del sur de Gippsland",
      description: "Una lombriz gigante que suele medir un metro, presente solo en una pequeña parte de Victoria.",
      funFact: "A veces se la oye gorgotear bajo tierra cuando se desplaza por sus galerías.",
      diet: "Materia orgánica del suelo",
    },
    // #151 Pezoporus occidentalis — nombre: G
    151: {
      name: "Loro nocturno",
      habitat: "Matas de spinifex de los desiertos",
      description: "Un loro nocturno tan discreto que no existía ninguna foto de un ejemplar vivo antes de 2013.",
      funFact: "Pasa el día escondido dentro de las matas de spinifex.",
      diet: "Semillas de spinifex",
    },
  },

  conservation: {
    4: {
      epbcScope: "Solo la subespecie de la isla Barrow (Australia Occidental)",
      vicScope: "Subespecie oriental, la que vive en Victoria",
    },
    6: {
      epbcScope: "Poblaciones de Queensland, Nueva Gales del Sur y el Territorio de la Capital; no incluida en Victoria ni en Australia Meridional",
      programs: "Plan nacional de recuperación del koala (Gobierno australiano)",
    },
    9: {
      epbcScope: "Solo la subespecie de la isla Canguro",
    },
    10: {
      programs: "Save the Tasmanian Devil Program (Gobierno de Tasmania)",
    },
    11: {
      iucnNote: "La UICN no evalúa al dingo por separado del perro doméstico.",
    },
    12: {
      epbcScope: "Solo la subespecie del norte (Territorio del Norte)",
    },
    15: {
      iucnNote: "Pasó de «En peligro» a «Casi amenazada» en julio de 2026 gracias a las reintroducciones.",
      programs: "Plan nacional de recuperación del numbat; poblaciones reintroducidas en santuarios sin depredadores",
    },
    16: {
      programs: "Plan nacional de recuperación del bilbi; santuarios sin depredadores",
    },
    17: {
      epbcScope: "Sureste del continente y norte de Queensland: en peligro; Tasmania: vulnerable",
      programs: "Plan nacional de recuperación del dasiuro de cola moteada",
    },
    20: {
      epbcScope: "Las dos subespecies",
    },
    21: {
      vicScope: "Incluida en Victoria, donde la especie ya no vive",
    },
    23: {
      iucnNote: "El estado mundial refleja su declive en su área de origen (península ibérica). En Australia es una plaga invasora.",
      impact: "Los conejos arrasan la vegetación autóctona, impiden que los árboles se regeneren, agravan la erosión y ayudan a mantener las poblaciones de zorros y gatos.",
    },
    24: {
      impact: "Los zorros han contribuido a la extinción de varios pequeños mamíferos y amenazan a las aves que anidan en el suelo, a las tortugas y a los pingüinos.",
    },
    25: {
      iucnNote: "Especie domesticada: la UICN no evalúa al dromedario.",
      impact: "Los camellos pisotean las charcas del desierto, destruyen la vegetación y dañan lugares culturales aborígenes.",
    },
    26: {
      epbcScope: "Solo está incluida la subespecie de Tasmania, como extinta",
    },
    27: {
      epbcScope: "Población australiana",
      programs: "Plan nacional de recuperación del casuario común",
    },
    34: {
      epbcScope: "Solo las subespecies del sureste (en peligro) y de los bosques del suroeste (vulnerable)",
      vicScope: "Subespecie del sureste, la que vive en Victoria",
    },
    35: {
      iucnNote: "Incierto: según la taxonomía empleada, la UICN la clasifica como de preocupación menor o no la evalúa por separado.",
      epbcScope: "Solo la subespecie oriental",
    },
    41: {
      programs: "Phillip Island Nature Parks: seguimiento de la colonia, pasos protegidos y erradicación de los zorros en la isla",
    },
    43: {
      epbcScope: "Solo la subespecie de Tasmania",
    },
    49: {
      iucnNote: "Incierto: BirdLife (que evalúa las aves para la UICN) indica «Casi amenazada» y GBIF «Preocupación menor».",
    },
    53: {
      iucnNote: "Preocupación menor a nivel mundial desde 2022, pero en peligro según la ley australiana.",
      programs: "Plan nacional de recuperación del diamante de Gould",
    },
    57: {
      epbcScope: "Solo la subespecie de la isla Canguro",
    },
    62: {
      epbcScope: "Solo la subespecie del norte",
    },
    69: {
      vicScope: "Extinta en Victoria",
    },
    72: {
      vicScope: "Pitón de alfombra: en peligro; pitón diamante (East Gippsland): en peligro crítico",
    },
    77: {
      programs: "Cría en cautividad y reintroducciones (zoo de Taronga, Zoos Victoria, parques nacionales de Nueva Gales del Sur)",
    },
    78: {
      impact: "Tóxico en todas sus fases, envenena a los dasiuros, varanos, serpientes y cocodrilos de agua dulce que se lo comen, y causa fuertes descensos en el norte.",
    },
    79: {
      programs: "Plan nacional de recuperación del gran tiburón blanco",
    },
    84: {
      iucnNote: "Su estado mundial mejoró en 2025; algunas subpoblaciones siguen amenazadas.",
      programs: "Raine Island Recovery Project (Gran Barrera de Coral)",
    },
    85: {
      iucnNote: "Evaluado a nivel de especie (Arctocephalus pusillus).",
    },
    86: {
      vicScope: "Visitante ocasional de las costas de Victoria",
      programs: "Plan nacional de recuperación del león marino australiano",
    },
    100: {
      programs: "Criado en el zoo de Melbourne desde 2003; erradicación de las ratas en la isla de Lord Howe (2019)",
    },
    105: {
      iucnNote: "Estado según la Lista Roja (a través de GBIF). La especie sigue siendo común en gran parte de su área, así que conviene comprobarlo.",
    },
    107: {
      iucnNote: "Especie domesticada: la UICN no evalúa al gato.",
      impact: "Los gatos asilvestrados matan más de mil millones de animales autóctonos al año y han contribuido a la extinción de varios mamíferos. Se consideran la mayor amenaza para los pequeños mamíferos de Australia.",
    },
    108: {
      impact: "Caza insectos autóctonos, compite con las abejas y molesta en los pícnics y los huertos frutales.",
    },
    114: {
      iucnNote: "Ficha de nivel de género (varias especies): no tiene un único estado UICN.",
    },
    116: {
      impact: "Devora moluscos y otros invertebrados del fondo, amenaza el marisqueo y especies autóctonas como el pez mano moteado de Tasmania.",
    },
    117: {
      epbcScope: "Solo la subespecie del archipiélago de la Recherche (Australia Occidental)",
    },
    121: {
      iucnNote: "Amenazado en su área de origen en Asia; invasor en Australia.",
      impact: "Los sambares pisotean y pastan los humedales alpinos y la selva, dañan las orillas de los ríos y provocan accidentes de tráfico.",
    },
    123: {
      epbcScope: "Solo la población aislada de los montes Flinders (Australia Meridional)",
    },
    125: {
      iucnNote: "Evaluación de 2025 cuyos datos cuestionan algunos investigadores.",
    },
    128: {
      programs: "Plan nacional de recuperación del bacalao de Murray; repoblación con alevines",
    },
    130: {
      epbcScope: "Subespecie oriental, la que vive en Victoria",
      programs: "Programa Beach-nesting Birds de BirdLife Australia",
    },
    131: {
      programs: "Equipo nacional de recuperación del talégalo leipoa (National Malleefowl Recovery Team)",
    },
    133: {
      epbcScope: "Subespecies continentales del norte y del sur",
      vicScope: "Subespecie continental del sur",
    },
    134: {
      epbcScope: "Población continental: en peligro; Tasmania: vulnerable",
      programs: "Reintroducciones en Phillip Island, French Island y Churchill Island (Zoos Victoria, Phillip Island Nature Parks y socios)",
    },
    135: {
      iucnNote: "La UICN no evalúa la subespecie por separado.",
      programs: "Plan nacional de recuperación; protección de las cuevas de cría",
    },
    138: {
      iucnNote: "No evaluado por la UICN; todavía se debate si es una especie aparte.",
    },
    141: {
      iucnNote: "La UICN no evalúa la subespecie por separado.",
    },
    142: {
      programs: "Programas de recuperación en Victoria y Nueva Gales del Sur (entre ellos Zoos Victoria); corredores de pedregal bajo las pistas de esquí",
    },
    143: {
      programs: "Programa de recuperación del Gobierno de Victoria y Zoos Victoria; cajas nido artificiales",
    },
    144: {
      iucnNote: "La UICN evalúa la especie completa (Yellow-tufted Honeyeater, preocupación menor); la subespecie del casco no se evalúa por separado.",
      programs: "Cría y sueltas en el Healesville Sanctuary (Zoos Victoria); restauración de la reserva de Yellingbo",
    },
    145: {
      programs: "Equipo nacional de recuperación; cría en cautividad (Zoos Victoria, Moonlit Sanctuary, Tasmania) y sueltas",
    },
    146: {
      programs: "Cría en el zoo de Taronga y sueltas; plan nacional de recuperación",
    },
    147: {
      programs: "Programa de cría de Zoos Victoria",
    },
    148: {
      programs: "Programa de cría de Zoos Victoria iniciado tras el redescubrimiento",
    },
    149: {
      programs: "Cría en cautividad (Zoos Victoria, Taronga Western Plains); plan nacional de recuperación",
    },
    150: {
      programs: "Plan nacional de recuperación de la lombriz gigante de Gippsland",
    },
    151: {
      programs: "Reserva Pullen Pullen (Bush Heritage Australia); equipo nacional de recuperación",
    },
  },

  rescue: {
    "wildlife-victoria": "Servicio de urgencias 24 h, todos los días, para toda Victoria.",
    "deeca": "Gobierno de Victoria: animales heridos en incendios, inundaciones u olas de calor.",
    "wires": "Línea de rescate abierta 24 h, los 365 días del año.",
    "rspca-qld-1300-animal": "Animales silvestres heridos o huérfanos (salvo cocodrilos, casuarios y animales marinos).",
    "queensland-wildlife-hotline": "Tortugas, delfines, dugongos y ballenas varados (opción 1), cocodrilos y casuarios.",
    "wildcare-helpline": "Te pone en contacto con el cuidador autorizado más cercano, en toda Australia Occidental.",
    "fauna-rescue-of-south-australia": "Línea de urgencias 24 h para todos los animales silvestres.",
    "bonorong-wildlife-rescue": "Servicio de rescate 24 h para toda Tasmania.",
    "nre-tas-wildlife-services": "Servicio del Gobierno de Tasmania (horario de oficina).",
    "wildcare-nt": "Voluntarios de la zona de Darwin; puede que no respondan enseguida.",
    "act-wildlife": "Línea 24 h para animales autóctonos heridos, enfermos o huérfanos.",
    "access-canberra": "Canguros heridos, accidentes con canguros y urgencias fuera de horario.",
    "emergency-animal-disease-hotline": "Aves u otros animales encontrados enfermos o muertos (sospecha de gripe aviar H5).",
  },
};
