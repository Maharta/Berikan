# Berikan

Hello! this is a project of mine to learn React + Typescript.
Berikan purpose is to provide a platform for indonesian people
to share their unused things. Although i doubt i will be able to scale it properly
since this project use firebase as BaaS 😅.

To run this project locally, simply clone the project then run:

```console
npm install
```

```console
npm run dev
```

## Note

Although most features are done, most error states from data fetching is not implemented yet.
I will implement them soon with a toast component.

For the search feature, firebase doesn't support full text search without
paying for third party service like algolia, and i'm a broke college student :)

Although i will probably still implement it by just taking all the items then filtering it
in the front-end, which is very inefficient and not scalable at all.

Things that are not implemented yet:

- Chat Penjual
- Error States Fallback UI from data fetching
- Search
