import type { Item } from "@/types";

export const MOCK_ITEMS: Item[] = [
  { id:1, title:"Fekete kulcscsomó",   description:"3 kulcs, kék kulcstartóval. A tornaterem közelében találták.", status:"talált",    image_url:"" },
  { id:2, title:"Szürke pulóver",      description:"M-es méret, fehér feliratos. Valószínűleg egy osztálykirándulásról maradt.",     status:"talált",    image_url:"" },
  { id:3, title:"Parker toll",         description:"Arany klipszű, fekete töltőtoll. A könyvtárban találták.",                        status:"visszaadva", image_url:"" },
  { id:4, title:"Összecsukható esernyő", description:"Fekete, kis méret. A büfé melletti padon felejtették.",                         status:"talált",    image_url:"" },
  { id:5, title:"Kék diákigazolvány",  description:"Kovács Péter nevére szóló. Az aulában heverészett.",                              status:"talált",    image_url:"" },
  { id:6, title:"Fehér AirPods tok",   description:"Töltőkábel nélkül. A folyosón a 2. emeleten találták.",                           status:"visszaadva", image_url:"" },
];
