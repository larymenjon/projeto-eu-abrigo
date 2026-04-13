# Security Policy

## Visão geral
Este projeto é um site estático hospedado no GitHub Pages. Não há backend próprio ou armazenamento de dados sensíveis em servidor externo. A segurança do projeto depende principalmente de:

- manter o código-fonte em `UTF-8`;
- evitar a inclusão de informações pessoais ou credenciais no repositório;
- garantir que o branch `main` contém a versão publicada no GitHub Pages.

## Suporte
Este repositório não possui versões de suporte formal. O branch `main` é a versão ativa do site e deve ser o foco das atualizações.

## Diretrizes de segurança
- Não armazene senhas, tokens ou dados confidenciais em arquivos públicos.
- Use a validação de entrada do lado do cliente apenas como suporte; não confie em dados externos.
- Não envie informações de cartões de crédito, CPFs ou dados pessoais sensíveis via formulários deste projeto.
- Revise alterações em `script.js`, `index.html`, `style.css` e arquivos de formulário antes do deploy.

## Relato de vulnerabilidades
Para relatar um problema de segurança, abra uma issue no repositório e inclua as seguintes informações:

- descrição do problema;
- passos para reproduzir;
- impacto esperado;
- ambiente em que foi observado.

Se preferir, marque a issue com a palavra-chave `security` para facilitar a triagem.
