/* GS TOP DRINKS — Pacotes & Preços (Bronze • Prata • Ouro) */
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
  bronze: {
    id: "bronze",
    name: "Bronze",
    tagline: "Entry level — Caipirinhas clássicas e refrescos",
    base: 45,
    ceiling: 60,
    image: "/gs/images/segments/hero-main.jpg",
    features: [
      "Bar montado + 1 bartender GS",
      "Insumos, frutas frescas, gelo e copos",
      "Caipirinhas de frutas da estação",
      "Refrescos e sodas variadas",
      "Clássicos: Mojito, Cuba Libre, Gin Tônica, Moscow Mule",
    ],
    drinks: [
      d("c-limao", "Caipirinha de Limão", "Cachaça, limão taiti e açúcar — a clássica brasileira", 4.0, ["cítrico", "refrescante"], "rocks", "#dcef9a", { image: "/gs/images/drinks/caipirinha-limao.webp" }),
      d("c-abacaxi", "Caipirinha de Abacaxi", "Abacaxi pérola e hortelã fresca", 5.0, ["frutado", "herbal"], "rocks", "#f4d35e", { image: "/gs/images/drinks/caipirinha-abacaxi.webp" }),
      d("sensacao", "Batida Sensação", "Frutas vermelhas, limão e espuma leve", 5.5, ["frutado", "cítrico"], "rocks", "#f0a43a", { image: "/gs/images/drinks/batida-sensacao.webp" }),
      d("deuses", "Batida dos Deuses", "Néctar de abacaxi, laranja e creme", 6.0, ["frutado", "cremoso"], "rocks", "#e8453f", { image: "/gs/images/drinks/batida-deuses.webp" }),
      d("paradise", "Paradise", "Camadas tropicais em degradê — queridinho das fotos", 6.5, ["frutado", "doce"], "hurricane", ["#2aa7ff", "#ffc21a", "#ff7a1f", "#d91e2a"], { signature: true, image: "/gs/images/drinks/paradise.webp" }),
      d("azul", "Lagoa Azul", "Blue Curaçau, limão e soda — visual impact", 5.0, ["cítrico", "visual"], "highball", "#7fb3d5", { image: "/gs/images/drinks/lagoa-azul.webp" }),
      d("italiana", "Soda Italiana", "Água com gás e xarope de maçã verde", 3.5, ["refrescante"], "highball", "#a8e6cf", { zero: true, image: "/gs/images/drinks/soda-italiana.webp" }),
      d("morango", "Batida de Morango", "Morangos frescos macerados com limão e cachaça", 5.0, ["frutado", "doce"], "rocks", "#e8484f", { image: "/gs/images/drinks/batida-morango.webp" }),
      d("sex-beach", "Sex on the Beach", "Vodka, xarope de granadine, néctar de laranja e pêssego", 6.0, ["frutado", "álcool"], "highball", "#f5a9b8", { image: "/gs/images/drinks/sex-on-the-beach.webp" }),
      d("nectar-abacaxi", "Néctar de Abacaxi", "Abacaxi com côco e leite condensado (sem álcool)", 4.5, ["frutado", "cremoso"], "highball", "#f5c679", { zero: true, image: "/gs/images/drinks/nectar-abacaxi.webp" }),
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
    ],
    drinks: [
      d("mosc-mule", "Moscow Mule", "Vodka, limão e espuma de gengibre na caneca de cobre", 6.0, ["picante", "cítrico"], "mug", "copper", { image: "/gs/images/drinks/moscow-mule.webp" }),
      d("cosmopolitan", "Cosmopolitan", "Vodka, cranberry, licor de laranja e limão", 7.0, ["frutado", "seco"], "martini", "#e5486c", { image: "/gs/images/drinks/cosmopolitan.webp" }),
      d("mojito", "Mojito", "Rum, hortelã, limão e água com gás", 5.5, ["refrescante", "herbal"], "highball", "#d3ecb4", { image: "/gs/images/drinks/mojito.webp" }),
      d("gin-tropical", "Gin Tropical", "Gin, fruta da época e energético tropical", 7.0, ["herbal", "cítrico"], "coupe", "#ffe066", { image: "/gs/images/drinks/gin-tropical.webp" }),
      d("margarita", "Margarita", "Tequila, licor de laranja, limão e borda de sal", 7.0, ["cítrico", "salino"], "coupe", "#e6efa6", { image: "/gs/images/drinks/margarita.webp" }),
      d("apero-spritz", "Aperol Spritz", "Aperol, espumante e laranja — o amargosto elegante", 7.5, ["espumante", "amargo"], "wine", "#f26b1d", { image: "/gs/images/drinks/aperol-spritz.webp" }),
      d("whisky-sour", "Whisky Sour", "Bourbon, limão, açúcar e espuma aveludada", 8.0, ["encorpado", "cítrico"], "rocks", "#e3ad55", { image: "/gs/images/drinks/whisky-sour.webp" }),
      d("negroni", "Negroni", "Gin, Campari e vermute rosso — o amargo clássico", 8.5, ["amargo", "encorpado"], "rocks", "#b3231c", { image: "/gs/images/drinks/negroni.webp" }),
      d("caipi-maracutai", "Caipirinha de Maracujá", "Maracujá fresco, cachaça e toque de hortelã", 5.0, ["frutado", "cítrico"], "rocks", "#f2b134", { image: "/gs/images/drinks/caipirinha-maracuja-limao.webp" }),
      d("caipi-morango", "Caipirinha de Morango", "Morangos frescos macerados com limão e cachaça", 5.0, ["frutado", "doce"], "rocks", "#e8484f", { image: "/gs/images/drinks/caipirinha-morango.webp" }),
    ],
  },
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
    ],
    drinks: [
      d("negroni", "Negroni Premium", "Gin, Campari e vermute rosso — seleção especial", 9.0, ["amargo", "encorpado"], "rocks", "#b3231c", { image: "/gs/images/drinks/negroni-premium.webp" }),
      d("whisky-sour", "Whisky Sour Premium", "Whisky bourbon, limão, açúcar e espuma diferenciada", 10.0, ["encorpado", "cítrico"], "rocks", "#e3ad55", { image: "/gs/images/drinks/whisky-sour-premium.webp" }),
      d("aperol-spritz", "Aperol Spritz Premium", "Aperol, espumante selecionado e laranja sanguínea", 9.5, ["espumante", "amargo"], "wine", "#f26b1d", { image: "/gs/images/drinks/aperol-spritz-premium.webp" }),
      d("caipi-maracutai-ouro", "Caipirinha de Maracujá Premium", "Maracujá selecionado, cachaça envelhecida e hortelã", 7.5, ["frutado", "cítrico"], "rocks", "#f2b134", { image: "/gs/images/drinks/caipirinha-maracuja-limao.webp" }),
      d("sex-beach-ouro", "Sex on the Beach Premium", "Vodka top-shelf, granadine artesanal e frutas frescas", 7.0, ["frutado", "álcool"], "highball", "#f5a9b8", { image: "/gs/images/drinks/sex-on-the-beach-premium.webp" }),
      d("mosc-mule-ouro", "Moscow Mule Premium", "Vodka premium com espuma de gengibre caseira", 7.5, ["picante", "cítrico"], "mug", "copper", { image: "/gs/images/drinks/moscow-mule-premium.webp" }),
      d("caipi-morango-ouro", "Caipirinha de Morango Premium", "Morangos da fazenda, cachaça artesanal e limão siciliano", 6.5, ["frutado", "doce"], "rocks", "#e8484f", { image: "/gs/images/drinks/caipirinha-morango.webp" }),
    ],
  },
};

export const PACKAGE_ORDER: PackageId[] = ["bronze", "prata", "ouro"];

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
  { id: "bronze", label: "Os clássicos que todo mundo ama", sub: "Caipirinhas, mojito, gin tônica", meta: "Pacote Bronze" },
  { id: "prata", label: "Clássicos com autorais da casa", sub: "O equilíbrio entre o conhecido e a surpresa", meta: "Pacote Prata" },
  { id: "ouro", label: "Uma experiência de show", sub: "Destilados premium, gelo seco e atrações", meta: "Pacote Ouro" },
];