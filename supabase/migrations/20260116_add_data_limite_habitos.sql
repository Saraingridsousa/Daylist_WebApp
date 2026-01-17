-- Adiciona coluna data_limite na tabela habitos
ALTER TABLE habitos ADD COLUMN IF NOT EXISTS data_limite DATE;
