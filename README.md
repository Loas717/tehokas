# Tehokas

Aplicação de gerenciamento de projetos e tarefas com Laravel, React e Inertia.

## Requisitos

- PHP 7.3 ou superior
- Composer
- Node.js e npm
- MySQL

## Como rodar

1. Instale as dependências:

```bash
composer install
npm install
```

2. Crie o arquivo de ambiente e gere a chave da aplicação:

```bash
copy .env.example .env
php artisan key:generate
```

No Linux/macOS, use `cp .env.example .env` no lugar de `copy`.

3. Crie um banco MySQL e ajuste estas variáveis no arquivo `.env`:

```env
DB_DATABASE=tehokas
DB_USERNAME=root
DB_PASSWORD=
```

4. Execute as migrações e semeie:

```bash
php artisan migrate --seed
```

5. Em um terminal, inicie o servidor Laravel:

```bash
php artisan serve
```

6. Em outro terminal, compile os arquivos frontend:

```bash
npm run dev
```

Acesse [http://localhost:8000](http://localhost:8000).

## Testes

```bash
php artisan test
```
