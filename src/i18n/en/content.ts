// Species content in English: names, species texts, conservation and rescue.
// Every language has a file with the same structure (src/i18n/<language>/content.ts).
// English is also the fallback when a common name does not exist in another language.
import type { ContentPack } from '../types';

export const content: ContentPack = {
  species: {
    // #001 Osphranter rufus
    1: {
      name: "Red Kangaroo",
      habitat: "Arid and semi-arid inland plains",
      description: "The largest living marsupial: a male can stand over 1.8 m tall. It lives in groups called “mobs”.",
      funFact: "It can leap 8 m in a single bound and reach 60 km/h.",
      diet: "Grasses and leaves",
    },
    // #002 Macropus giganteus
    2: {
      name: "Eastern Grey Kangaroo",
      habitat: "Open forests, grasslands, golf courses",
      description: "A very widespread kangaroo of eastern Australia, with grey-brown fur and a hairy muzzle.",
      funFact: "You often see them grazing on lawns at dusk.",
      diet: "Grasses and leaves",
    },
    // #003 Notamacropus rufogriseus
    3: {
      name: "Red-necked Wallaby",
      habitat: "Eucalypt forests and forest edges",
      description: "A medium-sized wallaby recognisable by the reddish tint on its neck and shoulders.",
      funFact: "In Tasmania it is called “Bennett’s wallaby” and has a thicker coat.",
      diet: "Grasses and leaves",
    },
    // #004 Osphranter robustus
    4: {
      name: "Common Wallaroo",
      habitat: "Rocky areas and escarpments",
      description: "A stocky macropod with powerful shoulders, adapted to rocky terrain.",
      funFact: "It can go months without drinking by sheltering from the heat in caves.",
      diet: "Grasses and leaves",
    },
    // #005 Setonix brachyurus
    5: {
      name: "Quokka",
      habitat: "Rottnest Island and south-western forests",
      description: "A small macropod with a smiling face, famous for selfies on Rottnest Island.",
      funFact: "Touching or feeding it is forbidden — and the fines are steep!",
      diet: "Grasses and leaves",
    },
    // #006 Phascolarctos cinereus
    6: {
      name: "Koala",
      habitat: "Eucalypt forests",
      description: "A tree-dwelling marsupial that feeds almost exclusively on eucalyptus leaves.",
      funFact: "It sleeps up to 20 hours a day to save energy.",
      diet: "Eucalyptus leaves",
    },
    // #007 Vombatus ursinus
    7: {
      name: "Common Wombat",
      habitat: "Temperate forests, heathland and grassland",
      description: "A hefty burrowing marsupial that digs long tunnels. Its pouch opens backwards.",
      funFact: "Its droppings are cube-shaped, which stops them from rolling away!",
      diet: "Grasses",
    },
    // #008 Ornithorhynchus anatinus
    8: {
      name: "Platypus",
      habitat: "Freshwater rivers and creeks",
      description: "An egg-laying mammal with a duck’s bill and a beaver’s tail.",
      funFact: "Males have a venomous spur on their hind legs.",
      diet: "Larvae, worms and freshwater shrimp",
    },
    // #009 Tachyglossus aculeatus
    9: {
      name: "Short-beaked Echidna",
      habitat: "Almost every habitat, from desert to forest",
      description: "An egg-laying mammal covered in spines that feeds on ants and termites.",
      funFact: "Its sticky tongue can be 18 cm long.",
      diet: "Ants and termites",
    },
    // #010 Sarcophilus harrisii
    10: {
      name: "Tasmanian Devil",
      habitat: "Tasmanian forests and farmland",
      description: "The largest living carnivorous marsupial, known for its terrifying screeches at night.",
      funFact: "Relative to its size, its jaw is one of the most powerful in the animal kingdom.",
      diet: "Carrion and small animals",
    },
    // #011 Canis dingo
    11: {
      name: "Dingo",
      habitat: "Deserts, forests, coasts",
      description: "A wild dog that arrived in Australia about 4,000 years ago; the continent’s top predator.",
      funFact: "Dingoes hardly ever bark: they howl.",
    },
    // #012 Trichosurus vulpecula
    12: {
      name: "Common Brushtail Possum",
      habitat: "Forests, parks… and suburban roofs",
      description: "A nocturnal possum with a bushy tail, very well adapted to city life.",
      funFact: "It loves moving into the roofs of Australian houses.",
      diet: "Leaves, flowers and fruit",
    },
    // #013 Pseudocheirus peregrinus
    13: {
      name: "Common Ringtail Possum",
      habitat: "Forests, scrub and gardens",
      description: "A small possum with a white-tipped prehensile tail that builds nests called “dreys”.",
      funFact: "It eats its own soft droppings to digest leaves better.",
      diet: "Leaves, flowers and fruit",
    },
    // #014 Petaurus breviceps
    14: {
      name: "Sugar Glider",
      habitat: "Eucalypt forests",
      description: "A small gliding marsupial that sails from tree to tree using a membrane between its legs.",
      funFact: "It can glide more than 50 metres.",
      diet: "Sap, nectar and insects",
    },
    // #015 Myrmecobius fasciatus
    15: {
      name: "Numbat",
      habitat: "Wandoo woodlands of the south-west",
      description: "A striped, day-active marsupial that eats up to 20,000 termites a day. Emblem of Western Australia.",
      funFact: "Fewer than 1,000 adult numbats remain in the wild.",
      diet: "Termites",
    },
    // #016 Macrotis lagotis
    16: {
      name: "Greater Bilby",
      habitat: "Arid deserts and grasslands",
      description: "A nocturnal marsupial with rabbit-like ears, a symbol of the fight against invasive species.",
      funFact: "In Australia, people give chocolate bilbies at Easter instead of bunnies.",
      diet: "Insects, seeds, bulbs and fungi",
    },
    // #017 Dasyurus maculatus
    17: {
      name: "Spotted-tailed Quoll",
      habitat: "Rainforests and wet sclerophyll forests",
      description: "A carnivorous marsupial with brown fur dotted with white spots, and an excellent climber.",
      funFact: "It is the second-largest carnivorous marsupial after the Tasmanian devil.",
      diet: "Small mammals and birds",
    },
    // #018 Perameles nasuta
    18: {
      name: "Long-nosed Bandicoot",
      habitat: "Forests, heathland and gardens",
      description: "A small marsupial with a pointed snout that digs small cone-shaped holes to find insects.",
      funFact: "Its pregnancy lasts just 12 days, one of the shortest of any mammal.",
      diet: "Insects and invertebrates",
    },
    // #019 Pteropus poliocephalus
    19: {
      name: "Grey-headed Flying-fox",
      habitat: "Coastal forests, city parks",
      description: "A large fruit bat with a russet collar that forms huge colonies in cities.",
      funFact: "It pollinates eucalypts across dozens of kilometres every night.",
      diet: "Nectar, pollen and fruit",
    },
    // #020 Petrogale xanthopus
    20: {
      name: "Yellow-footed Rock-wallaby",
      habitat: "Inland gorges and cliffs",
      description: "One of the most beautiful macropods, with fur striped in grey, white, yellow and orange.",
      funFact: "Its rough-soled feet give it perfect grip on rock.",
    },
    // #021 Thylogale billardierii
    21: {
      name: "Tasmanian Pademelon",
      habitat: "Damp Tasmanian undergrowth",
      description: "A small, stocky and shy macropod with thick fur and a short tail.",
      funFact: "It has vanished from the mainland and now survives only in Tasmania.",
      diet: "Grasses",
    },
    // #022 Dendrolagus lumholtzi
    22: {
      name: "Lumholtz’s Tree-kangaroo",
      habitat: "Rainforests of the Atherton Tablelands",
      description: "A kangaroo that lives in trees! It climbs using its muscular forelimbs.",
      funFact: "It can jump to the ground from 15 m up without getting hurt.",
      diet: "Leaves",
    },
    // #023 Oryctolagus cuniculus
    23: {
      name: "European Rabbit",
      habitat: "Grasslands, fields, degraded land",
      description: "Introduced in 1859, it became one of the country’s worst invasive species.",
      funFact: "The world’s longest fence (over 3,000 km) was built to stop it.",
      diet: "Grasses and leaves",
    },
    // #024 Vulpes vulpes
    24: {
      name: "Red Fox",
      habitat: "Almost everywhere except the tropical far north",
      description: "Introduced in the 19th century for hunting, it now threatens many small marsupials.",
      funFact: "There are estimated to be more than 1.7 million foxes in Australia.",
      diet: "Small mammals, birds, insects, fruit",
    },
    // #025 Camelus dromedarius
    25: {
      name: "Feral Camel",
      habitat: "Central deserts",
      description: "Imported in the 19th century to explore the Outback, their descendants now roam wild.",
      funFact: "Australia has the largest population of wild dromedaries in the world.",
      diet: "Desert plants",
    },
    // #026 Dromaius novaehollandiae
    26: {
      name: "Emu",
      habitat: "Plains, savannas and open woodland",
      description: "The second-largest bird in the world after the ostrich, and unable to fly.",
      funFact: "The male incubates the eggs for 8 weeks without eating.",
      diet: "Seeds, fruit, insects",
    },
    // #027 Casuarius casuarius
    27: {
      name: "Southern Cassowary",
      habitat: "Tropical rainforests of northern Queensland",
      description: "A giant bird with a bony casque and a bright blue neck, an essential gardener of the rainforest.",
      funFact: "Its 12 cm claws make it one of the most dangerous birds in the world.",
      diet: "Fallen fruit",
    },
    // #028 Dacelo novaeguineae
    28: {
      name: "Laughing Kookaburra",
      habitat: "Open woodland, parks and gardens",
      description: "The famous kookaburra, whose call sounds like a burst of laughter.",
      funFact: "It hunts snakes by dropping them from a height.",
      diet: "Insects, lizards, snakes, rodents",
    },
    // #029 Cacatua galerita
    29: {
      name: "Sulphur-crested Cockatoo",
      habitat: "Forests, parks and cities",
      description: "A large white cockatoo with a yellow crest, noisy and very intelligent.",
      funFact: "In Sydney they have learned to open wheelie bins… and teach the trick to each other!",
      diet: "Seeds and fruit",
    },
    // #030 Eolophus roseicapilla
    30: {
      name: "Galah",
      habitat: "Plains, farmland and towns",
      description: "A pink-and-grey cockatoo, very common and often seen in large flocks on the ground.",
      funFact: "In Australian slang, “galah” means… “fool”!",
      diet: "Seeds",
    },
    // #031 Trichoglossus moluccanus
    31: {
      name: "Rainbow Lorikeet",
      habitat: "Coastal forests, flowering gardens",
      description: "A brilliantly coloured parrot that feeds on nectar with its brush-tipped tongue.",
      funFact: "They gather in roosts of several thousand birds in cities.",
      diet: "Nectar, pollen and fruit",
    },
    // #032 Melopsittacus undulatus
    32: {
      name: "Budgerigar",
      habitat: "Arid savannas and grasslands",
      description: "A small green-and-yellow nomadic parrot that follows the rain across the inland.",
      funFact: "In the wild, they fly in flocks of tens of thousands.",
      diet: "Grass seeds",
    },
    // #033 Nymphicus hollandicus
    33: {
      name: "Cockatiel",
      habitat: "Arid areas close to water",
      description: "A small grey cockatoo with a yellow crest and orange cheeks.",
      funFact: "It is the smallest member of the cockatoo family.",
      diet: "Seeds",
    },
    // #034 Calyptorhynchus banksii
    34: {
      name: "Red-tailed Black Cockatoo",
      habitat: "Open woodland and savanna",
      description: "A large black cockatoo whose tail flashes bright red bands in flight.",
      funFact: "It can live for more than 50 years.",
      diet: "Eucalyptus and banksia seeds",
    },
    // #035 Lophochroa leadbeateri
    35: {
      name: "Major Mitchell’s Cockatoo",
      habitat: "Arid bush and mallee",
      description: "A salmon-pink cockatoo with a red, yellow and white crest: one of the most beautiful in the world.",
      funFact: "When raised, its crest looks like a fan of fire.",
    },
    // #036 Menura novaehollandiae
    36: {
      name: "Superb Lyrebird",
      habitat: "Wet mountain forests",
      description: "A lyrebird with a spectacular tail, the world champion of mimicry.",
      funFact: "It imitates other birds, but also camera shutters and chainsaws!",
      diet: "Insects and invertebrates",
    },
    // #037 Gymnorhina tibicen
    37: {
      name: "Australian Magpie",
      habitat: "Parks, sports fields, countryside",
      description: "A black-and-white bird with a melodious song, iconic of Australian mornings.",
      funFact: "In spring, some males swoop on cyclists who come near their nest.",
      diet: "Worms and ground insects",
    },
    // #038 Threskiornis molucca
    38: {
      name: "Australian White Ibis",
      habitat: "Wetlands, city parks",
      description: "A large white wading bird with a curved bill that has become a regular at city bins.",
      funFact: "Affectionately nicknamed the “bin chicken”.",
      diet: "Crayfish and food scraps",
    },
    // #039 Pelecanus conspicillatus
    39: {
      name: "Australian Pelican",
      habitat: "Lakes, estuaries and coasts",
      description: "A large black-and-white pelican with the longest bill of any bird.",
      funFact: "Its bill can be up to 50 cm long.",
      diet: "Fish",
    },
    // #040 Cygnus atratus
    40: {
      name: "Black Swan",
      habitat: "Lakes, swamps and estuaries",
      description: "An all-black swan with a bright red bill, emblem of Western Australia.",
      funFact: "Europeans believed black swans did not exist… until 1697.",
      diet: "Water plants and algae",
    },
    // #041 Eudyptula minor
    41: {
      name: "Little Penguin",
      habitat: "Southern coasts and islands",
      description: "The world’s smallest penguin, with bluish plumage, that waddles home to its burrow at nightfall.",
      funFact: "The Phillip Island “penguin parade” draws thousands of visitors every evening.",
      diet: "Small fish and squid",
    },
    // #042 Malurus cyaneus
    42: {
      name: "Superb Fairywren",
      habitat: "Shrubs, gardens and parks",
      description: "A tiny songbird whose male wears electric-blue plumage in the breeding season.",
      funFact: "Females teach a “password” to their eggs before they hatch.",
      diet: "Insects",
    },
    // #043 Aquila audax
    43: {
      name: "Wedge-tailed Eagle",
      habitat: "Almost all open habitats",
      description: "Australia’s largest bird of prey, with a diamond-shaped tail.",
      funFact: "Its wingspan can reach 2.8 m.",
      diet: "Rabbits, wallabies, carrion",
    },
    // #044 Haliaeetus leucogaster
    44: {
      name: "White-bellied Sea-Eagle",
      habitat: "Coasts, large lakes and rivers",
      description: "A large white-and-grey eagle that hunts fish and sea snakes near the coast.",
      funFact: "Pairs reuse the same giant nest for years.",
      diet: "Fish, sea snakes, birds",
    },
    // #045 Podargus strigoides
    45: {
      name: "Tawny Frogmouth",
      habitat: "Open woodland and parks",
      description: "A nocturnal bird with perfect camouflage that mimics a broken branch by day.",
      funFact: "It is not an owl: it is more closely related to nightjars.",
      diet: "Insects and invertebrates",
    },
    // #046 Ninox boobook
    46: {
      name: "Southern Boobook",
      habitat: "Forests and woodland",
      description: "A small brown owl whose “boo-book” call gave it its name.",
      funFact: "It is Australia’s smallest and most widespread owl.",
      diet: "Insects and small mammals",
    },
    // #047 Ninox strenua
    47: {
      name: "Powerful Owl",
      habitat: "Wet forests with tall trees",
      description: "Australia’s largest owl, able to catch possums.",
      funFact: "It often keeps its prey in its talons all day long.",
      diet: "Possums and gliders",
    },
    // #048 Antigone rubicunda
    48: {
      name: "Brolga",
      habitat: "Wetlands and floodplains",
      description: "A large grey crane with a red head, famous for its courtship dances.",
      funFact: "Its dance has inspired many Aboriginal dances.",
      diet: "Insects and frogs",
    },
    // #049 Ephippiorhynchus asiaticus
    49: {
      name: "Black-necked Stork",
      habitat: "Tropical swamps and billabongs",
      description: "A large stork with an iridescent black neck and red legs, known as the “jabiru” in Australia.",
      funFact: "It is Australia’s only stork.",
      diet: "Fish and frogs",
    },
    // #050 Manorina melanocephala
    50: {
      name: "Noisy Miner",
      habitat: "Parks, gardens and open woodland",
      description: "A grey honeyeater with a yellow mask, very territorial and very chatty.",
      funFact: "They team up to chase other birds out of their territory.",
      diet: "Nectar, insects and fruit",
    },
    // #051 Ptilonorhynchus violaceus
    51: {
      name: "Satin Bowerbird",
      habitat: "Rainforests and gardens",
      description: "The blue-black male builds a bower decorated with blue objects to attract a female.",
      funFact: "It collects bottle caps, pegs and straws… as long as they are blue!",
      diet: "Fruit and insects",
    },
    // #052 Alectura lathami
    52: {
      name: "Australian Brushturkey",
      habitat: "Rainforests, suburban gardens",
      description: "A big black bird with a red head that builds a huge compost mound to incubate its eggs.",
      funFact: "The male checks the nest temperature with its beak.",
    },
    // #053 Chloebia gouldiae
    53: {
      name: "Gouldian Finch",
      habitat: "Tropical savannas of the north",
      description: "A small finch with incredible colours: purple, green, yellow and red.",
      funFact: "Only a few thousand remain in the wild.",
      diet: "Grass seeds",
    },
    // #054 Pardalotus punctatus
    54: {
      name: "Spotted Pardalote",
      habitat: "Eucalypt forests",
      description: "A tiny bird covered in white spots that nests in tunnels dug into the ground.",
      funFact: "It weighs barely 8 grams.",
    },
    // #055 Rhipidura leucophrys
    55: {
      name: "Willie Wagtail",
      habitat: "Everywhere except dense forest",
      description: "A small black-and-white bird that constantly wags its fan-shaped tail.",
      funFact: "It doesn’t hesitate to harass eagles far bigger than itself.",
      diet: "Insects and invertebrates",
    },
    // #056 Alisterus scapularis
    56: {
      name: "Australian King-Parrot",
      habitat: "Rainforests and gardens",
      description: "A large parrot whose male has a bright red head and belly and a green back.",
      funFact: "Only the male has a red head: the female is green.",
      diet: "Seeds and fruit",
    },
    // #057 Platycercus elegans
    57: {
      name: "Crimson Rosella",
      habitat: "Mountain forests and parks",
      description: "A crimson parrot with blue cheeks and wings.",
      funFact: "Young birds are almost entirely green.",
      diet: "Seeds and fruit",
    },
    // #058 Crocodylus porosus
    58: {
      name: "Saltwater Crocodile",
      habitat: "Tropical estuaries, rivers and coasts",
      description: "The largest living reptile: males can exceed 6 m and 1,000 kg.",
      funFact: "Its bite is the most powerful ever measured in an animal.",
      diet: "Fish, birds, mammals",
    },
    // #059 Crocodylus johnstoni
    59: {
      name: "Freshwater Crocodile",
      habitat: "Freshwater rivers and gorges",
      description: "A slender-snouted crocodile, smaller and shyer than its saltwater cousin.",
      funFact: "It can “gallop” on land to escape danger.",
      diet: "Fish, insects, frogs",
    },
    // #060 Chlamydosaurus kingii
    60: {
      name: "Frill-necked Lizard",
      habitat: "Savannas and dry tropical woodland",
      description: "A lizard that spreads a huge frill around its neck to scare off enemies.",
      funFact: "When it flees, it runs upright on its hind legs.",
      diet: "Insects and invertebrates",
    },
    // #061 Moloch horridus
    61: {
      name: "Thorny Devil",
      habitat: "Sandy deserts",
      description: "A small lizard covered in spines that eats nothing but ants.",
      funFact: "It drinks through its skin: water travels to its mouth through tiny channels.",
      diet: "Ants",
    },
    // #062 Tiliqua scincoides
    62: {
      name: "Eastern Blue-tongued Lizard",
      habitat: "Gardens, open woodland, grassland",
      description: "A large, placid lizard that sticks out a cobalt-blue tongue to scare predators.",
      funFact: "Gardeners love it: it eats snails.",
      diet: "Snails, insects and fruit",
    },
    // #063 Tiliqua rugosa
    63: {
      name: "Shingleback Lizard",
      habitat: "Semi-arid areas and mallee",
      description: "A stocky lizard with pine-cone-like scales and a tail shaped like its head.",
      funFact: "Pairs stay together for more than 20 years.",
      diet: "Plants, flowers, snails",
    },
    // #064 Pogona vitticeps
    64: {
      name: "Central Bearded Dragon",
      habitat: "Arid areas and dry woodland",
      description: "A lizard with a spiny “beard” that it puffs up and darkens when threatened.",
      funFact: "It greets others by waving one of its front legs in circles.",
      diet: "Insects and plants",
    },
    // #065 Intellagama lesueurii
    65: {
      name: "Australian Water Dragon",
      habitat: "Creek banks, city parks",
      description: "A large semi-aquatic lizard often seen basking in the sun near water.",
      funFact: "It can stay underwater for up to 90 minutes.",
      diet: "Insects, small animals, fruit",
    },
    // #066 Varanus varius
    66: {
      name: "Lace Monitor",
      habitat: "Forests and picnic grounds",
      description: "A large black-and-cream goanna that climbs trees to raid nests.",
      funFact: "It can grow longer than 2 m.",
      diet: "Eggs and carrion",
    },
    // #067 Varanus giganteus
    67: {
      name: "Perentie",
      habitat: "Rocky deserts of the centre",
      description: "Australia’s largest lizard and the fourth largest in the world.",
      funFact: "It can reach 2.5 m and run very fast on its hind legs.",
      diet: "Lizards, mammals, birds",
    },
    // #068 Saltuarius cornutus
    68: {
      name: "Northern Leaf-tailed Gecko",
      habitat: "Tropical rainforests of the north-east",
      description: "A gecko with incredible camouflage that blends into tree bark.",
      funFact: "Its flat tail looks like a dead leaf.",
      diet: "Insects",
    },
    // #069 Oxyuranus microlepidotus
    69: {
      name: "Inland Taipan",
      habitat: "Arid floodplains of the central east",
      description: "The snake with the most potent venom in the world, but very shy and rarely seen.",
      funFact: "Its skin changes colour with the seasons: darker in winter.",
      diet: "Rodents",
    },
    // #070 Pseudonaja textilis
    70: {
      name: "Eastern Brown Snake",
      habitat: "Fields, grassland and suburbs",
      description: "A highly venomous, fast snake responsible for most serious snakebites in Australia.",
      funFact: "It hunts mice, which draws it close to farms.",
      diet: "Rodents, lizards, birds",
    },
    // #071 Pseudechis porphyriacus
    71: {
      name: "Red-bellied Black Snake",
      habitat: "Wetlands and riverbanks",
      description: "A glossy black snake with red flanks, venomous but not aggressive.",
      funFact: "It hunts frogs and can stay underwater for 20 minutes.",
      diet: "Frogs and small animals",
    },
    // #072 Morelia spilota
    72: {
      name: "Carpet Python",
      habitat: "Forests, rocky areas and roof spaces",
      description: "A large non-venomous python with carpet-like patterns, often found in roofs.",
      funFact: "It senses the heat of its prey through pits on its lips.",
      diet: "Rodents and birds",
    },
    // #073 Chelodina longicollis
    73: {
      name: "Eastern Long-necked Turtle",
      habitat: "Swamps, ponds and farm dams",
      description: "A freshwater turtle whose neck is almost as long as its shell.",
      funFact: "It folds its neck sideways instead of pulling it in.",
      diet: "Insects, crustaceans, tadpoles",
    },
    // #074 Ranoides caerulea
    74: {
      name: "Australian Green Tree Frog",
      habitat: "Forests, gardens and… toilets!",
      description: "A big, chubby green frog with a permanent smile that loves houses.",
      funFact: "Its skin produces substances studied for fighting bacteria.",
      diet: "Insects",
    },
    // #075 Litoria chloris
    75: {
      name: "Red-eyed Tree Frog",
      habitat: "Rainforests of the east coast",
      description: "A bright green tree frog with orange eyes and bluish thighs.",
      funFact: "It only appears in large numbers after big summer storms.",
    },
    // #076 Limnodynastes peronii
    76: {
      name: "Striped Marsh Frog",
      habitat: "Ponds, ditches and garden ponds",
      description: "A striped brown frog whose call sounds like the “tok” of a ping-pong ball.",
      funFact: "It lays its eggs in a floating foam nest.",
    },
    // #077 Pseudophryne corroboree
    77: {
      name: "Southern Corroboree Frog",
      habitat: "Alpine bogs of Kosciuszko",
      description: "A tiny frog with bright yellow and black stripes, one of the most endangered in the world.",
      funFact: "It makes its own poison, unlike most toxic frogs.",
      diet: "Ants and small insects",
    },
    // #078 Rhinella marina
    78: {
      name: "Cane Toad",
      habitat: "Almost every tropical habitat",
      description: "Introduced in 1935 to control a beetle, it became a toxic plague.",
      funFact: "Its poison glands can kill a crocodile or a quoll that eats it.",
      diet: "Insects, small animals, pet food",
    },
    // #079 Carcharodon carcharias
    79: {
      name: "Great White Shark",
      habitat: "Temperate coastal waters",
      description: "The great predator of the oceans, which can exceed 6 m in length.",
      funFact: "It can detect a drop of blood in 100 litres of water.",
      diet: "Seals, fish, rays",
    },
    // #080 Rhincodon typus
    80: {
      name: "Whale Shark",
      habitat: "Ningaloo Reef and tropical waters",
      description: "The largest fish in the world, a harmless giant that filters plankton.",
      funFact: "Every whale shark has a unique pattern of spots, like a fingerprint.",
      diet: "Plankton and small fish",
    },
    // #081 Megaptera novaeangliae
    81: {
      name: "Humpback Whale",
      habitat: "East and west coasts during migration",
      description: "An acrobatic whale that migrates along the Australian coast every winter.",
      funFact: "Males sing complex songs that change every year.",
      diet: "Krill and small fish",
    },
    // #082 Tursiops aduncus
    82: {
      name: "Indo-Pacific Bottlenose Dolphin",
      habitat: "Bays and coastal waters",
      description: "A very sociable coastal dolphin, often seen from beaches and harbours.",
      funFact: "At Shark Bay, some use sponges to protect their beaks while foraging.",
      diet: "Fish and squid",
    },
    // #083 Dugong dugon
    83: {
      name: "Dugong",
      habitat: "Tropical seagrass meadows",
      description: "A plant-eating marine mammal, cousin of the manatee, that grazes on seagrass.",
      funFact: "Sailors of old may have mistaken it for a mermaid.",
      diet: "Seagrass",
    },
    // #084 Chelonia mydas
    84: {
      name: "Green Sea Turtle",
      habitat: "Coral reefs and seagrass beds",
      description: "A large sea turtle that nests on Queensland beaches, such as Raine Island.",
      funFact: "Its shell isn’t green: its name comes from the colour of its fat.",
      diet: "Seagrass and algae",
    },
    // #085 Arctocephalus pusillus doriferus
    85: {
      name: "Australian Fur Seal",
      habitat: "Rocky islands of Bass Strait",
      description: "A sturdy fur seal that rests in large colonies on the rocks.",
      funFact: "It can dive deeper than 200 m to hunt.",
      diet: "Fish and squid",
    },
    // #086 Neophoca cinerea
    86: {
      name: "Australian Sea Lion",
      habitat: "Southern beaches and islands",
      description: "An endemic sea lion, curious and playful with divers.",
      funFact: "Its breeding cycle lasts 18 months, unique among seals and sea lions.",
      diet: "Fish, squid, crustaceans",
    },
    // #087 Phycodurus eques
    87: {
      name: "Leafy Seadragon",
      habitat: "Southern kelp forests",
      description: "A cousin of the seahorse decorated with leaf-like appendages that look like seaweed.",
      funFact: "The male carries the eggs under its tail.",
      diet: "Small crustaceans (mysids)",
    },
    // #088 Amphiprion percula
    88: {
      name: "Orange Clownfish",
      habitat: "Anemones of the Great Barrier Reef",
      description: "A small orange-and-white fish that lives in partnership with sea anemones.",
      funFact: "They are all born male; the largest in the group becomes female.",
      diet: "Algae and zooplankton",
    },
    // #089 Cheilinus undulatus
    89: {
      name: "Humphead Wrasse",
      habitat: "Coral reefs",
      description: "A huge blue-green wrasse with a bump on its forehead, which can exceed 2 m.",
      funFact: "It is one of the few predators of the crown-of-thorns starfish.",
      diet: "Molluscs, crustaceans, urchins",
    },
    // #090 Mobula alfredi
    90: {
      name: "Reef Manta Ray",
      habitat: "Reefs and cleaning stations",
      description: "A graceful giant ray with the largest brain of any fish.",
      funFact: "Its wingspan can reach 5 m.",
      diet: "Plankton",
    },
    // #091 Sepia apama
    91: {
      name: "Giant Australian Cuttlefish",
      habitat: "Rocky reefs of Spencer Gulf",
      description: "The largest cuttlefish in the world, a master of colour change.",
      funFact: "At Whyalla, thousands gather every winter to breed.",
      diet: "Fish and crustaceans",
    },
    // #092 Hapalochlaena maculosa
    92: {
      name: "Southern Blue-ringed Octopus",
      habitat: "Rock pools and rocky shores",
      description: "A small octopus with fluorescent blue rings and deadly venom.",
      funFact: "It fits in your hand… but you must never touch it.",
      diet: "Crabs and shrimp",
    },
    // #093 Chironex fleckeri
    93: {
      name: "Box Jellyfish",
      habitat: "Tropical coastal waters (Oct. to May)",
      description: "An almost transparent jellyfish, among the most venomous animals on the planet.",
      funFact: "It has 24 eyes, some of which form real images.",
      diet: "Shrimp and small fish",
    },
    // #094 Mictyris longicarpus
    94: {
      name: "Soldier Crab",
      habitat: "Mudflats and sheltered beaches",
      description: "A small blue crab that marches in “armies” of thousands at low tide.",
      funFact: "Unlike other crabs, it walks forwards.",
      diet: "Organic matter in the sand",
    },
    // #095 Atrax robustus
    95: {
      name: "Sydney Funnel-web Spider",
      habitat: "Moist soil around Sydney",
      description: "A glossy black spider whose venom is extremely dangerous to humans.",
      funFact: "No deaths have been recorded since the antivenom was introduced in 1981.",
      diet: "Insects",
    },
    // #096 Latrodectus hasselti
    96: {
      name: "Redback Spider",
      habitat: "Garden sheds, letterboxes, outdoor toilets",
      description: "A small black spider with a red stripe on its back, cousin of the black widow.",
      funFact: "The male sometimes sacrifices itself by placing itself in the female’s mouth.",
      diet: "Insects",
    },
    // #097 Holconia immanis
    97: {
      name: "Grey Huntsman Spider",
      habitat: "Tree bark, walls and car sun visors",
      description: "A large, flat and fast spider: impressive but harmless.",
      funFact: "It can measure more than 15 cm across, legs included.",
    },
    // #098 Papilio ulysses
    98: {
      name: "Ulysses Butterfly",
      habitat: "Tropical rainforests of northern Queensland",
      description: "A large butterfly with electric-blue wings, emblem of Queensland tourism.",
      funFact: "It is drawn to anything bright blue, even an umbrella.",
      diet: "Caterpillar: leaves",
    },
    // #099 Extatosoma tiaratum
    99: {
      name: "Macleay’s Spectre",
      habitat: "Rainforests",
      description: "A stick insect disguised as a spiny dead leaf, which sways like a leaf in the wind.",
      funFact: "Its eggs are carried off by ants, which mistake them for seeds.",
      diet: "Eucalyptus and bramble leaves",
    },
    // #100 Dryococelus australis
    100: {
      name: "Lord Howe Island Stick Insect",
      habitat: "Ball’s Pyramid and breeding programmes",
      description: "The “tree lobster”, thought extinct for 80 years before being rediscovered in 2001.",
      funFact: "The entire wild species lived under a single bush on a rock in the middle of the sea.",
      diet: "Melaleuca",
    },
    // #101 Myrmecia gulosa
    101: {
      name: "Red Bull Ant",
      habitat: "Open woodland and sandy soils",
      description: "A large ant with impressive jaws and a very painful sting.",
      funFact: "It has excellent eyesight and can follow your movements.",
      diet: "Insects",
    },
    // #102 Cyclochila australasiae
    102: {
      name: "Green Grocer Cicada",
      habitat: "Trees in parks and forests",
      description: "A large green cicada whose deafening song is the soundtrack of the Australian summer.",
      funFact: "Its song can exceed 120 decibels, as loud as a rock concert.",
      diet: "Tree sap",
    },
    // #103 Amegilla cingulata
    103: {
      name: "Blue-banded Bee",
      habitat: "Gardens and flowering edges",
      description: "A solitary bee with a body striped in metallic blue.",
      funFact: "It pollinates tomatoes by making the flowers vibrate (“buzz pollination”).",
      diet: "Nectar and pollen",
    },
    // #104 Arachnocampa richardsae
    104: {
      name: "Glow-worm",
      habitat: "Caves and damp gullies",
      description: "A fungus-gnat larva that glows in the dark to lure prey into sticky threads.",
      funFact: "The ceilings of some caves look like a starry sky.",
      diet: "Small insects",
    },
    // #105 Cherax destructor
    105: {
      name: "Common Yabby",
      habitat: "Farm dams, rivers and swamps",
      description: "A very hardy freshwater crayfish that can survive drought in its burrow.",
      funFact: "Australian kids catch them with a piece of meat tied to a string.",
    },
    // #106 Wallabia bicolor
    106: {
      name: "Swamp Wallaby",
      habitat: "Dense forest, undergrowth and heathland",
      description: "A dark, stocky wallaby that moves through the undergrowth with its head held low. Common on Phillip Island.",
      funFact: "Females can become pregnant again before their current joey is even born — unique among mammals.",
      diet: "Ferns and shrubs",
    },
    // #107 Felis catus
    107: {
      name: "Feral Cat",
      habitat: "Everywhere, from desert to forest and islands",
      description: "A domestic cat gone wild, found across almost all of Australia.",
      funFact: "Feral cats are estimated to kill more than a billion native animals in Australia every year.",
      diet: "Small mammals, birds, reptiles",
    },
    // #108 Vespula germanica
    108: {
      name: "European Wasp",
      habitat: "Gardens, parks and picnic areas",
      description: "A yellow-and-black wasp that reached Australia in the late 1950s; aggressive near its underground nest.",
      funFact: "Unlike a honeybee, it can sting more than once.",
      diet: "Insects",
    },
    // #109 Haematopus longirostris
    109: {
      name: "Pied Oystercatcher",
      habitat: "Sandy beaches and estuaries",
      description: "A black-and-white shorebird with a long bright-orange bill and pink legs.",
      funFact: "Despite its name, it mostly eats shellfish such as pipis rather than oysters.",
      diet: "Shellfish",
    },
    // #110 Ardenna tenuirostris
    110: {
      name: "Short-tailed Shearwater",
      habitat: "Southern islands and coasts; the open ocean the rest of the year",
      description: "A seabird nicknamed the “muttonbird” that nests in burrows by the hundreds of thousands on Phillip Island and the Bass Strait islands.",
      funFact: "Every year it makes a round trip of more than 30,000 km to the North Pacific.",
    },
    // #111 Crinia signifera
    111: {
      name: "Common Eastern Froglet",
      habitat: "Ponds, ditches and damp gardens",
      description: "A tiny brown frog, one of the most common in the south-east, heard far more often than seen.",
      funFact: "Its call sounds like a cricket’s “crick-crick-crick”.",
      diet: "Insects",
    },
    // #112 Trichonephila edulis
    112: {
      name: "Australian Golden Orb-weaver",
      habitat: "Gardens, forest edges and open woodland",
      description: "A large spider whose strong, golden web can be more than a metre across.",
      funFact: "The male is much smaller than the female and often lives on the edge of her web.",
      diet: "Insects",
    },
    // #113 Badumna insignis
    113: {
      name: "Black House Spider",
      habitat: "Window corners, walls and tree bark",
      description: "A stocky black spider that spins messy, funnel-shaped webs around windows.",
      funFact: "Its bite is painful but rarely serious.",
      diet: "Insects",
    },
    // #114 Anoplognathus
    114: {
      name: "Christmas Beetle",
      habitat: "Eucalypts in parks and forests",
      description: "Big beetles with golden, green or brown sheens that appear in numbers around Christmas, in the southern summer. (This entry covers the whole genus.)",
      funFact: "There are about 35 species, almost all of them in Australia.",
      diet: "Eucalyptus",
    },
    // #115 Heterodontus portusjacksoni
    115: {
      name: "Port Jackson Shark",
      habitat: "Shallow rocky and sandy seabeds",
      description: "A small, harmless shark with a bulging forehead and harness-like markings that crushes sea urchins and shellfish.",
      funFact: "Females wedge their corkscrew-shaped egg cases between rocks.",
      diet: "Sea urchins and molluscs",
    },
    // #116 Asterias amurensis
    116: {
      name: "Northern Pacific Seastar",
      habitat: "Port Phillip Bay and Tasmanian estuaries",
      description: "A seastar that arrived from North Asia in ships’ ballast water and became a major invasive species.",
      funFact: "A single female can release up to 20 million eggs a year.",
      diet: "Shellfish",
    },
    // #117 Cereopsis novaehollandiae
    117: {
      name: "Cape Barren Goose",
      habitat: "Coastal islands, grassland and pasture",
      description: "A grey goose whose bill is almost covered by a lime-green cere, often seen in flocks on Phillip Island.",
      funFact: "It can drink brackish water, which lets it live on islands without fresh water.",
      diet: "Grasses and succulents",
    },
    // #118 Morus serrator
    118: {
      name: "Australasian Gannet",
      habitat: "Coastal seas; colonies on islands and headlands",
      description: "A large white seabird with a pale-yellow head that plunge-dives to catch fish.",
      funFact: "It dives from tens of metres up and hits the water at close to 100 km/h.",
      diet: "Fish",
    },
    // #119 Zanda funerea
    119: {
      name: "Yellow-tailed Black Cockatoo",
      habitat: "Forests, pine plantations and parks",
      description: "A large black cockatoo with yellow cheek and tail patches and a wailing call.",
      funFact: "It shreds pine cones and bark to get at seeds and grubs.",
      diet: "Seeds and grubs",
    },
    // #120 Hydromys chrysogaster
    120: {
      name: "Rakali",
      habitat: "Rivers, lakes, estuaries and harbours",
      description: "A native water rodent with webbed feet and a white-tipped tail, nicknamed the “Australian otter”.",
      funFact: "It has learned to flip cane toads over and eat only their non-toxic parts.",
      diet: "Fish, crustaceans, frogs",
    },
    // #121 Rusa unicolor
    121: {
      name: "Sambar Deer",
      habitat: "Mountain forests of Victoria and NSW",
      description: "A large Asian deer introduced in the 19th century, now widespread in the Victorian Alps.",
      funFact: "It damages alpine wetlands by trampling them and wallowing in the mud.",
      diet: "Grasses and leaves",
    },
    // #122 Tiliqua nigrolutea
    122: {
      name: "Blotched Blue-tongued Lizard",
      habitat: "Cool forests, heathland and grassland of the south-east",
      description: "A dark blue-tongued lizard blotched with pink, cream or orange, adapted to cool regions.",
      funFact: "Like other blue-tongues, the female gives birth to live young.",
      diet: "Snails, insects, fruit",
    },
    // #123 Notechis scutatus
    123: {
      name: "Tiger Snake",
      habitat: "Wetlands, lake edges and coastal islands",
      description: "A highly venomous snake, often banded light and dark, common around Melbourne’s wetlands.",
      funFact: "On some islands, tiger snakes have grown very large by feeding on seabird chicks.",
    },
    // #124 Austrelaps superbus
    124: {
      name: "Lowland Copperhead",
      habitat: "Swamps and damp grassland of the south-east",
      description: "A venomous copper-brown snake that stays active even in cool weather.",
      funFact: "It copes with cold better than most Australian snakes.",
      diet: "Frogs and lizards",
    },
    // #125 Phyllopteryx taeniolatus
    125: {
      name: "Weedy Seadragon",
      habitat: "Southern seagrass beds and rocky reefs",
      description: "Victoria’s marine emblem, a red-and-yellow cousin of the seahorse decorated with small weed-like appendages.",
      funFact: "As with the leafy seadragon, the male carries the eggs.",
      diet: "Small crustaceans",
    },
    // #126 Maratus volans
    126: {
      name: "Peacock Spider",
      habitat: "Coastal heath and scrub",
      description: "A jumping spider about 5 mm long whose male unfurls a colourful abdomen in a courtship dance.",
      funFact: "If she doesn’t like the dance, the female may eat the male.",
      diet: "Insects",
    },
    // #127 Agrotis infusa
    127: {
      name: "Bogong Moth",
      habitat: "South-eastern plains in winter, alpine caves in summer",
      description: "A brown moth that migrates every spring to caves in the Australian Alps to spend the summer.",
      funFact: "It navigates at night using the stars and the Earth’s magnetic field.",
      diet: "Nectar (caterpillar: plants)",
    },
    // #128 Maccullochella peelii
    128: {
      name: "Murray Cod",
      habitat: "Rivers of the Murray–Darling Basin",
      description: "Australia’s largest freshwater fish and an important figure in Aboriginal stories.",
      funFact: "It can live for more than 50 years and grow longer than a metre.",
      diet: "Fish, crayfish, frogs",
    },
    // #129 Callocephalon fimbriatum
    129: {
      name: "Gang-gang Cockatoo",
      habitat: "Mountain forests; Canberra’s parks in winter",
      description: "A small grey cockatoo whose male has a bright red head; emblem of the Australian Capital Territory.",
      funFact: "Its call sounds like a creaky door opening.",
    },
    // #130 Thinornis cucullatus
    130: {
      name: "Hooded Plover",
      habitat: "Exposed ocean beaches",
      description: "A small beach bird that lays its eggs straight onto the sand in midsummer, right where swimmers and dogs pass.",
      funFact: "Its eggs look so much like sand that people can step on them without noticing.",
      diet: "Small beach invertebrates",
    },
    // #131 Leipoa ocellata
    131: {
      name: "Malleefowl",
      habitat: "Southern mallee and dry woodland",
      description: "A ground bird that builds a huge mound of sand and leaves to incubate its eggs.",
      funFact: "The male spends most of the year keeping the mound at about 33 °C.",
    },
    // #132 Petauroides volans
    132: {
      name: "Greater Glider",
      habitat: "Old eucalypt forests with big hollow trees",
      description: "The largest gliding marsupial: nocturnal, with big fluffy ears, and it eats only eucalyptus leaves.",
      funFact: "It can glide around 100 metres, steering with its limbs.",
    },
    // #133 Potorous tridactylus
    133: {
      name: "Long-nosed Potoroo",
      habitat: "Dense, damp undergrowth",
      description: "A small hopping marsupial with a long snout that digs up underground fungi.",
      funFact: "By eating truffles, it spreads their spores, which forests need to stay healthy.",
      diet: "Underground fungi and insects",
    },
    // #134 Perameles gunnii
    134: {
      name: "Eastern Barred Bandicoot",
      habitat: "Grassland and farmland; fox-free islands",
      description: "A small bandicoot with pale stripes on its rump that vanished from the wild on the mainland and was reintroduced to Victorian islands such as Phillip Island.",
      funFact: "In 2021 it became the first Australian mammal to be moved from “extinct in the wild” to “endangered”.",
      diet: "Invertebrates",
    },
    // #135 Miniopterus orianae bassanii
    135: {
      name: "Southern Bent-wing Bat",
      habitat: "Caves and forests of south-west Victoria and south-east South Australia",
      description: "A small insect-eating bat that relies on just a few maternity caves.",
      funFact: "Females gather to give birth mainly in two caves, at Naracoorte and near Warrnambool.",
    },
    // #136 Litoria raniformis
    136: {
      name: "Growling Grass Frog",
      habitat: "Ponds and grassy wetlands",
      description: "A large green-and-gold frog with a deep growling call, once common around Melbourne.",
      funFact: "It also eats other frogs, sometimes even its own kind.",
      diet: "Frogs",
    },
    // #137 Eubalaena australis
    137: {
      name: "Southern Right Whale",
      habitat: "Sheltered southern bays (June to October)",
      description: "A large black whale with no dorsal fin and white callosities on its head that comes close to shore to calve.",
      funFact: "You can watch it from the beach at Warrnambool (Logans Beach).",
      diet: "Krill",
    },
    // #138 Tursiops australis
    138: {
      name: "Burrunan Dolphin",
      habitat: "Port Phillip Bay and the Gippsland Lakes",
      description: "A dolphin described in 2011, with perhaps only a few hundred left. Whether it is a separate species is still debated.",
      funFact: "Its name comes from an Aboriginal word said to mean “large sea fish of the porpoise kind”.",
      diet: "Fish",
    },
    // #139 Dermochelys coriacea
    139: {
      name: "Leatherback Turtle",
      habitat: "Open ocean; visits Australian coasts",
      description: "The world’s largest turtle, with a soft, scaleless shell.",
      funFact: "It can dive deeper than 1,000 m to hunt jellyfish.",
      diet: "Jellyfish",
    },
    // #140 Synemon plana
    140: {
      name: "Golden Sun Moth",
      habitat: "Native grasslands",
      description: "A day-flying moth whose adults have no working mouth: they live only a few days, just to breed.",
      funFact: "Females barely fly; they attract males by flashing their golden hindwings.",
      diet: "None (adult); caterpillar: grass roots",
    },
    // #141 Paralucia pyrodiscus lucida
    141: {
      name: "Eltham Copper Butterfly",
      habitat: "A few dry woodlands in Victoria (Eltham, Castlemaine…)",
      description: "A small copper-sheened butterfly found only in a few Victorian woodlands.",
      funFact: "Its caterpillars are guarded by ants, which protect them in exchange for a sugary liquid.",
    },
    // #142 Burramys parvus
    142: {
      name: "Mountain Pygmy-possum",
      habitat: "Boulder fields of the Australian Alps",
      description: "The only Australian marsupial that lives only in the high mountains, under the snow in winter.",
      funFact: "It hibernates for up to 7 months and relies on Bogong moths to refuel in spring.",
      diet: "Bogong moths, seeds and fruit",
    },
    // #143 Gymnobelideus leadbeateri
    143: {
      name: "Leadbeater’s Possum",
      habitat: "Old mountain ash forests of the Central Highlands",
      description: "Victoria’s faunal emblem, this small possum was thought extinct until it was rediscovered in 1961.",
      funFact: "It lives in small colonies in the hollows of very old trees, often more than 150 years old.",
      diet: "Sap, gum and insects",
    },
    // #144 Lichenostomus melanops cassidix
    144: {
      name: "Helmeted Honeyeater",
      habitat: "Swamp forests of Yellingbo",
      description: "Victoria’s bird emblem, with a golden crest on its forehead; only one wild population remains.",
      funFact: "The wild population depends on a breeding and release programme started in the late 1980s.",
      diet: "Insects, sap and nectar",
    },
    // #145 Neophema chrysogaster
    145: {
      name: "Orange-bellied Parrot",
      habitat: "Tasmanian heathland (summer), southern coastal saltmarsh (winter)",
      description: "A small green parrot with an orange belly that migrates across Bass Strait every year.",
      funFact: "In 2017, only 17 adults returned to breed in the wild.",
      diet: "Saltmarsh plant seeds",
    },
    // #146 Anthochaera phrygia
    146: {
      name: "Regent Honeyeater",
      habitat: "Box–ironbark woodland of the south-east",
      description: "A black-and-bright-yellow honeyeater, once common and now one of Australia’s most threatened birds.",
      funFact: "They have become so rare that some males sing the “wrong” song: there are no adults of their own kind left to learn from.",
      diet: "Nectar and insects",
    },
    // #147 Philoria frosti
    147: {
      name: "Baw Baw Frog",
      habitat: "Bogs of the Baw Baw Plateau",
      description: "A brown frog that lives on a single plateau in the Victorian Alps.",
      funFact: "Its tadpoles grow without feeding, living off the egg’s reserves.",
    },
    // #148 Tympanocryptis pinguicolla
    148: {
      name: "Victorian Grassland Earless Dragon",
      habitat: "Native basalt grasslands west of Melbourne",
      description: "A small dragon about 15 cm long, thought lost for more than 50 years and rediscovered in 2023.",
      funFact: "It hides in spider burrows and cracks in the soil.",
    },
    // #149 Pedionomus torquatus
    149: {
      name: "Plains-wanderer",
      habitat: "Flat, sparse inland grassland",
      description: "A one-of-a-kind bird, the only member of its family, that runs rather than flies.",
      funFact: "In this species the female is the more colourful one, and the male incubates the eggs.",
      diet: "Seeds",
    },
    // #150 Megascolides australis
    150: {
      name: "Giant Gippsland Earthworm",
      habitat: "Damp clay soils of South Gippsland",
      description: "A giant earthworm often a metre long, found only in a small part of Victoria.",
      funFact: "You can sometimes hear it gurgling underground as it moves through its burrows.",
      diet: "Organic matter in soil",
    },
    // #151 Pezoporus occidentalis
    151: {
      name: "Night Parrot",
      habitat: "Spinifex clumps in the deserts",
      description: "A nocturnal parrot so secretive that no photo of a living bird existed before 2013.",
      funFact: "It spends the day hidden inside clumps of spinifex.",
      diet: "Spinifex seeds",
    },
  },

  conservation: {
    4: {
      epbcScope: "Barrow Island subspecies (WA) only",
      vicScope: "Eastern subspecies, the one found in Victoria",
    },
    6: {
      epbcScope: "Queensland, NSW and ACT populations; not listed in Victoria or South Australia",
      programs: "National Recovery Plan for the Koala (Australian Government)",
    },
    9: {
      epbcScope: "Kangaroo Island subspecies only",
    },
    10: {
      programs: "Save the Tasmanian Devil Program (Tasmanian Government)",
    },
    11: {
      iucnNote: "The IUCN does not assess the dingo separately from the domestic dog.",
    },
    12: {
      epbcScope: "Northern subspecies (Northern Territory) only",
    },
    15: {
      iucnNote: "Downlisted from Endangered to Near Threatened in July 2026 thanks to reintroductions.",
      programs: "National Numbat Recovery Plan; populations reintroduced into predator-free sanctuaries",
    },
    16: {
      programs: "National Recovery Plan for the Greater Bilby; predator-free sanctuaries",
    },
    17: {
      epbcScope: "South-eastern mainland and north Queensland: Endangered; Tasmania: Vulnerable",
      programs: "National Recovery Plan for the Spotted-tailed Quoll",
    },
    20: {
      epbcScope: "Both subspecies",
    },
    21: {
      vicScope: "Listed in Victoria, where the species no longer occurs",
    },
    23: {
      iucnNote: "Global status reflects declines in its native range (Iberian Peninsula). In Australia it is an invasive pest.",
      impact: "Rabbits strip native vegetation, stop trees from regenerating, worsen erosion and help sustain populations of foxes and cats.",
    },
    24: {
      impact: "Foxes have helped drive several small mammals to extinction and threaten ground-nesting birds, turtles and penguins.",
    },
    25: {
      iucnNote: "A domesticated species: the IUCN does not assess the dromedary.",
      impact: "Camels trample desert waterholes, destroy vegetation and damage Aboriginal cultural sites.",
    },
    26: {
      epbcScope: "Only the Tasmanian subspecies is listed, as extinct",
    },
    27: {
      epbcScope: "Australian population",
      programs: "National Recovery Plan for the Southern Cassowary",
    },
    34: {
      epbcScope: "South-eastern (Endangered) and south-western forest (Vulnerable) subspecies only",
      vicScope: "South-eastern subspecies, the one found in Victoria",
    },
    35: {
      iucnNote: "Uncertain: depending on the taxonomy used, the IUCN lists it as Least Concern or does not assess it separately.",
      epbcScope: "Eastern subspecies only",
    },
    41: {
      programs: "Phillip Island Nature Parks: colony monitoring, protected crossings and fox eradication on the island",
    },
    43: {
      epbcScope: "Tasmanian subspecies only",
    },
    49: {
      iucnNote: "Uncertain: BirdLife (which assesses birds for the IUCN) gives Near Threatened, GBIF gives Least Concern.",
    },
    53: {
      iucnNote: "Least Concern globally since 2022, but Endangered under Australian law.",
      programs: "National Recovery Plan for the Gouldian Finch",
    },
    57: {
      epbcScope: "Kangaroo Island subspecies only",
    },
    62: {
      epbcScope: "Northern subspecies only",
    },
    69: {
      vicScope: "Extinct in Victoria",
    },
    72: {
      vicScope: "Carpet python: Endangered; diamond python (East Gippsland): Critically Endangered",
    },
    77: {
      programs: "Captive breeding and reintroductions (Taronga Zoo, Zoos Victoria, NSW National Parks)",
    },
    78: {
      impact: "Toxic at every life stage, it poisons quolls, goannas, snakes and freshwater crocodiles that eat it, causing steep declines in the north.",
    },
    79: {
      programs: "National Recovery Plan for the White Shark",
    },
    84: {
      iucnNote: "Global status improved in 2025; some subpopulations remain threatened.",
      programs: "Raine Island Recovery Project (Great Barrier Reef)",
    },
    85: {
      iucnNote: "Assessed at species level (Arctocephalus pusillus).",
    },
    86: {
      vicScope: "Occasional visitor to Victorian coasts",
      programs: "National Recovery Plan for the Australian Sea Lion",
    },
    100: {
      programs: "Bred at Melbourne Zoo since 2003; rat eradication on Lord Howe Island (2019)",
    },
    105: {
      iucnNote: "Status as given by the Red List (via GBIF). The species is still common across much of its range, so this is worth double-checking.",
    },
    107: {
      iucnNote: "A domesticated species: the IUCN does not assess the cat.",
      impact: "Feral cats kill more than a billion native animals each year and have helped drive several mammals extinct. They are considered the biggest threat to Australia’s small mammals.",
    },
    108: {
      impact: "It hunts native insects, competes with bees and disrupts picnics and orchards.",
    },
    114: {
      iucnNote: "Genus-level entry (several species): no single IUCN status.",
    },
    116: {
      impact: "It devours shellfish and other seabed invertebrates, threatens shellfish farming and native species such as Tasmania’s spotted handfish.",
    },
    117: {
      epbcScope: "Recherche Archipelago subspecies (WA) only",
    },
    121: {
      iucnNote: "Threatened in its native range in Asia; invasive in Australia.",
      impact: "Sambar trample and graze alpine wetlands and rainforest, damage riverbanks and cause road collisions.",
    },
    123: {
      epbcScope: "Isolated Flinders Ranges population (SA) only",
    },
    125: {
      iucnNote: "2025 assessment whose data are disputed by some researchers.",
    },
    128: {
      programs: "National Recovery Plan for the Murray Cod; fingerling restocking",
    },
    130: {
      epbcScope: "Eastern subspecies, the one found in Victoria",
      programs: "BirdLife Australia’s Beach-nesting Birds program",
    },
    131: {
      programs: "National Malleefowl Recovery Team",
    },
    133: {
      epbcScope: "Northern and southern mainland subspecies",
      vicScope: "Southern mainland subspecies",
    },
    134: {
      epbcScope: "Mainland population: Endangered; Tasmania: Vulnerable",
      programs: "Reintroductions to Phillip Island, French Island and Churchill Island (Zoos Victoria, Phillip Island Nature Parks and partners)",
    },
    135: {
      iucnNote: "Subspecies not assessed separately by the IUCN.",
      programs: "National Recovery Plan; protection of maternity caves",
    },
    138: {
      iucnNote: "Not assessed by the IUCN; its status as a distinct species is still debated.",
    },
    141: {
      iucnNote: "Subspecies not assessed separately by the IUCN.",
    },
    142: {
      programs: "Recovery programmes in Victoria and NSW (including Zoos Victoria); boulder-field corridors under ski runs",
    },
    143: {
      programs: "Victorian Government and Zoos Victoria recovery programme; artificial nest boxes",
    },
    144: {
      iucnNote: "The IUCN assesses the whole species (Yellow-tufted Honeyeater, Least Concern); the helmeted subspecies is not assessed separately.",
      programs: "Breeding and releases at Healesville Sanctuary (Zoos Victoria); restoration of the Yellingbo reserve",
    },
    145: {
      programs: "National Recovery Team; captive breeding (Zoos Victoria, Moonlit Sanctuary, Tasmania) and releases",
    },
    146: {
      programs: "Breeding at Taronga Zoo and releases; National Recovery Plan",
    },
    147: {
      programs: "Zoos Victoria breeding programme",
    },
    148: {
      programs: "Zoos Victoria breeding programme launched after the rediscovery",
    },
    149: {
      programs: "Captive breeding (Zoos Victoria, Taronga Western Plains); National Recovery Plan",
    },
    150: {
      programs: "National Recovery Plan for the Giant Gippsland Earthworm",
    },
    151: {
      programs: "Pullen Pullen Reserve (Bush Heritage Australia); National Recovery Team",
    },
  },

  rescue: {
    "wildlife-victoria": "24/7 emergency response service for all of Victoria.",
    "deeca": "Victorian Government: wildlife injured in fires, floods or heatwaves.",
    "wires": "Rescue line open 24/7, 365 days a year.",
    "rspca-qld-1300-animal": "Injured or orphaned wildlife (except crocodiles, cassowaries and marine animals).",
    "queensland-wildlife-hotline": "Stranded turtles, dolphins, dugongs and whales (option 1), crocodiles and cassowaries.",
    "wildcare-helpline": "Puts you in touch with the nearest registered carer anywhere in Western Australia.",
    "fauna-rescue-of-south-australia": "24-hour hotline for all wildlife.",
    "bonorong-wildlife-rescue": "24-hour rescue service for all of Tasmania.",
    "nre-tas-wildlife-services": "Tasmanian Government service (business hours).",
    "wildcare-nt": "Darwin-area volunteers; they may not answer straight away.",
    "act-wildlife": "24-hour line for injured, sick or orphaned native animals.",
    "access-canberra": "Injured kangaroos, kangaroo collisions and after-hours emergencies.",
    "emergency-animal-disease-hotline": "Sick or dead birds or animals (suspected H5 bird flu).",
  },
};
