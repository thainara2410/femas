# FEMAS — Feira de Marketing Social e Mídias Alternativas

> Site institucional do evento semestral da Universidade Federal de Lavras (UFLA), desenvolvido com HTML, CSS e JavaScript puro — sem frameworks.

![Status](https://img.shields.io/badge/status-ativo-brightgreen)
![Linguagens](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)

---

## 📌 Sobre o projeto

A **FEMAS** é um evento semestral realizado desde 2015, vinculado à disciplina de Marketing Público da UFLA. O site apresenta informações sobre o evento e exibe um acervo de edições anteriores com sistema de álbuns interativo.

O projeto foi construído com foco em **código limpo, escalabilidade e facilidade de manutenção**, sem dependência de bibliotecas externas.

---

## ✨ Funcionalidades

- **Página institucional** — seções de apresentação, local/horário e organização do evento
- **Sistema de álbuns dinâmico** — cards gerados automaticamente a partir de um array de dados
- **Scroll horizontal** — navegação fluida entre álbuns com botões de seta e ocultação automática nos extremos
- **Lightbox com abas** — cada álbum possui duas seções independentes: *Fotos da Feira* e *Mídias da Edição*
- **Zoom de imagem** — visualização ampliada com navegação por setas e teclado (`←` `→` `Esc`)
- **Lazy loading** — carregamento otimizado das imagens
- **Menu responsivo** — adaptado para dispositivos móveis

---

## 🗂️ Estrutura do projeto
<img width="480" height="392" alt="image" src="https://github.com/user-attachments/assets/424556f2-2490-4d7c-9555-bf19ecd473d1" />


---

## 🚀 Como executar localmente

Não há dependências ou build. Basta clonar e abrir o arquivo no navegador:

```bash
git clone https://github.com/seu-usuario/femas.git
cd femas
# abra o index.html no navegador
```

> **Dica:** para evitar problemas com CORS ao carregar imagens locais, use uma extensão como *Live Server* no VS Code.

---

## ➕ Como adicionar um novo álbum

Toda a gestão de conteúdo é feita exclusivamente no array `ALBUMS` dentro de `assets/js/albuns.js`. Nenhuma outra parte do código precisa ser alterada.

```js
{
  id: 'femas-2025',
  title: 'FEMAS 2025',
  description: 'Breve descrição da edição.',
  fotos: [
    { src: 'assets/image/albuns/2025/foto1.jpg', caption: 'Legenda opcional' },
  ],
  midias: [
    { src: 'assets/image/albuns/2025/midia1.jpg', caption: 'Cartaz oficial' },
  ]
}
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e acessibilidade |
| CSS3 | Layout, animações, responsividade |
| JavaScript ES5+ | Lógica de álbuns, lightbox, scroll |

---

## 💡 Decisões técnicas

- **Sem frameworks** — escolha intencional para manter o projeto leve, sem etapa de build e fácil de hospedar em qualquer servidor estático.
- **Separação de responsabilidades** — HTML estrutural, CSS visual e JS comportamental em arquivos independentes, facilitando manutenção por múltiplos colaboradores.
- **Dados separados da engine** — o array `ALBUMS` é a única interface de conteúdo; a engine de renderização não precisa ser tocada para adicionar novas edições.
- **IIFE no JS** — o código da engine é encapsulado em uma função imediatamente invocada para não poluir o escopo global.

---

## 👥 Créditos

Desenvolvido por [Fellipe Silvério Brandão]  
Atualizado por Thainara Rocha Cruz

Projeto vinculado à disciplina de **Marketing Público — UFLA**
