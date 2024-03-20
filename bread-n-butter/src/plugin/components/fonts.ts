type Font = {
  id: string;
  family: string;
  subsets: string[];
  weights: number[];
  styles: string[];
  defSubset: string;
  variable: boolean;
  lastModified: string;
  category: string;
  license: string;
  type: string;
};

const request = await fetch(
  "https://api.fontsource.org/v1/fonts?weights=400&subsets=latin&styles=normal"
);
const fonts = ((await request.json()) as Font[]).map((font) => ({
  value: font.id,
  label: font.family,
  ...font,
}));

export { fonts };
