# React Testing Library
Logo🐐 

React testing library is a library, of course, but it also has a strong philosophy behind it.

It is called "opinionated", which means the way the library is written encourages a certain set of practices and in this case, that's the best practices for testing react.

React Testing Library provides a virtual DOM for tests. Any time you're running tests without a browser, you need to have a virtual DOM so that you can do things like click elements.
And you can also check to see whether the virtual DOM is behaving as you would hope.

Just on the other hand, as a test runner, so just as responsible for finding tests, running the tests and determining whether the tests pass or fail, we will cover these concepts in more detail later as well.

---
## Opinionated parts of testing library
### Test your software the way that users actually use it.

This is instead of testing internal implementation and by internal implementation, I mean how your software is written.

What you really care about is whether or not the software works the way it's supposed to.

How the code is written can change, and as long as the software is still behaving according to the specifications, then the tests will still pass.

## Find your elements by accessibility markers

That is, by the way screen readers and other assistive technologies would find your elements instead of using test ideas.

This probably sounds obvious, but if your tests can find your elements by these accessibility markers, then so can screen readers and it means that your software is accessible.


---

## Functional Testing

### What Should test have caught?

- Functional _tests_ generally...
  - Test code processes, and not simply static cosmetics
  - Test elements that might change with future coding
- Art, not science for what to include in which types of testing

### Unit Testing Functions

- Functions separate from components
  - Used by several components
  - Complex logic
- Unit test if
  - Complex logic difficult to test via functional tests
  - Too many edge cases

### Different minset from unit testing

| Unit Testing                                     | Functional Testing                           |
| ------------------------------------------------ | -------------------------------------------- |
| Isolated: mock dependencies, test internals      | include all relevant units, test behavior    |
| ⭐ very easy to pinpoint failures                | ⭐ Close to how users interect with software |
|                                                  | ⭐ robust test                               |
| 👎 Further from how users interact with software |                                              |
| 👎 More likely to break with refactory           | 👎 More difficult ti debug failing tests     |

---

## Move test to folder setups

- Install jest-dom test environment `npm install -D jest-environment-jsdom`
- Create new _jest_ config file add **jest.config.json** on _root_ directory

  ```json jest.config.json
  {
    "roots": ["<rootDir>"],
    "collectCoverageFrom": ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    "setupFilesAfterEnv": ["<rootDir>/test/setupTests.ts"],
    "testMatch": ["<rootDir>/test/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": "<rootDir>/node_modules/react-scripts/config/jest/babelTransform.js",
      "^.+\\.css$": "<rootDir>/node_modules/react-scripts/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/node_modules/react-scripts/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": ["<rootDir>/src"],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": ["js", "ts", "tsx", "jsx"],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ],
    "resetMocks": true
  }
  ```

- Include test folder on **tsconfig.json**

  ```json tsconfig.json
  {
  	"compilerOptions": {
  		"baseUrl": "src",
  		...
  	},
  	"include": ["src", "test"]
  }

  ```

- Update test script on **package.json**

  ```json package.json
  {
      "name": "...",
      "scripts": {
          "test": "jest --watch  --config=jest.config.json",
          ...
      }
      ...
  }
  ```

## ESLint and Prettier setups

- ESLint:

  - Install eslint pluggins `npm install -D eslint-plugin-jest-dom eslint-plugin-testing-library`
  - Remove `eslintConfig` from **package.json**
  - Create `.eslintrc` and add standard config

    ```json .eslintrc
    {
      "extends": [
        "plugin:testing-library/react",
        "react-app",
        "react-app/jest"
      ],
      "plugins": ["testing-library", "jest-dom"],
      "rules": {
        "testing-library/no-debugging-utils": "warn",
        "jest-dom/prefer-checked": "error",
        "jest-dom/prefer-enabled-disabled": "error",
        "jest-dom/prefer-required": "error",
        "jest-dom/prefer-to-have-attribute": "error",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-filename-extension": [
          1,
          { "extensions": [".tsx", ".ts", ".js", ".jsx"] }
        ],
        "react/jsx-indent": [2, "tab"]
      }
    }
    ```

  - Add **.eslintcache** to **.gitignore**

- Prettier:

  - Install prettier `npm install -D prettier`
  - Create `.prettierrc` and add standard config

    ```json .prettierrc
    {
      "singleQuote": true,
      "proseWrap": "always",
      "trailingComma": "es5",
      "useTabs": true,
      "printWidth": 80,
      "tabWidth": 2,
      "jsxSingleQuote": false
    }
    ```

- Add scripts on **package.json**

  ```json package.json
  {
      "name": "...",
      "scripts": {
          "lint:eslint": "eslint . --fix",
          "lint:prettier": "prettier --write .",
          ...
      }
      ...
  }
  ```

---

## Extra

### Cheat Sheets

- [Common React Testing Library Errors](React-Testing-Library-Assets/Common_React_Testing_Library_Errors.pdf)
- [Debugging Tips](React-Testing-Library-Assets/Debugging_Tips.jpeg)
- [Questions for tests](React-Testing-Library-Assets/Questions_for_tests.pdf)
- [React Testing Library Queries](React-Testing-Library-Assets/React_Testing_Library_Queries.pdf)
- [Types of Testing](React-Testing-Library-Assets/Types_of_Testing.pdf)
- [Order Summary Page](https://raw.githubusercontent.com/bonnie/udemy-TESTING-LIBRARY/main/finished-projects/sundaes-on-demand/mock-ups/1-order-summary-page.png)

### Setting up Jest and Testing Library for a non create-react-app application

1. Set up Jest by following these instructions from the Jest docs: https://jestjs.io/docs/tutorial-react#setup-without-create-react-app
   (you don't need to install react-test-renderer unless you're using snapshots, not taught in this course).

2. If you're using css, modules, mock them using these instructions from the Jest docs: https://jestjs.io/docs/webpack#mocking-css-modules

3. Install testing library for React and jest-dom:

```
	npm install --save-dev @testing-library/react
	npm install --save-dev @testing-library/jest-dom
```

4. Specify a `setupTests.js` location in the **setupFilesAfterEnv** option (https://jestjs.io/docs/configuration#setupfilesafterenv-array) in your Jest config (package.json, `jest.config.js` or `jest.config.ts`: https://jestjs.io/docs/configuration).

5. Add this line to `setupTests.js` to access **jest-dom** assertions in all tests:

```
	import '@testing-library/jest-dom';
```

### Referral links

- [Getting Started with Redux and Testing Library](https://dev.to/bonnie/getting-started-with-redux-and-testing-library-36ln)
- [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/setup)
- [Mock Service Worker (MSW)](https://mswjs.io/docs/getting-started/-mocks/rest-api)
- [Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)
