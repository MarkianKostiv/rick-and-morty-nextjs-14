This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Посилання на макет Figma по якому був створений сайт(з невеликими змінами)

[Figma](https://www.figma.com/community/file/979477099633946456/rick-and-morty-web-responsive);

## Структура проекту

Проект розбитий на умовні сторінки, які відповідають запитам до api на персонажів, локації та
епізоди.

- сторінка персонажів Розташована в каталозі [app] її компоненти розташовані в каталозі [app]
  і теці [chartersPageComponent].

- сторінка локацій розташована в теці [locations] тут знаходяться її компоненти та сама сторінка.

- сторінка епізодів розташована в теці [episodes] тут знаходяться її компоненти та сама сторінка.

- в теці [common] розташовуються загальні компоненти, які використовуються на різних сторінках.

## Бібліотеки які використовуються

- [react-responsive](https://github.com/yocontra/react-responsive) - для адаптиву компонентів.
- [mui/icons-material](https://mui.com/material-ui/material-icons/) - для різних іконок, покращення користувацького досвіду.
- [react-loader-spinner](https://mhnpd.github.io/react-loader-spinner/docs/intro) - для анімованих лоадерів, покращення користувацького досвіду.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
