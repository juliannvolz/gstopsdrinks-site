import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Phone } from "lucide-react";
import { Btn } from "../components/ui";

const contatoWhatsApp = "(47) 99279-1968";

const waLink = (tel: string) => `https://wa.me/${tel.replace(/\D/g, "")}`;

export default function Admin() {
  // Modo front-end: comandas gerenciadas via WhatsApp — sem banco de dados
  useEffect(() => {
    // Nenhuma operação de banco; modo offline/estático
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <header className="border-b border-fg/10 bg-bg/85 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-acc flex items-center justify-center text-onacc font-bold text-xs">GS</div>
            <div>
              <h1 className="font-semibold tracking-tight">GS Top Drinks — Admin</h1>
              <p className="text-xs text-fg/50">Controle de comandas geradas</p>
            </div>
          </div>
          <div className="text-[11px] text-fg/50">Modo front-end</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center">
          <p className="text-fg/60 text-sm mb-8">Painel administrativo simplificado</p>
          <div className="bg-fg/5 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-[12px] uppercase tracking-wider text-fg/50 mb-4">Operação</p>
            <p className="text-fg">
              As comandas geradas pelo site são encaminhadas diretamente para o WhatsApp da GS Top Drinks.
              <br />
              Contato: {waLink(contatoWhatsApp)}
            </p>
            <div className="mt-6 pt-6 border-t border-fg/15">
              <p className="text-[11px] text-fg/50">Etapas:</p>
              <ol className="list-decimal list-inside text-fg/60 space-y-1">
                <li>Cliente completa quiz no site</li>
                <li>Resultado gerado com estimativa de valor</li>
                <li>Cliente fornece nome e WhatsApp na tela de contato</li>
                <li>Comanda enviada via WhatsApp para a GS</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}