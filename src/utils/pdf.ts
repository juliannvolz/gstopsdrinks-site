/* ================================================================== */
/*  GS TOP DRINKS — PDF Generator (html2canvas + jsPDF)                */
/*  Gera comanda em PDF client-side, offline                           */
/* ================================================================== */

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { fmt } from "../data/drinks";
import type { Segment, PackageId, Pkg, Drink, GuestsOption, PricingBreakdown } from "../data/catalog";

interface ComandaData {
  segment: Segment;
  guests: GuestsOption;
  packageId: PackageId;
  pkg: Pkg;
  selectedDrinks: Drink[];
  perPerson: number;
  totalEvent: number;
  number: number;
  date: string;
  pricing?: PricingBreakdown;
}

/**
 * Gera PDF da comanda usando html2canvas + jsPDF
 * Funciona offline, sem dependência de servidor
 */
export async function generateComandaPDF(data: ComandaData): Promise<void> {
  const { segment, guests, pkg, selectedDrinks, perPerson, totalEvent, number, date, pricing } = data;

  // Criar elemento temporário para renderizar
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "400px";
  container.style.fontFamily = "'Jost', sans-serif";
  container.style.background = "#f7f1e6";
  container.style.color = "#1b1410";
  container.style.padding = "40px 36px";
  container.style.fontSize = "15px";
  container.style.lineHeight = "1.6";
  document.body.appendChild(container);

  const valorFinalPorPessoa = pricing?.valorFinalPorPessoa ?? perPerson;
  const tempoMinimo = pricing?.tempoMinimoHoras ?? 4;
  const deslocamentoObs = pricing?.deslocamento?.observacao ?? "";
  const prazoEntrega = pricing?.prazoEntrega ?? "até 4ª-feira";
  const pistolaFumaca = pricing?.opcionais?.pistolaFumaca ?? false;
  const valorPistolaFumaca = pricing?.opcionais?.valorPistolaFumaca ?? 0;

  // HTML da comanda (estilo receipt térmico) - SIMPLIFICADA
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 3.2rem; font-weight: 800; letter-spacing: -0.06em; font-family: 'Jost', sans-serif;">GS</div>
      <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.42em; text-transform: uppercase; margin-top: 8px;">Top Drinks</div>
      <div style="font-size: 13px; opacity: 0.6; margin-top: 12px;">Open bar premium · Blumenau — SC</div>
    </div>
    <hr style="border: none; border-top: 1px dashed rgba(27,20,16,0.35); margin: 16px 0;" />
    <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 16px;">
      <span>COMANDA Nº ${number}</span>
      <span>${date}</span>
    </div>
    <hr style="border: none; border-top: 1px dashed rgba(27,20,16,0.35); margin: 16px 0;" />
    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Evento</span><span>${segment.name}</span></div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Convidados</span><span>${guests.short}</span></div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Pacote</span><span>${pkg.name}</span></div>
    </div>
    <hr style="border: none; border-top: 1px dashed rgba(27,20,16,0.35); margin: 16px 0;" />
    <div style="margin-bottom: 16px;">
      ${selectedDrinks.map((d) => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>${d.name}</span>
          <span></span>
        </div>
      `).join("")}
    </div>
    <hr style="border: none; border-top: 1px dashed rgba(27,20,16,0.35); margin: 16px 0;" />
    <div style="display: flex; justify-content: space-between; font-family: 'Jost', sans-serif; margin-bottom: 8px;">
      <span style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em;">Total / pessoa</span>
      <span style="font-size: 1.75rem; font-weight: 800;">${fmt.format(valorFinalPorPessoa)}</span>
    </div>
    <p style="text-align: right; font-size: 13px; opacity: 0.6; margin-bottom: 12px;">para cerca de ${guests.estimate} convidados</p>
    <div style="display: flex; justify-content: space-between; font-family: 'Jost', sans-serif;">
      <span style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em;">Total estimado</span>
      <span style="font-size: 1.25rem; font-weight: 700;">≈ ${fmt.format(totalEvent)}</span>
    </div>
    ${pistolaFumaca ? `
    <hr style="border: none; border-top: 1px dashed rgba(27,20,16,0.35); margin: 16px 0;" />
    <div style="display: flex; justify-content: space-between; font-size: 13px; color: #e2412f; background: #fee; padding: 8px; border-radius: 8px;">
      <span>🔥 Pistola de fumaça (opcional)</span>
      <span style="font-weight: bold;">${fmt.format(valorPistolaFumaca)}</span>
    </div>
    ` : ''}
    <hr style="border: none; border-top: 1px dashed rgba(27,20,16,0.35); margin: 16px 0;" />
    <div style="margin-bottom: 16px; font-size: 12px; opacity: 0.7;">
      <div>Tempo mínimo: ${tempoMinimo}h</div>
      ${deslocamentoObs ? `<div>${deslocamentoObs}</div>` : ''}
      <div>Prazo de entrega: ${prazoEntrega}</div>
    </div>
    <div style="background: repeating-linear-gradient(90deg, #1b1410 0 2px, transparent 2px 4px, #1b1410 4px 5px, transparent 5px 8px, #1b1410 8px 11px, transparent 11px 12px); height: 12px; margin: 16px 0;"></div>
    <div style="background: #fff3e0; border: 1px solid #ffb74d; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
      <p style="text-align: center; font-size: 12px; color: #e65100; font-weight: 600; margin: 0;">
        Valor estipulado para simulação — a proposta final é personalizada com seu consultor <strong>GS Top Drinks</strong>.
      </p>
      <p style="text-align: center; font-size: 11px; color: #bf360c; margin: 4px 0 0 0;">
        Entre em contato pelo WhatsApp para fechar seu orçamento real.
      </p>
    </div>
    <p style="text-align: center; font-size: 13px;">obrigado pela preferência!</p>
    <p style="text-align: center; font-size: 13px; opacity: 0.6;">@gstopdrinks · gstopdrinks.com.br</p>
  `;

  try {
    // Renderizar com html2canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#f7f1e6",
    });

    // Criar PDF
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF({
      orientation: imgHeight > 297 ? "p" : "p",
      unit: "mm",
      format: imgHeight > 297 ? [imgWidth, imgHeight + 20] : "a4",
    });

    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, imgWidth, imgHeight);
    
    // Salvar
    pdf.save(`comanda-gs-top-drinks-${number}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}

/**
 * Gera PDF simples (sem html2canvas) para fallback
 */
export function generateSimplePDF(data: ComandaData): void {
  const { segment, guests, pkg, selectedDrinks, perPerson, totalEvent, number, date, pricing } = data;
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  
  const valorFinalPorPessoa = pricing?.valorFinalPorPessoa ?? perPerson;
  const tempoMinimo = pricing?.tempoMinimoHoras ?? 4;
  const deslocamentoObs = pricing?.deslocamento?.observacao ?? "";
  const prazoEntrega = pricing?.prazoEntrega ?? "até 4ª-feira";
  const pistolaFumaca = pricing?.opcionais?.pistolaFumaca ?? false;
  const valorPistolaFumaca = pricing?.opcionais?.valorPistolaFumaca ?? 0;

  let y = 20;
  const line = (text: string, size = 10, weight = "normal", align: "left" | "center" | "right" = "left") => {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", weight);
    const x = align === "center" ? 105 : align === "right" ? 195 : 15;
    pdf.text(text, x, y, { align });
    y += size * 0.5 + 2;
  };
  
  const hr = () => {
    pdf.setDrawColor(200);
    pdf.line(15, y, 195, y);
    y += 4;
  };

  line("GS TOP DRINKS", 28, "bold", "center");
  line("Open bar premium · Blumenau — SC", 10, "normal", "center");
  y += 4;
  hr();
  line(`COMANDA Nº ${number}`, 10, "normal", "left");
  line(date, 10, "normal", "right");
  y = 20;
  y = 50;
  
  line(`Evento: ${segment.name}`, 11);
  line(`Convidados: ${guests.short}`, 11);
  line(`Pacote: ${pkg.name}`, 11);
  hr();
  
  selectedDrinks.forEach((d) => {
    line(`${d.name}`, 10);
  });
  hr();
  
  line(`Total / pessoa: ${fmt.format(valorFinalPorPessoa)}`, 14, "bold");
  line(`para cerca de ${guests.estimate} convidados`, 10, "normal", "right");
  y += 4;
  line(`Total estimado: ≈ ${fmt.format(totalEvent)}`, 16, "bold");
  
  if (pistolaFumaca) {
    hr();
    line(`🔥 Pistola de fumaça (opcional): ${fmt.format(valorPistolaFumaca)}`, 10, "bold");
  }
  
  hr();
  
  line(`Tempo mínimo: ${tempoMinimo}h`, 10);
  if (deslocamentoObs) line(deslocamentoObs, 10);
  line(`Prazo de entrega: ${prazoEntrega}`, 10);
  hr();
  
  // Mensagem do consultor
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(230, 81, 0);
  const msg1 = "Valor estipulado para simulacao - a proposta final e personalizada com seu consultor GS Top Drinks.";
  const msg2 = "Entre em contato pelo WhatsApp para fechar seu orcamento real.";
  const splitMsg1 = pdf.splitTextToSize(msg1, 180);
  const splitMsg2 = pdf.splitTextToSize(msg2, 180);
  pdf.text(splitMsg1, 105, y, { align: "center" });
  y += splitMsg1.length * 4.5;
  pdf.text(splitMsg2, 105, y, { align: "center" });
  y += splitMsg2.length * 4.5 + 4;
  pdf.setTextColor(0, 0, 0);
  
  line("obrigado pela preferencia!", 11, "normal", "center");
  line("@gstopdrinks · gstopdrinks.com.br", 9, "normal", "center");

  pdf.save(`comanda-gs-top-drinks-${number}.pdf`);
}