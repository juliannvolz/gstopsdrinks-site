import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ComandaLead {
  nome_cliente?: string | null;
  telefone: string;
  segmento: string;
  convidados: number;
  pacote: string;
  drinks: string;
  valor_por_pessoa: number;
  valor_total_evento: number;
}

export async function saveComanda(data: ComandaLead): Promise<{ ok: boolean; error?: string }> {
  // Ponte para WhatsApp apenas — nenhum banco de dados
  console.log("Comanda registrada (modo front-end):", data);
  return { ok: true };
}

export async function listComandas(): Promise<any[]> {
  const { data, error } = await supabase
    .from("comandas")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao listar comandas:", error);
    return [];
  }

  return data || [];
}

export async function updateComandaStatus(id: string, status: "pendente" | "contatado" | "fechado"): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("comandas").update({ status }).eq("id", id);
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Erro desconhecido" };
  }
}
