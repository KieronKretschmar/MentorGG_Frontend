# Vue-WebApp

## Getting started

### VSCode and Vetur plugin
It is highly recommended to use Visual Studio Code with the Vetur plugin while working on this project.
The plugin itself is beyond genious and is an incredible help with maintaining the coding style and some other stuff.

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Coding conventions
To make code more readable and maintainable by everybody, we adhere to certain coding conventions and code styles.

### HTML Template

### SCSS/CSS
- Styles are written in SCSS.
- We leave a blank line between two distinct selectors, e.g.
    ```scss
    header {
    display: flex;
    }

    main {
    padding-top: 50px;
    }
    ```

### JavaScript
- Don't use `var` when you really mean `let` instead, otherwise buffy will be unhappy. For more info see [here](https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var).
