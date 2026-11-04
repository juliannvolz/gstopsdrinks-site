/* ================================================================== */
/*  GS TOP DRINKS — Integração Google Sheets (Apps Script Web App)     */
/*  Envia dados da comanda para planilha via fetch POST                */
/* ================================================================== */

export interface ComandaSheetsData {
  nome: string;
  telefone: string;
  segmento: string;
  convidados: number;
  pacote: string;
  drinks: string;
  valorPorPessoa: number;
  valorTotal: number;
  comandaId: number;
}

/**
 * URL do Web App do Google Apps Script
 * Configure no Vercel: VITE_SHEETS_WEBAPP_URL
 */
const SHEETS_WEBAPP_URL = import.meta.env.VITE_SHEETS_WEBAPP_URL || '';

/**
 * Envia dados da comanda para o Google Sheets via Apps Script Web App
 * Usa mode: 'no-cors' porque Apps Script não suporta CORS tradicional
 * Retorna true se a requisição foi disparada (não garante sucesso por causa do no-cors)
 */
export async function sendComandaToSheets(data: ComandaSheetsData): Promise<boolean> {
  if (!SHEETS_WEBAPP_URL) {
    console.warn('[GoogleSheets] VITE_SHEETS_WEBAPP_URL não configurada no ambiente');
    return false;
  }

  try {
    await fetch(SHEETS_WEBAPP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      mode: 'no-cors', // Necessário para Apps Script Web App
    });

    console.log('[GoogleSheets] Comanda enviada para planilha:', data.comandaId);
    return true;
  } catch (error) {
    console.error('[GoogleSheets] Falha ao enviar para planilha:', error);
    return false;
  }
}