# Berikan

Hello! this is a project of mine to learn React + Typescript.
Berikan is a mobile first web-app to provide a platform for indonesian
to share their unused things. Although i doubt i will be able to scale it properly
since this project use firebase as BaaS (very expensive).

To run this project locally, simply clone the project then run:

```console
npm install
```

```console
npm run dev
```

## Deployed version

You can check out the deployed version here: [Berikan](https://berikan.web.app/)

## Note

Although most features are done, most error states from data fetching is not implemented yet.
I will implement them soon with a toast component.

For the search feature, firebase doesn't support full text search without
paying for third party service like algolia, and i'm a broke college student :)

In the end, i had to implement the search feature by just taking all the items
and filtering it in the front-end.
I'm aware this is not very scalable, but atm with small amount of data it's not a problem.

Things that are not implemented yet:

- Error States from data fetching with toast

Optional things to implement:

- Search results autocomplete navigation with arrow keys for desktop
