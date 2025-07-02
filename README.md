# Soletre Game

**Versão brasileira do clássico “Spelling Bee” (NYT), totalmente em português**

---

## 🎯 Descrição  
O **Soletre Game** é um jogo de palavras em português que desafia sua criatividade e conhecimento do idioma! Aqui estão as regras principais:  

- Toda palavra deve possuir **no mínimo 4 letras**.  
- Toda palavra deve possuir a **letra central**.  
- **Não é permitido**: palavras com hífen, pronomes, preposições e palavrões.  
- **Não é permitido**: palavras no plural (ex.: **CARROS**, **MOEDAS**...).  
- **É permitido**: verbos no infinitivo (ex.: **JOGAR**, **COMER**, **VESTIR**...).  
- **É permitido**: palavras no masculino e/ou feminino (ex.: **MOÇO** e **MOÇA**).  
- Nem todas as palavras que é possível formar estão na lista do jogo.  
- Palavras de 4 letras valem **1 ponto** cada.  
- Palavras mais longas ganham **1 ponto por letra**.  
- Cada jogo inclui pelo menos um **pangrama** (usa todas as letras), que vale **7 pontos extras**!  

---

## 💡 Como jogar  

1. A cada dia, um conjunto de 7 letras é gerado (1 central + 6 laterais).  
2. Digite uma palavra válida e aperte **Enter**.  
3. Se a palavra for aceita, você ganha pontos de acordo com as regras.  
4. Encontre o máximo de palavras e descubra os pangramas para pontuar mais!  

---

## 🧩 Requisitos para executar

Para rodar o Soletre Game, você precisa de:

- Node.js  
- Uma instância do **Redis Server** ativa (local ou remota)

---

### 🔧 Instalando o NodeJS e Redis Server no Ubuntu/Debian

```bash
sudo apt update
sudo apt install nodejs
sudo apt install redis-server
```

## ⚙️ Rodando projeto  

### Preparando o projeto
```bash
git clone https://github.com/RyanSoar3s/soletre-game.git
cd soletre-game
npm install
ng build
```

### Executando o Redis
```bash
redis-server
```

### Executando o servidor
```bash
npm run serve:ssr:soletre
```

### Executando a aplicação
```bash
ng serve
```

### ⚠️ Observação

Antes de executar o servidor, abra o arquivo **server.ts** no projeto e descomente o seguinte bloco de código para habilitar a execução do servidor Express:

```ts
import { CommonEngine, isMainModule } from '@angular/ssr/node';
...
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
```
## 🛠️ Tecnologias utilizadas  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)  ![Express](https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=white)  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## Licença:

Este projeto está licenciado sob a [MIT License](LICENSE).
