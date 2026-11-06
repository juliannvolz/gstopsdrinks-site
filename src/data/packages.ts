/* GS TOP DRINKS — Pacotes & Preços (Ouro • Prata • Bronze) */
/* Base: 45/65/95  |  Teto: +30%  |  Valores reais a ser ajustados */

export type PackageId = "bronze" | "prata" | "ouro";
export type Tier = "economico" | "assinatura" | "premium";
export type GlassType =
  | "rocks" | "highball" | "martini" | "coupe"
  | "wine" | "flute" | "mug" | "hurricane";

export interface Drink {
  id: string;
  name: string;
  desc: string;
  cost: number;
  tags: string[];
  glass: GlassType;
  color: string | string[];
  zero: boolean;
  signature: boolean;
  image?: string;
  packageId?: PackageId;
}

export interface Package {
  id: PackageId;
  name: string;
  tagline: string;
  base: number;
  ceiling: number;
  bestSeller?: boolean;
  image: string;
  features: string[];
  drinks: Drink[];
}

export type Pkg = Package;

const d = (
  id: string,
  name: string,
  desc: string,
  cost: number,
  tags: string[],
  glass: GlassType,
  color: string | string[],
  opts: { zero?: boolean; signature?: boolean; image?: string } = {}
): Drink => {
  return {
    id,
    name,
    desc,
    cost,
    tags,
    glass,
    color,
    zero: !!opts.zero,
    signature: !!opts.signature,
    image: opts.image
  };
};

export const PACKAGES: Record<PackageId, Package> = {
  ouro: {
    id: "ouro",
    name: "Ouro",
    tagline: "Experiência premium — destilados finos e assinaturas exclusivas",
    base: 95,
    ceiling: 120,
    bestSeller: true,
    image: "/gs/images/gallery/wedding.jpg",
    features: [
      "Equipe completa: bartenders + barback",
      "Destilados premium e carta autoral do Gilmar",
      "Drinks com gelo seco e finalizações de show",
      "Show dos Tequileiros incluso",
      "Welcome drink premium + brinde especial",
      "Carta 100% personalizada com a identidade do evento",
      "6 drinks exclusivos: Caipirinha Morango, Caipirinha Maracujá, Aperol Spritz, Whisky Sour, Negroni, Moscow Mule",
    ],
    drinks: [
      d("caipi-morango", "Caipirinha de Morango", "Vodka, Cachaça, Água com gás, Açúcar opcional", 6.5, ["frutado", "doce"], "rocks", "#e8484f", { image: "/gs/images/drinks/caipirinha-morango.webp" }),
      d("caipi-maracuja", "Caipirinha de Maracujá", "Cachaça, Vodka, Água com gás, Açúcar", 7.5, ["frutado", "cítrico"], "rocks", "#f2b134", { image: "/gs/images/drinks/caipirinha-maracuja-limao.webp" }),
      d("aperol-spritz", "Aperol Spritz", "Aperol, Água com gás, Espumante Pro seco, meia fatia de laranja", 9.5, ["espumante", "amargo"], "wine", "#f26b1d", { image: "/gs/images/drinks/APEROLSPRITZ.jpg" }),
      d("whisky-sour", "Whisky Sour", "Suco de limão, Xarope de Açúcar, espuma", 10.0, ["encorpado", "cítrico"], "rocks", "#e3ad55", { image: "/gs/images/drinks/WHISKYSOUR.jpg" }),
      d("negroni", "Negroni", "Gin, Campari, Wermouth", 9.0, ["amargo", "encorpado"], "rocks", "#b3231c", { image: "/gs/images/drinks/NEGRONI.jpg" }),
      d("moscow-mule", "Moscow Mule", "Xarope de Gengibre, Água com gás, Suco de limão, Vodka opcional, Espuma chantilly, Raspa de limão", 7.5, ["picante", "cítrico"], "mug", "copper", { image: "/gs/images/drinks/moscow-mule.webp" }),
    ],
  },
  prata: {
    id: "prata",
    name: "Prata",
    tagline: "Coquetéis autorais + clássicos refinados",
    base: 65,
    ceiling: 85,
    image: "/gs/images/segments/lineup.jpg",
    features: [
      "Tudo do Bronze + 2º bartender",
      "2 coquetéis autorais da casa",
      "Welcome drink na recepção",
      "Bar com identidade visual do evento",
      "Caipirinha da estação (fruta surpresa)",
      "7 drinks: Sex on the Beach, Cosmopolitan, Mojito, Piña Colada, Caipirinha Morango, Caipirinha Maracujá, Moscow Mule",
    ],
    drinks: [
      d("sex-beach", "Sex on the Beach", "Xarope de Grenadine, Néctar de Laranja, Xarope de Pêssego, Vodka opcional", 6.0, ["frutado", "álcool"], "highball", "#f5a9b8", { image: "/gs/images/drinks/SEXONTHEBEACH.jpg" }),
      d("cosmopolitan", "Cosmopolitan", "Xarope de Cranberry, Néctar de Cranberry, Licor de laranja, Vodka opcional", 7.0, ["frutado", "seco"], "martini", "#e5486c", { image: "/gs/images/drinks/COSMOPOLITAN.jpg" }),
      d("mojito", "Mojito", "Bacardi carta Blanca opcional, Água com gás, Suco de limão, Açúcar opcional, Folhas de Hortelã", 5.5, ["refrescante", "herbal"], "highball", "#d3ecb4", { image: "/gs/images/drinks/MOJITO.jpg" }),
      d("pina-colada", "Piña Colada", "Néctar de Abacaxi, Leite condensado, Leite de côco, Vodka opcional", 7.0, ["frutado", "cremoso"], "hurricane", "#f5c679", { image: "/gs/images/drinks/PINACOLADA.jpg" }),
      d("caipi-morango-prata", "Caipirinha de Morango", "Vodka, Cachaça, Água com gás, Açúcar opcional", 5.0, ["frutado", "doce"], "rocks", "#e8484f", { image: "/gs/images/drinks/caipirinha-morango.webp" }),
      d("caipi-maracuja-prata", "Caipirinha de Maracujá", "Cachaça, Vodka, Água com gás, Açúcar", 5.0, ["frutado", "cítrico"], "rocks", "#f2b134", { image: "/gs/images/drinks/caipirinha-maracuja-limao.webp" }),
      d("moscow-mule-prata", "Moscow Mule", "Xarope de Gengibre, Água com gás, Suco de limão, Vodka opcional, Espuma chantilly, Raspa de limão", 6.0, ["picante", "cítrico"], "mug", "copper", { image: "/gs/images/drinks/moscow-mule.webp" }),
    ],
  },
  bronze: {
    id: "bronze",
    name: "Bronze",
    tagline: "Os clássicos que todo mundo ama",
    base: 45,
    ceiling: 60,
    image: "/gs/images/segments/hero-main.jpg",
    features: [
      "Bar montado + 1 bartender GS",
      "Insumos, frutas frescas, gelo e copos",
      "Drinks refrescantes e coloridos",
      "Opções sem álcool incluídas",
      "5 drinks: Lagoa Azul, Soda Italiana, Batida Sensação, Batida dos Deuses, Paradise",
    ],
    drinks: [
      d("lagoa-azul", "Lagoa Azul", "Soda, Suco de Limão, Xarope de Curaçau Blue, Vodka opcional", 5.0, ["cítrico", "visual"], "highball", "#7fb3d5", { image: "/gs/images/drinks/LAGOAZUL.jpg" }),
      d("soda-italiana", "Soda Italiana", "Água com gás, Xarope de Maçã Verde, Vodka opcional", 3.5, ["refrescante"], "highball", "#a8e6cf", { zero: true, image: "/gs/images/drinks/SODAITALIANA.jpg" }),
      d("batida-sensacao", "Batida Sensação", "Néctar de Morango, Leite condensado, Xarope de Morango, Vodka opcional", 5.5, ["frutado", "cremoso"], "rocks", "#f0a43a", { image: "/gs/images/drinks/BATIDASENSACAO.jpg" }),
      d("batida-deuses", "Batida dos Deuses", "Néctar de Abacaxi, Néctar de Laranja, Leite condensado, Vodka opcional", 6.0, ["frutado", "cremoso"], "rocks", "#e8453f", { image: "/gs/images/drinks/BATIDADEUSES.jpg" }),
      d("paradise", "Paradise", "Néctar de Laranja, Xarope de Grenadine, Xarope de Curaçau Blue, Vodka", 6.5, ["frutado", "visual"], "hurricane", ["#2aa7ff", "#ffc21a", "#ff7a1f", "#d91e2a"], { signature: true, image: "/gs/images/drinks/PARADISE.jpg" }),
    ],
  },
};

export const PACKAGE_ORDER: PackageId[] = ["ouro", "prata", "bronze"];

export const MIN_DRINKS = 4;
export const MAX_DRINKS = 8;

/* ---------------------------- Quiz Options -------------------------- */

export interface GuestsOption {
  id: string;
  label: string;
  short: string;
  sub: string;
  estimate: number;
  staff: string;
}

export const GUEST_OPTIONS: GuestsOption[] = [
  { id: "g1", label: "Até 50 convidados", short: "Até 50", sub: "Recepção intimista", estimate: 40, staff: "1 bartender" },
  { id: "g2", label: "50 a 120 convidados", short: "50 a 120", sub: "Festa em ritmo pleno", estimate: 85, staff: "2 bartenders" },
  { id: "g3", label: "120 a 250 convidados", short: "120 a 250", sub: "Grande celebração", estimate: 180, staff: "3 bartenders + barback" },
  { id: "g4", label: "Mais de 250", short: "250+", sub: "Produção sob medida", estimate: 300, staff: "Operação completa" },
];

export interface VibeOption {
  id: PackageId;
  label: string;
  sub: string;
  meta: string;
}

export const VIBE_OPTIONS: VibeOption[] = [
  { id: "ouro", label: "Uma experiência de show", sub: "Destilados premium, gelo seco e atrações", meta: "Pacote Ouro" },
  { id: "prata", label: "Clássicos com autorais da casa", sub: "O equilíbrio entre o conhecido e a surpresa", meta: "Pacote Prata" },
  { id: "bronze", label: "Os clássicos que todo mundo ama", sub: "Caipirinhas, mojito, gin tônica", meta: "Pacote Bronze" },
];