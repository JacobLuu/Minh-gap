<h1 align="center">Convention</h1>

  1. [State](#state)
  1. [Variable](#variable)
  1. [Function](#function)
  1. [Component](#component)
  1. [Declaration](#declaration)
  1. [Alignment](#alignment)
  1. [Quotes](#quotes)
  1. [Spacing](#spacing)
  1. [Props](#props)
  1. [Refs](#refs)
  1. [Parentheses](#parentheses)
  1. [Tags](#tags)
  1. [Methods](#methods)
  1. [Typescript](#typescript)
  1. [Import](#import)


## State

  - Conceptually we divide state into 4 categories, each with different use case. The 4 are:
    - Global state
    - Communication state
    - Local state
    - Persistent state


  - **Global state (Redux)**

    - Global state is your business data.
    - Usually we get this state by requesting from a server.
    - Most of the time we should store it in Redux.
    - Why?
      - Business data can be very complex.
      - It might needs to be computed depending on the requirements.
      - More than one container require it.
    - Example: 
      - List of models like todos, users....
      - Details of an model.
      ```ts
      const initialState: UserState = {
        id: null,
        name: '',
        email_address: '',
        role: '',
      };
      ```


  - **Communication state**

    - Communication state helps with transitioning.
    - Requesting data from an external server usually requires a noticeable time.
    - This state helps knowing the status of a request.
    - It should be defined along with the global state.
    - Why?
      - It tracks the status of the request.
    - Example:
      ```ts
      const initialState: UserState = {
        // Global state
        id: null,
        name: '',
        email_address: '',
        role: '',
        // Communication state
        loginStatus: LoginStatus.Initial,
      };
      ```


  - **Local state (React)**

    - Local state helps controlling minor UI interaction.
    - Most of the time we should store it with React's `useState`.
    - Why?
      - Its shape is simple.
      - It serves simple tasks.
      - It persists on one component.
    - Example:
      - Form input.
      - Toggle
      ```ts
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      ```


  - **Persistent state**

    - Persistent state holds information about the user.
    - It is stored in either localStorage or sessionStorage depending on the use case.
    - Why?
      - It's simple.
      - It needs to be available on application level.

    - Example:
      ```ts
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      ```

  - **Full Example**:
    ```tsx
    // UserDetail.tsx
    import selectUser from './reducer';
    
    const UserDetail = () => {
      // Local state for toggling between 2 different UIs
      const [isInEditMode, setIsInEditMode] = useState(false);

      // Global state since user is business data
      const user = useAppSelector(selectUser);

      return (
        <>
          {isInEditMode ? <UserForm user={user}> /> : <p>{user.name}</p>}
        </UserForm>
      )
    }
    ```

    ```ts
    // reducer.ts
    import { createSlice } from '@reduxjs/toolkit';
    import { REQUEST_STATUS } from '../../constants/common';

    export const slice = createSlice({
      // Global state
      initialState: {
        user: {
          name: null,
          id: null,
        }
        // Communication state for loading overlay and debugging
        status: REQUEST_STATUS.SUCCESS,
      },
      reducers: {
        // Change the status on each reducer
        getUserRequest: (state, _action: PayloadAction<{ id: number }>) => {
          state.status = REQUEST_STATUS.REQUESTING;
        },
        getUserSuccess: (state, action: PayloadAction<{ user: User }) => {
          state.status = REQUEST_STATUS.SUCCESS;
          state.user = action.payload.user;
        },
        getUserFail: (state) => {
          state.status = REQUEST_STATUS.ERROR;
        },
      },
    });
    ```


## Variable

  - Use `const` and `let`.
  - Give as descriptive a name as possible, within reason.
  - Do not use abbreviations that are ambiguous or unfamiliar to readers.

  - Variable should be a noun.
  - Boolean variable should start with a be verb (is, are).

  ```ts
  // bad
  const drive = 10;
  const open = true;

  // good
  const book: Book = {
    id: 1,
    name: 'Nexus',
  }
  const isOpen = true
  ```

  ```ts
  // Bad
  const nErr  // Ambiguous abbreviation.

  // Good
  let error;
  ```

  - Declare variable interface if it isn't primitive type

  ```ts
  // Bad
  const cat = {
    id: 1,
    voice: 'meow',
  };

  // Good
  const cat: Cat = {
    id: 1,
    voice: 'meow',
  }

  ```

  - **Constant variable**: Should be all uppercase and in snake_case.

  ```ts
  // Bad
  const Default_font = 'Arial';

  // Good
  const DEFAULT_FONT = 'Arial';
  ```

  - **Parameter names**:
    - Parameter names are written in lowerCamelCase. 
    - Declare parameter interface whenever possible.

  ```ts
  // Bad
  const getUser(id) => {...};

  // Good
  const getUser(id: number) => {...};

  ```

  - Exception: When required by a third-party framework, parameter names may begin with a $. 

## Function

  - Function names are typically verbs or verb phrases.
    ```ts
    // bad
    const user = () => {...}

    // good
    const getUser = () => {...}
    ```

  - Function should do one thing only.
    ```ts
    // bad
    const getUserAndUpdateUser = () => {...}

    // good
    const getUser = () => {...}
    const updateUser = () => {...}
    ```


  - Function should not mutate the parameter. If you do mutation then return it.

    ```ts
    // bad
    let id = 1;

    const getUser(id: number) = () => {
      ...
      id += 1;
      return user;
    }

    getUser(id);
    getUser(id);

    // good
    let id = 1;

    const getUser(id: number) = () => {
      ...
      return user;
    }

    getUser(id);
    id += 1;
    getUser(id);
    ```

  - If there're many if/else conditions split it into smaller functions for readability.

  ```ts
  // Bad
  const doManyThings = () => {
    if (isMorning) {
      if (before9Am) {
        ...
      } else {
        ...
      }
    } else if (isNoon) {
      if (before1Pm) {
        ...
      } else {
        ...
      }
    } else if (isNight) {
      if (before9Pm) {
        ...
      }
    }
  }

  // Good
  const eatBreakfast = () => {...}
  const eatBrunch = () => {...}
  const eatLunch = () => {...}
  const eatSnacks = () => {...}
  const eatDinner = () => {...}

  const doMorningThing = () => {
    if (before9Am) eatBreakfast();
    else eatBrunch();
  }

  const doNoonThing = () => {
    if (before1Pm) eatLunch();
    else eatSnacks();
  }

  const doNightThing = () => {
    if (before9Pm) eatDinner();
  }

  const doManyThings = () => {
    if (isMorning) {
      doMorningThing();
    } else if (isNoon) {
      doNoonThing();
    } else if (isNight) {
      doNightThing();
    }
  }
  ```


## Component

  - **Declaration**:

    - Prefer the arrow function declaration with hooks over class-based declaration.
    - Declare props' interface along with the component.

      ```jsx
      interface MyComponentProps {
        id: number;
        name: string;
      }

      const MyComponent = (props: MyComponentProps) => {
        ...
        return (
          <div>
            ...
          </div>
        )
      }
      ```

  - **Single Responsibility**: Component should do one thing only, if it does more than 1 thing then split it into smaller components

      ```tsx
      // bad
      const MyComponent = () => {
        return (
          <div>
            <p>{user.name}</p>
            ...
            <p>{user.address}</p>
            ...
          </div>
        )
      }

      // good
      const Text = (props: {text: string}) => {
        return (
          <p>{props.text}</p>
        )
      }

      const MyComponent = () => {
        return (
          <div>
            <Text text={user.name} />
            ...
            <Text text={user.address} />
            ...
          </div>
        )
      }
      ```


## Alignment

  - Follow these alignment styles for JSX syntax. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) [`react/jsx-closing-tag-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md)

    ```jsx
    // bad
    <Foo superLongParam="bar"
         anotherSuperLongParam="baz" />

    // good
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />

    // if props fit in one line then keep it on the same line
    <Foo bar="bar" />

    // children get indented normally
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    >
      <Quux />
    </Foo>

    // bad
    {showButton &&
      <Button />
    }

    // bad
    {
      showButton &&
        <Button />
    }

    // good
    {showButton && (
      <Button />
    )}

    // good
    {showButton && <Button />}

    // good
    {someReallyLongConditional
      && anotherLongConditional
      && (
        <Foo
          superLongParam="bar"
          anotherSuperLongParam="baz"
        />
      )
    }

    // good
    {someConditional ? (
      <Foo />
    ) : (
      <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
      />
    )}
    ```


## Quotes

  - Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS. eslint: [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes)

    > Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

    ```jsx
    // bad
    <Foo bar='bar' />

    // good
    <Foo bar="bar" />

    // bad
    <Foo style={{ left: "20px" }} />

    // good
    <Foo style={{ left: '20px' }} />
    ```


## Spacing

  - Always include a single space in your self-closing tag. eslint: [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces), [`react/jsx-tag-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md)

    ```jsx
    // bad
    <Foo/>

    // very bad
    <Foo                 />

    // bad
    <Foo
     />

    // good
    <Foo />
    ```

  - Do not pad JSX curly braces with spaces. eslint: [`react/jsx-curly-spacing`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md)

    ```jsx
    // bad
    <Foo bar={ baz } />

    // good
    <Foo bar={baz} />
    ```


## Props

  - **Props Naming**: Avoid using DOM component prop names for different purposes.

  > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

  ```jsx
  // bad
  <MyComponent style="fancy" />

  // bad
  <MyComponent className="fancy" />

  // good
  <MyComponent variant="fancy" />
  ```

  - **Case**: Always use camelCase for prop names, or PascalCase if the prop value is a React component.

    ```jsx
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
      Component={SomeComponent}
    />
    ```

  - Omit the value of the prop when it is explicitly `true`. eslint: [`react/jsx-boolean-value`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md)

    ```jsx
    // bad
    <Foo
      hidden={true}
    />

    // good
    <Foo
      hidden
    />

    // good
    <Foo hidden />
    ```

  - Always include an `alt` prop on `<img>` tags. If the image is presentational, `alt` can be an empty string or the `<img>` must have `role="presentation"`. eslint: [`jsx-a11y/alt-text`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md)

    ```jsx
    // bad
    <img src="hello.jpg" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />

    // good
    <img src="hello.jpg" alt="" />

    // good
    <img src="hello.jpg" role="presentation" />
    ```

  - Do not use words like "image", "photo", or "picture" in `<img>` `alt` props. eslint: [`jsx-a11y/img-redundant-alt`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md)

    > Why? Screenreaders already announce `img` elements as images, so there is no need to include this information in the alt text.

    ```jsx
    // bad
    <img src="hello.jpg" alt="Picture of me waving hello" />

    // good
    <img src="hello.jpg" alt="Me waving hello" />
    ```

  - Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro). eslint: [`jsx-a11y/aria-role`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md)

    ```jsx
    // bad - not an ARIA role
    <div role="datepicker" />

    // bad - abstract ARIA role
    <div role="range" />

    // good
    <div role="button" />
    ```

  - Do not use `accessKey` on elements. eslint: [`jsx-a11y/no-access-key`](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md)

  > Why? Inconsistencies between keyboard shortcuts and keyboard commands used by people using screenreaders and keyboards complicate accessibility.

  ```jsx
  // bad
  <div accessKey="h" />

  // good
  <div />
  ```

  - Avoid using an array index as `key` prop, prefer a stable ID. eslint: [`react/no-array-index-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

> Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

We don’t recommend using indexes for keys if the order of items may change.

  ```jsx
  // bad
  {todos.map((todo, index) =>
    <Todo
      {...todo}
      key={index}
    />
  )}

  // good
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```

  - Always define explicit defaultProps for all non-required props.

  > Why? propTypes are a form of documentation, and providing defaultProps means the reader of your code doesn’t have to assume as much. In addition, it can mean that your code can omit certain type checks.

  ```jsx
  // bad
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };

  // good
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  SFC.defaultProps = {
    bar: '',
    children: null,
  };
  ```

  - Use spread props sparingly.
  > Why? Otherwise you’re more likely to pass unnecessary props down to components. And for React v15.6.1 and older, you could [pass invalid HTML attributes to the DOM](https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html).

  Notes for use:
  Filter out unnecessary props when possible. Also, use [prop-types-exact](https://www.npmjs.com/package/prop-types-exact) to help prevent bugs.

  ```jsx
  // bad
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...this.props} />
  }

  // good
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...relevantProps} />
  }
  ```


## Refs

  - Always use ref callbacks. eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

    ```jsx
    // bad
    <Foo
      ref="myRef"
    />

    // good
    <Foo
      ref={(ref) => { this.myRef = ref; }}
    />
    ```

## Parentheses

  - Wrap JSX tags in parentheses when they span more than one line. eslint: [`react/jsx-wrap-multilines`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md)

    ```jsx
    // bad
    render() {
      return <MyComponent variant="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent variant="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

## Tags

  - Always self-close tags that have no children. eslint: [`react/self-closing-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md)

    ```jsx
    // bad
    <Foo variant="stuff"></Foo>

    // good
    <Foo variant="stuff" />
    ```

  - If your component has multiline properties, close its tag on a new line. eslint: [`react/jsx-closing-bracket-location`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md)

    ```jsx
    // bad
    <Foo
      bar="bar"
      baz="baz" />

    // good
    <Foo
      bar="bar"
      baz="baz"
    />
    ```

## How to define `propTypes`, `defaultProps`, `contextTypes`, etc...

  ```tsx
  import React from 'react';
  import PropTypes from 'prop-types';

  const propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  const defaultProps = {
    text: 'Hello World',
  };

  const Link = (props) {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
  }

  Link.propTypes = propTypes;
  Link.defaultProps = defaultProps;

  export default Link;
  ```


## Typescript

  - Avoid using `any` when define an interface when possible.
  - Initialize a variable as soon as possible.

  ```ts
  // bad
  const [user, setUser] = useState<any>();

  // good
  interface User {
    name: string;
    address: string;
  }

  const [user, setUser] = useState<User>({
    name: '',
    address: '',
  });
  ```

  - Exception: `any` can be used for error in a `try/catch` block since an error can be something we don't expect

  ```ts
  try {
    // do something
  } catch (error: any) {
    // handle error
  }
  ```

  - Use interpolation string if we use a variable else use singlequotes

  ```ts
  // Bad
  const foo = `foo`;

  // Good
  const foo = 'foo';

  const bar = `${foo}bar`;
  ```

  - **Equality Checks**: Use identity operators `(===/!==)` except in the cases documented below.

  ```ts
  // Bad
  0.1 == '0.1' // True

  // Good
  0.1 === '0.1' // False
  ```

  - **Exception**: Catching both null and undefined values:

  ```ts
  if (someObjectOrPrimitive == null) {
    // Checking for null catches both null and undefined for objects and
    // primitives, but does not catch other falsy values like 0 or the empty
    // string.
  }
  ```


## Import

  - [Component naming convention and import/export strategy](https://bradfrost.com/blog/post/this-or-that-component-names-index-js-or-component-js/)
