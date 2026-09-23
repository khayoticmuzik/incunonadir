export type FeaturedBook = {
  id: string;
  title: string;
  tagline: string;
  author: string;
  backdropUrl: string;
  accentHint?: "ember" | "mist";
};

export const featuredBooks: FeaturedBook[] = [
  {
    id: "the-lamplighter",
    title: "The Lamplighter's Confession",
    tagline:
      "Every night he lights the same seventeen lamps. Tonight, one is already burning.",
    author: "M. R. Halloway",
    backdropUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=2400&q=80",
    accentHint: "ember",
  },
  {
    id: "coldwater-asylum",
    title: "Coldwater Asylum",
    tagline:
      "The patients keep writing letters. The doctors stopped reading them in 1961.",
    author: "Ines Varga",
    backdropUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=80",
    accentHint: "mist",
  },
  {
    id: "the-quiet-inheritance",
    title: "The Quiet Inheritance",
    tagline:
      "She inherited her grandmother's house. And her grandmother's alibi.",
    author: "D. K. Sorensen",
    backdropUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80",
    accentHint: "ember",
  },
  {
    id: "signal-static",
    title: "Signal Static",
    tagline:
      "The numbers station has been broadcasting since before she was born. Last week, it said her name.",
    author: "T. Okafor",
    backdropUrl:
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=2400&q=80",
    accentHint: "mist",
  },
];