# InxDB Playground

An interactive playground for [InxDB](https://github.com/willianmonteiro/inxDB) — a promise-based IndexedDB wrapper with a document-store API.

Write InxDB code in the editor, run it with `⌘⏎`/`Ctrl+Enter`, and watch it execute against a **real IndexedDB database** in your browser tab. Returned values and console output land in the console panel, and the database panel shows the live state of every collection and record.

![InxDB Playground](docs/screenshot.png)

## Features

- **Preset examples** covering the whole InxDB API: adding documents, reading, querying by (nested) criteria, updating, deleting, replacing collections, error handling, and resetting the database.
- **Code editor** (CodeMirror) with `db`, `InxDB`, and `console` in scope — write anything, `return` a value to print it.
- **Console panel** with color-coded output: results, logs, warnings, and errors.
- **Database panel** reading store and record state through the raw IndexedDB API, refreshed after every run.

Everything is local — the database lives in your browser's IndexedDB, nothing leaves the tab.

## Running locally

Requires Node 20+ (an `.nvmrc` is included).

```sh
nvm use
npm install
npm run dev
```

The playground uses the InxDB source from a sibling checkout (`"inxdb": "file:../inxDB"`), so clone both repos next to each other and build the library first:

```sh
git clone https://github.com/willianmonteiro/inxDB
git clone https://github.com/willianmonteiro/inxDB-playground
cd inxDB && npm install && npm run build
cd ../inxDB-playground && npm install && npm run dev
```

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [CodeMirror 6](https://codemirror.net) (`@uiw/react-codemirror`)
- [InxDB](https://github.com/willianmonteiro/inxDB)

## License

MIT — see [LICENSE](LICENSE).
