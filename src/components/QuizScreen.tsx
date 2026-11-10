import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Check, MoveRight } from "lucide-react";
import { EASE, Label, Reveal, TextLink } from "./ui";
import { GUEST_OPTIONS } from "../data/catalog";

interface Props {
  question: 0;
  selected?: string;
  onAnswer: (value: string) => void;
  onBack: () => void;
}

const COPY = {
  label: "Os convidados",
  title: "Quantos convidados",
  em: "no brinde?",
  hint: "Usamos esse número para dimensionar a equipe e estimar o investimento total.",
};

type Row = { id: string; label: string; sub: string; meta: string };

export default function QuizScreen({ question, selected, onAnswer, onBack }: Props) {
  const [locked, setLocked] = useState<string | null>(null);
  const c = COPY;
  const isActive = (id: string) => locked === id || (!locked && selected === id);

  const pick = (v: string) => {
    if (locked) return;
    setLocked(v);
    window.setTimeout(() => onAnswer(v), 480);
  };

  const rows: Row[] = GUEST_OPTIONS.map((g) => ({ id: g.id, label: g.label, sub: g.sub, meta: g.staff }));

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:pt-32">
      <div className="grid gap-6 border-b border-fg/15 pb-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Reveal>
            <Label index="01">{c.label}</Label>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.9rem)] font-medium leading-[0.95] tracking-[-0.02em]">
              {/* eslint-disable-next-line react/no-danger */}
              <span dangerouslySetInnerHTML={{ __html: c.title }} />
              <br />
              <span className="font-normal italic">{c.em}</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-4">
          <p className="max-w-sm text-[15px] leading-relaxed text-fg/60 md:ml-auto">{c.hint}</p>
        </Reveal>
      </div>

      <ul className="mt-2">
        {rows.map((o, i) => {
          const active = isActive(o.id);
          return (
            <motion.li
              key={o.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE }}
              className="border-b border-fg/15"
            >
              <button
                type="button"
                onClick={() => pick(o.id)}
                className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden py-6 text-left outline-none focus-visible:bg-fg/5 sm:gap-10 sm:py-8"
              >
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleX: active ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0 origin-left bg-acc/10"
                />
                <span className="gs-offset relative w-12 font-sans text-3xl font-extrabold tracking-[-0.04em] sm:w-20 sm:text-5xl">
                  0{i + 1}
                </span>
                <span className="relative min-w-0">
                  <span className="block font-display text-[clamp(1.5rem,3.2vw,2.6rem)] leading-[1.05] transition-transform duration-500 group-hover:translate-x-2">
                    {o.label}
                  </span>
                  <span className="mt-1.5 block text-[15px] text-fg/55">{o.sub}</span>
                </span>
                <span className="relative flex items-center gap-5">
                  <span className="hidden font-mono text-[13px] uppercase tracking-[0.12em] text-fg/50 md:block">
                    {o.meta}
                  </span>
                  <span
                    className={`grid h-12 w-12 place-items-center border transition-colors duration-300 ${
                      active
                        ? "border-acc bg-acc text-onacc"
                        : "border-fg/25 group-hover:border-acc group-hover:bg-acc group-hover:text-onacc"
                    }`}
                  >
                    {active ? <Check className="h-5 w-5" strokeWidth={2.5} /> : <MoveRight className="h-5 w-5" />}
                  </span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-12">
        <TextLink onClick={onBack} back>
          Voltar
        </TextLink>
      </div>
    </section>
  );
}