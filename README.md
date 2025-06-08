# 🗓️ Quando Pode?

**Quando Pode?** é uma ferramenta simples, rápida e eficiente para agendamento de reuniões.  
O sistema facilita a escolha do melhor horário entre todos os participantes, sem necessidade de login..

> Baseado no projeto [Meetingbrew](https://github.com/csaye/meetingbrew), adaptado, traduzido e evoluído sob a licença MIT.

---

## 🚀 Funcionalidades

- Criação rápida de eventos com múltiplas opções de horário
- Participação de convidados sem login
- Interface responsiva
- Compartilhamento via link direto
- Contador de eventos no Firestore
- Deploy automático com Vercel

---

## 🛠️ Tecnologias utilizadas

- [Next.js](https://nextjs.org/) (v13)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase Firestore](https://firebase.google.com/)
- [Vercel](https://vercel.com/)
- CSS Modules / SCSS

---

## 📦 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/tardellirs/quandopode.git
cd quandopode

# Instale as dependências
npm install

# Crie o arquivo .env.local com suas credenciais do Firebase:
touch .env.local
```

### Exemplo de `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

```bash
# Após configurar o .env.local, execute:
npm run dev
```

---

## 🌐 Deploy

O projeto está hospedado na Vercel:  
🔗 [https://quandopode.vercel.app](https://quandopode.vercel.app)

---

## 📄 Licença

Distribuído sob a [licença MIT](LICENSE.txt).  
Este projeto é uma adaptação do [Meetingbrew](https://github.com/csaye/meetingbrew).

---

## ✨ Autor

Desenvolvido e mantido por [Tardelli Stekel](https://github.com/tardellirs).
