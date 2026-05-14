type Item = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const items: Item[] = [
  { id: 1, title: "Fekete kulcscsomó", description: "3 kulcs, kék kulcstartóval", status: "talált" },
  { id: 2, title: "Szürke pulóver", description: "M-es méret, fehér felirat", status: "talált" },
  { id: 3, title: "Parker toll", description: "Fekete töltőtoll, arany klipsz", status: "visszaadva" },
  { id: 4, title: "Fekete esernyő", description: "Összecsukható, kis méret", status: "talált" },
  { id: 5, title: "Kék diákigazolvány", description: "Kovács Péter nevére szóló", status: "talált" },
];

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-white">Talált tárgyak</h1>
      <p className="text-zinc-400 mb-6 text-sm">Ha felismered valamelyik tárgyat, jelezd a titkárságon.</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-white">{item.title}</h2>
              <span className={item.status === "talált" ? "text-xs bg-green-900 text-green-400 px-2 py-1 rounded-full" : "text-xs bg-zinc-700 text-zinc-400 px-2 py-1 rounded-full"}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{item.description}</p>
            <p className="text-xs text-zinc-600 mt-2">ID: {item.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
