# Faby Boutique — site de e-commerce

Site institucional/e-commerce da **Faby Boutique**, feito em HTML, CSS e JavaScript puros (sem build, sem dependências) — pronto para publicar no **GitHub Pages**.

## O que tem no site

- **Início** (`index.html`) — vitrine com destaques, categorias e institucional.
- **Loja** (`produtos.html`) — catálogo completo com filtro por categoria e ordenação.
- **Produto** (`produto.html?id=...`) — página de detalhe com seleção de tamanho, quantidade e "comprar pelo WhatsApp".
- **Sacola** (`carrinho.html`) — carrinho salvo no navegador (localStorage) com finalização via WhatsApp.
- **Sobre** (`sobre.html`) e **Contato** (`contato.html`).
- Identidade visual inspirada na logo da loja (rosa pink vibrante) e nas fotos da loja física (tons terracota/marsala, madeira e rosa blush).

O checkout **não processa pagamento no site**: ele monta a mensagem do pedido (produtos, tamanhos, quantidades e total) e abre uma conversa no WhatsApp da loja para fechar a venda — o mesmo fluxo que boutiques costumam usar.

## ⚠️ Antes de publicar, edite:

1. **Número de WhatsApp** — arquivo `js/cart.js`, constante `FABY_WHATSAPP` (linha ~11). Está com um número de exemplo (`5511999999999`); troque pelo número real da loja, só dígitos, com DDI 55 + DDD + número.
2. **Produtos e preços** — arquivo `js/products.js`. Os produtos atuais foram criados a partir das fotos enviadas, com nomes e preços de exemplo — ajuste conforme o estoque real da loja.
3. **Endereço e horário de funcionamento** — página `contato.html`, se quiser deixá-los fixos no site (hoje eles direcionam para WhatsApp/Instagram).

## Como publicar no GitHub Pages

O repositório já está pronto para isso (não usa nenhuma ferramenta de build).

1. No GitHub, entre no repositório → **Settings** → **Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Em **Branch**, selecione `main` e a pasta `/ (root)`. Clique em **Save**.
4. Em alguns minutos o site estará no ar em:
   `https://hello-inova.github.io/Faby/`

Sempre que quiser atualizar o site, basta enviar (`git push`) as alterações para a branch `main` — o GitHub Pages republica automaticamente.

## Rodar localmente

Não precisa instalar nada. Basta abrir `index.html` no navegador, ou, para evitar qualquer restrição do navegador com arquivos locais, rodar um servidor simples dentro da pasta:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Estrutura de arquivos

```
├── index.html
├── produtos.html
├── produto.html
├── carrinho.html
├── sobre.html
├── contato.html
├── 404.html
├── css/style.css
├── js/
│   ├── products.js   ← catálogo de produtos (edite aqui)
│   ├── cart.js       ← carrinho + WhatsApp (edite o número aqui)
│   └── main.js        ← comportamento geral do site
└── img/
    ├── logo.jpg
    └── produtos/       ← fotos dos produtos
```
