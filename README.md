
# Vue-WebApp

  

## Getting started

  

### VSCode and Vetur plugin

It is highly recommended to use Visual Studio Code with the Vetur plugin while working on this project.

The plugin itself is beyond genious and is an incredible help with maintaining the coding style and some other stuff.

### Building & Running

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

### Environment variables

Vue supports modes and environment variables, see [docs]("https://cli.vuejs.org/guide/mode-and-env.html").
Environment variables can be set for local development by creating a files with names specified by the docs, and adding lines following the pattern `KEY=VALUE`, where KEY needs to start with "VUE_APP" or it won't be accessible.

#### Local development

For secrets, which should neither be accessible in the production build, nor in the git repository, create a file named`.env.development.local` in the root directory of the webapp.

#### List of useful environment variables for local development:
- `VUE_APP_BEARER_TOKEN`:  If set, the app will try to authenticate with the mentor.gg API using the provided. 
Example:  `VUE_APP_BEARER_TOKEN=123456789abc`

- `VUE_APP_OVERRIDE_API_URL`: If set, this URL will be used instead of the official mentor.gg API.
Example: `VUE_APP_OVERRIDE_API_URL=https://localhost:43310`




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