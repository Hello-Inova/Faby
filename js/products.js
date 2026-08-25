/* =========================================================
   FABY BOUTIQUE — catálogo de produtos (dados de exemplo)
   Edite/adicione itens aqui. Cada produto precisa de um "id"
   único (slug), usado nas URLs produto.html?id=...
   ========================================================= */

const FABY_PRODUCTS = [
  {
    id: "vestido-vermelho-festa",
    name: "Vestido Assimétrico Vermelho",
    category: "vestidos",
    price: 229.90,
    oldPrice: 279.90,
    tag: "Mais vendido",
    img: "img/produtos/vestido-vermelho-festa.jpg",
    gallery: ["img/produtos/vestido-vermelho-festa.jpg"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Vestido midi assimétrico em tecido fluido, gola alta e amarração na cintura que valoriza o caimento. Peça coringa para festas e eventos especiais, com barra desigual que alonga a silhueta.",
    details: ["Tecido leve e fluido", "Forro interno", "Amarração ajustável na cintura", "Barra assimétrica"]
  },
  {
    id: "vestido-azul-marinho",
    name: "Vestido Assimétrico Azul Marinho",
    category: "vestidos",
    price: 229.90,
    oldPrice: null,
    tag: "Novidade",
    img: "img/produtos/vestido-azul-marinho.jpg",
    gallery: ["img/produtos/vestido-azul-marinho.jpg"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Versão azul-marinho do nosso vestido best-seller: gola alta, cintura marcada e barra assimétrica em camadas. Elegante para o trabalho à noite ou para um jantar especial.",
    details: ["Tecido leve e fluido", "Forro interno", "Amarração ajustável na cintura", "Barra assimétrica"]
  },
  {
    id: "vestido-terracota-ciganinha",
    name: "Vestido Ciganinha Terracota",
    category: "vestidos",
    price: 189.90,
    oldPrice: 229.90,
    tag: "Promoção",
    img: "img/produtos/vestido-terracota-ciganinha.jpg",
    gallery: ["img/produtos/vestido-terracota-ciganinha.jpg"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Vestido ciganinha em tom terracota, gola franzida e laço na cintura. Caimento solto e romântico, ótimo para o dia a dia ou para compor um look de festa mais leve.",
    details: ["Tecido chiffon", "Laço removível", "Barra desigual", "Forro interno"]
  },
  {
    id: "vestido-floral-midi",
    name: "Vestido Midi Floral Marsala",
    category: "vestidos",
    price: 219.90,
    oldPrice: null,
    tag: null,
    img: "img/produtos/vestido-floral-midi.jpg",
    gallery: ["img/produtos/vestido-floral-midi.jpg"],
    sizes: ["P", "M", "G"],
    description:
      "Vestido midi em base marsala com estampa floral exclusiva na barra, cinto de pérolas na cintura e alças finas. Uma peça statement para quem gosta de destaque com delicadeza.",
    details: ["Estampa floral exclusiva", "Cinto de pérolas incluso", "Alças ajustáveis"]
  },
  {
    id: "vestido-longo-marsala",
    name: "Vestido Longo Fluido Terracota",
    category: "vestidos",
    price: 259.90,
    oldPrice: null,
    tag: null,
    img: "img/produtos/vestido-longo-marsala.jpg",
    gallery: ["img/produtos/vestido-longo-marsala.jpg"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Vestido longo em tecido fluido com cinto de argolas douradas, decote V e fenda discreta. Perfeito para madrinhas, formaturas e eventos ao ar livre.",
    details: ["Tecido fluido leve", "Cinto de argolas douradas", "Decote V", "Comprimento longo"]
  },
  {
    id: "conjunto-camisa-calca-verde",
    name: "Conjunto Camisa Nude + Calça Verde Militar",
    category: "conjuntos",
    price: 249.90,
    oldPrice: null,
    tag: "Novidade",
    img: "img/produtos/conjunto-camisa-calca-verde.jpg",
    gallery: ["img/produtos/conjunto-camisa-calca-verde.jpg"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Camisa nude de manga longa combinada com calça alfaiataria verde militar, cinto e abertura frontal no tornozelo. Um conjunto versátil para o trabalho ou para sair à noite.",
    details: ["Camisa em viscose leve", "Calça com cinto embutido", "Abertura frontal na barra"]
  },
  {
    id: "regata-short-alfaiataria",
    name: "Conjunto Regata Choker + Short Alfaiataria",
    category: "conjuntos",
    price: 179.90,
    oldPrice: 199.90,
    tag: "Promoção",
    img: "img/produtos/regata-short-alfaiataria.jpg",
    gallery: ["img/produtos/regata-short-alfaiataria.jpg"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Regata canelada com detalhe choker no decote combinada com short alfaiataria de cinto. Look moderno e confortável para o dia a dia com uma pegada mais chique.",
    details: ["Regata canelada com choker", "Short com cinto", "Modelagem confortável"]
  }
];

// utilitário de formatação de moeda BRL
function fabyFormatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function fabyGetProduct(id) {
  return FABY_PRODUCTS.find((p) => p.id === id);
}
