# Os Manos — portfólio

Site de portfólio de **Os Manos**, estúdio independente de edição de vídeos para YouTube Gaming e canais dark, formado por **PatoJoga_ofc** e **Trollchu**.

Página única em React + TypeScript + Vite + Tailwind CSS, sempre em tema escuro. Não tem backend nem painel: todo o conteúdo fica em arquivos dentro de `src/data/`.

## Rodar o projeto

Pré-requisito: [Node.js](https://nodejs.org) 20 ou mais recente.

```bash
npm install       # instala as dependências (só na primeira vez)
npm run dev       # servidor de desenvolvimento em http://localhost:5173
npm run build     # verifica os tipos e gera o site final em dist/
npm run preview   # serve o conteúdo de dist/ para conferir antes de publicar
npm test          # testes (links do YouTube, filtros, editores, contatos e dados)
```

Para publicar, envie a pasta `dist/` para qualquer hospedagem de site estático (Vercel, Netlify, GitHub Pages, Cloudflare Pages…).

Em `npm run dev`, os campos ainda não preenchidos aparecem com o aviso **"Pendente de configuração"**. Esses avisos não aparecem no site publicado.

## Onde fica cada coisa

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/site.ts` | Nome, descrição, headline, cor de destaque, contatos, redes sociais e textos das seções (incluindo o Sobre) |
| `src/data/projects.ts` | Vídeos do portfólio |
| `src/data/editors.ts` | Os dois editores: nome, arroba, foto, canal, bio, especialidades e jogos |
| `src/data/design.ts` | Equipe de design (seção "O Design"): nome, arroba, foto, Instagram, bio e especialidades |
| `src/data/niches.ts` | Nichos de canal: YouTube Gaming, Canais dark e Vlogs e outros nichos (destaque na seção "O que editamos" e filtro da galeria) |
| `src/data/games.ts` | Jogos e seus cartuchos: cor (`color`), pixel art (`sprite`) e imagem opcional (`image`) |
| `src/data/services.ts` | Especialidades / estilos de edição, com pixel art e legenda de meme (`meme`) |
| `src/data/memes.ts` | Adesivos arrastáveis do topo, faixas que correm, dicas da tela de loading, legendas do canal dark, conquistas e a missão de contato |
| `src/lib/sprites.ts` | Desenhos em pixel art (dá para criar novos editando as grades de letras) |
| `public/images/editors/` | Fotos de perfil |
| `public/images/projects/` | Thumbnails dos vídeos |
| `public/og-image.png` | Imagem que aparece ao compartilhar o link (1200×630) |

## Adicionar um vídeo

Abra `src/data/projects.ts` e adicione um objeto dentro da lista `projects`:

```ts
export const projects: Project[] = [
  {
    id: 'minecraft-100-dias',
    slug: 'minecraft-100-dias',
    title: 'Sobrevivi 100 dias no Minecraft',
    description: 'Edição dinâmica com memes e sound design.', // opcional
    youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    thumbnail: 'images/projects/minecraft-100-dias.jpg',      // opcional
    game: 'minecraft',
    category: 'Vídeo longo',
    editingStyle: 'edicao-dinamica',
    editorId: 'pato',
    featured: true,       // opcional: ocupa mais espaço na galeria
    published: true,
    aspectRatio: '16:9',  // opcional: use '9:16' para Shorts
    order: 1,             // opcional: menor aparece primeiro
  },
]
```

Passo a passo:

1. Crie um objeto novo com `id` e `slug` únicos. Use letras minúsculas, números e hífens.
2. Preencha `title` e `youtubeUrl`. São aceitos `youtube.com/watch?v=…`, `youtu.be/…` e `youtube.com/shorts/…`. Links que não forem do YouTube não viram player.
3. Coloque a thumbnail em `public/images/projects/` e informe o caminho em `thumbnail`. Se deixar vazio, o site usa a thumbnail do próprio YouTube. Para Shorts, prefira uma thumbnail vertical.
4. Escolha `game` (IDs de `games.ts`) e `editingStyle` (IDs de `services.ts`). Para vídeos de **canal dark**, use `niche: 'dark'`; para **vlogs, podcasts, reacts e outros conteúdos fora de games**, use `niche: 'criadores'`. Nos dois casos, deixe `game` vazio. Vídeos com jogo contam automaticamente como `'gaming'`. `category` é texto livre, por exemplo `'Vídeo longo'`, `'Short'`, `'Série'` ou `'Highlights'`.
5. Defina `editorId` como `'pato'` ou `'trollchu'`.
6. Use `published: true` quando o vídeo puder aparecer no site. Com `false`, ele fica guardado sem aparecer.

Se algum ID de jogo, estilo ou editor estiver errado, o `npm run build` acusa o erro. O `npm run dev` e o `npm test` também avisam sobre slugs repetidos e links inválidos.

Exemplo de vídeo para canal dark:

```ts
{
  id: 'historia-de-terror-01',
  slug: 'historia-de-terror-01',
  title: 'A casa abandonada da estrada velha',
  youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
  niche: 'dark',
  category: 'Vídeo longo',
  editingStyle: 'canais-dark',
  editorId: 'trollchu',
  published: true,
},
```

Os filtros da galeria são montados a partir dos vídeos publicados. Um filtro só aparece quando há pelo menos duas opções para escolher.

## Associar o vídeo ao editor

Basta preencher `editorId: 'pato'` (PatoJoga_ofc) ou `editorId: 'trollchu'` (Trollchu) no projeto. O site busca nome, arroba, foto e link em `src/data/editors.ts` e mostra **"Editado por @PatoJoga_ofc"** ou **"Editado por @Trollchu"** na galeria e nos detalhes do vídeo. Sem `editorId`, a assinatura não aparece.

Não copie nome, arroba ou foto para dentro dos projetos. Quando algo muda em `editors.ts`, o site inteiro é atualizado.

## Fotos dos editores

Coloque as fotos com estes nomes:

```
public/images/editors/pato.jpg
public/images/editors/trollchu.jpg
```

O formato recomendado é retrato 4:5, por exemplo 800×1000 px. Para usar outro nome, outro formato ou uma URL, altere o campo `photo` em `src/data/editors.ts`. Enquanto não houver foto, o site mostra um avatar com a inicial do nome.

No mesmo arquivo dá para preencher `tagline`, `bio`, `specialties` (IDs de `services.ts`), `games` (IDs de `games.ts`) e `socials` (`{ label: 'Twitch', url: 'https://…' }`).

## Contatos

Edite `contact` em `src/data/site.ts`:

```ts
contact: {
  email: 'contato@seudominio.com.br',
  instagram: 'osmanos',               // com ou sem @
  others: [{ label: 'Discord', url: 'https://discord.gg/…' }],
  // ...
}
```

**WhatsApp:** para o número não ficar público no GitHub, ele fica no arquivo `.env.local` na raiz do projeto. Esse arquivo só existe no seu computador e o git o ignora. Copie o `.env.example` para `.env.local` e preencha (só números, com DDI e DDD):

```
VITE_WHATSAPP=5511912345678
```

O número entra no site na hora do `npm run dev` ou `npm run build`. Se publicar em Vercel, Netlify ou GitHub Pages, cadastre `VITE_WHATSAPP` nas variáveis de ambiente da hospedagem.

Campos vazios ficam ocultos. O botão **Solicitar orçamento** abre o WhatsApp com uma mensagem pronta (`whatsappMessage`) ou, se não houver WhatsApp, o e-mail com o assunto `emailSubject`. Se nenhum contato estiver preenchido, a seção mostra os canais do YouTube dos editores.

Redes sociais do estúdio que devem aparecer no rodapé ficam em `socials`, no mesmo arquivo.

## Textos, cor e compartilhamento

- **Headline e descrição do topo:** `headline` e `heroDescription` em `site.ts`.
- **Sobre:** `about` em `site.ts`. Preencham `history`, `vision`, `process` (lista de etapas), `idealCreator` e `differentials` (lista). O que ficar vazio não aparece.
- **Cor de destaque:** `accentColor` em `site.ts` (qualquer cor CSS).
- **Nichos:** em `niches.ts` dá para mudar nome, descrição e a lista de formatos (`formats`) de cada nicho (YouTube Gaming, Canais dark e Vlogs e outros nichos).
- **Jogos e especialidades:** em `games.ts` e `services.ts`. `showOnSite: false` esconde o item da seção "O que editamos", e `order` define a ordem das especialidades.
- **Compartilhamento:** título, descrição e imagem são gerados a partir de `site.ts`. Quando o site tiver endereço próprio, preencha `url` (ex.: `'https://osmanos.com.br'`) para que a imagem de compartilhamento use o endereço completo. Para trocar a imagem, substitua `public/og-image.png` (1200×630).

## Memes, adesivos e conquistas

Tudo o que é brincadeira fica em `src/data/memes.ts`:

- **`heroStickers`:** os adesivos do topo, que o visitante pode arrastar. Cada um tem texto (ou `sprite`), cor, posição em % (`x`, `y`), rotação e, se quiser, posição própria no celular (`mobileX`, `mobileY`).
- **`tickerGames` e `tickerMemes`:** as frases das faixas que correm entre as seções.
- **`loadingTips`:** as dicas da tela de "loading" que aparece enquanto o portfólio está vazio.
- **`darkCaptions`:** as legendas digitadas no painel de canais dark.
- **`achievements`:** as conquistas que o visitante desbloqueia ao explorar o site. O contador fica no header, e o progresso é salvo no navegador de cada visitante.
- **`quest`:** objetivos e recompensa da missão de contato.

Segredo: digitar ↑ ↑ ↓ ↓ ← → ← → B A em qualquer lugar do site solta uma chuva de confete em pixel art.

As animações decorativas (faixas, glitch, adesivos balançando, hitmarker do clique) desligam sozinhas para quem ativou "reduzir movimento" no sistema.

## Link direto para um vídeo

Ao abrir um projeto, o endereço muda para `?projeto=<slug>`. Esse link pode ser enviado e já abre o vídeo.
