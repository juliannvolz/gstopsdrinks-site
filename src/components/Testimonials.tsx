import { motion } from "framer-motion";
import { Star, MapPin, MessageCircle } from "lucide-react";
import { EASE, Label, Reveal } from "./ui";

const REVIEWS = [
  {
    id: 1,
    name: "Amanda Silva",
    event: "Casamento · Out 2024",
    rating: 5,
    text: "O Gilmar e a equipe foram impecáveis! O bar virou atração da festa, drinks deliciosos e serviço de primeira. Todos os convidados elogiaram muito. Recomendo de olhos fechados!",
    avatar: "AS",
  },
  {
    id: 2,
    name: "Roberto Carlos",
    event: "Formatura · Dez 2024",
    rating: 5,
    text: "Contratei para minha formatura e foi a melhor decisão. O bar premium fez toda a diferença, equipe super profissional e os drinks autorais são sensacionais. Vale cada centavo!",
    avatar: "RC",
  },
  {
    id: 3,
    name: "Mariana Costa",
    event: "15 Anos · Jan 2025",
    rating: 5,
    text: "Minha filha amou a festa de 15 anos! O bar colorido, os drinks fotogênicos e o show de fumaça fizeram o maior sucesso. A equipe é muito atenciosa e organizada. Parabéns GS!",
    avatar: "MC",
  },
  {
    id: 4,
    name: "Empresa TechCorp",
    event: "Corporativo · Fev 2025",
    rating: 5,
    text: "Fizemos nosso happy hour de fim de ano com a GS Top Drinks. Setup impecável, drinks com a marca da empresa e zero dor de cabeça. Já fechamos para o próximo evento!",
    avatar: "TC",
  },
  {
    id: 5,
    name: "Juliana & Pedro",
    event: "Aniversário · Mar 2025",
    rating: 5,
    text: "O bar foi o ponto alto da festa! Drinks deliciosos, reposição rápida e a pistola de fumaça deu um show à parte. Gilmar super atencioso no planejamento. Indico demais!",
    avatar: "JP",
  },
  {
    id: 6,
    name: "Carla Mendes",
    event: "Casamento · Abr 2025",
    rating: 5,
    text: "Desde o primeiro contato até o último brinde, tudo perfeito. O drink personalizado dos noivos foi um sucesso! Equipe educada, uniforme impecável e drinks de alta qualidade.",
    avatar: "CM",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 bg-bg2">
      <div className="grid gap-6 border-b border-fg/15 pb-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Reveal>
            <Label index="★">O que dizem nossos clientes</Label>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.9rem)] font-medium leading-[0.95] tracking-[-0.02em]">
              Avaliações reais <span className="font-normal italic">de quem brindou conosco.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 text-[15px] leading-relaxed text-fg/60 max-w-md">
            Mais de 500 eventos realizados com excelência. Veja o que nossos clientes falam sobre a experiência GS Top Drinks.
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-4">
          <div className="flex items-center gap-3 text-fg/60">
            <MapPin className="h-5 w-5" />
            <span>Blumenau e região — SC</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-fg/60">
            <MessageCircle className="h-5 w-5" />
            <span>Google Reviews · 4.9★</span>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <motion.article
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: EASE }}
            className="group relative bg-bg p-6 rounded-xl border border-fg/10 hover:border-acc/30 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-acc2 text-acc2" />
              ))}
            </div>
            <blockquote className="text-[15px] leading-relaxed text-fg/80 mb-6">
              "{review.text}"
            </blockquote>
            <div className="flex items-center gap-4 pt-4 border-t border-fg/10">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-acc/10 text-acc font-sans font-bold text-[14px]">
                {review.avatar}
              </div>
              <div>
                <p className="font-display text-[1.1rem] leading-tight">{review.name}</p>
                <p className="text-[12px] uppercase tracking-[0.12em] text-fg/50">{review.event}</p>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageCircle className="h-6 w-6 text-acc/50" />
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="https://www.google.com/search?q=GS+Top+Drinks+avaliações"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] border border-fg/20 hover:border-acc hover:text-acc transition-colors"
        >
          Ver todas no Google Maps
          <span className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}