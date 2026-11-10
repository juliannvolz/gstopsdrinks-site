import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { Check, MoveRight } from "lucide-react";
import { EASE, Label, Reveal, TextLink } from "./ui";
import { SEGMENTS, SEGMENT_ORDER, type SegmentId } from "../data/catalog";

interface Props {
  selected?: SegmentId | null;
  onAnswer: (value: SegmentId) => void;
  onBack: () => void;
}

export default function SegmentSelectionScreen({ selected, onAnswer, onBack }: Props) {
  const [locked, setLocked] = useState<SegmentId | null>(null);
  const isActive = (id: SegmentId) => locked === id || (!locked && selected === id);

  const pick = (v: SegmentId) => {
    if (locked) return;
    setLocked(v);
    window.setTimeout(() => onAnswer(v), 480);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:pt-32">
      <div className="grid gap-6 border-b border-fg/15 pb-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <Reveal>
            <Label index="02">O evento</Label>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.6vw,4.9rem)] font-medium leading-[0.95] tracking-[-0.02em]">
              Qual o tipo de <span className="font-normal italic">celebração?</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="md:col-span-4">
          <p className="max-w-sm text-[15px] leading-relaxed text-fg/60 md:ml-auto">
            Cada tipo de evento leva você a uma experiência com identidade própria.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SEGMENT_ORDER.map((id, i) => {
          const segmentId = id as SegmentId;
          const s = SEGMENTS[segmentId];
          const active = isActive(segmentId);
          const vars = { "--acc": s.theme.acc, "--acc2": s.theme.acc2 } as CSSProperties;
          return (
            <motion.button
              key={id}
              type="button"
              style={vars}
              onClick={() => pick(segmentId)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: EASE }}
              className="group relative aspect-[4/5] overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc)] md:aspect-[3/4.2]"
            >
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#fbf6ef]">
                <span className="gs-offset font-sans text-5xl font-extrabold tracking-[-0.04em]">0{i + 1}</span>
                <p className="mt-5 font-display text-[2.1rem] leading-none">{s.name}</p>
                <p className="mt-2.5 font-mono text-[13px] uppercase tracking-[0.12em] text-white/70">{s.short}</p>
              </div>
              <span
                className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--acc)" }}
              />
              <motion.span
                initial={false}
                animate={{ scale: active ? 1 : 0 }}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center text-[#0a0a0a]"
                style={{ background: "var(--acc)" }}
              >
                <Check className="h-5 w-5" strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-12">
        <TextLink onClick={onBack} back>
          Voltar
        </TextLink>
      </div>
    </section>
  );
}