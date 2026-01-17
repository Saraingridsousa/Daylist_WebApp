-- Adiciona coluna data_inicio na tabela habitos
ALTER TABLE habitos ADD COLUMN IF NOT EXISTS data_inicio DATE DEFAULT CURRENT_DATE;

-- Preenche data_inicio para hábitos já existentes
UPDATE habitos
SET data_inicio = COALESCE(data_inicio, created_at::date)
WHERE data_inicio IS NULL;
