# Trello

## How to

## Pre-conditions

You need to download all project packages. In your terminal, run the following:

```bash
npm install
```

Please, delete the `.gitkeep` file from the folder if you added any new files there.

---

## Run the project

Run file watcher which will compile .css / .js files after each change to .scss / .js files automatically.

Press `Ctrl + C` to stop the watcher.

```bash
gulp watch
```

Or you might want to compile all .scss / .js files to .css / js files just once.

```bash
gulp build
```

---

## Coding conventions

1. Use [Prettier](https://prettier.io) as a code formatter for `.js`, `.scss` and `.html` files. Use `Prettier` as an extention in the VSCode (esbenp.prettier-vscode) works too. :)
2. Use BEM methodology

---

## Install new library

If you want to add a new library to the project:

```bash
npm install --save-dev <module_name>
```
