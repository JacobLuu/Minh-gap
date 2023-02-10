<h1 align="center">Install & Environment</h1>

### Environment & Setup react with TypeScript
- [Getting Started](https://reactjs.org/docs/getting-started.html)
- required nodejs version `v12.22.1` or `v14.17.1` (node -v)


### Development
* For validation
  - We use a combination of Material-UI and react-hook-form to handle form and validation.
  - Reference the [`<Login>`](/packages/admin/src/containers/Login/Login.tsx) component for a standard implementation.
  - Reference the [official documentation](https://react-hook-form.com/api) for further information.

* For styling
  - Global Material-UI's components configuration can be changed in [RootTheme](packages/admin/src/themes/RootTheme.ts).

* General rule of thumb
  - Since we configure the font-family in material-ui, use `<Typography>` will automatically have the correct font.
  - This also conforms to semantic HTML as text should be inside a `<h1..6>` or `<p>` tag.
  - `div` and `span` are form layout, position of elements.
  - `useMemo` and `useCallback` are for optimization (sacrificing some memory for faster calculation), not using them is alright as per the React's docs at the current moment.

* State management
  - Refer (the convention docs)[/docs/convention.md] for how we separate different kind of state.

* Workflow with global state
  - A global state is defined in a reducer file. This file contains the following:
    - The name of the state.
    - Initial state.
    - Reducer functions (handle logic for updating the state).
    - Actions (is dispatched to invoke a reducer function).
    - Selector function (for getting the global state on a component).

  - For example, refer [the login reducer file](/packages/admin/src/containers/Login/reducer.ts) for implementation.

  - To update the global state, we must dispatch an action, this will invoke the reducer function with the same name.

  - A saga is a file that controls the flow to update global state with data from an external server.
  - A saga listen for an action, once that action is dispatched it executes a flow to fetch data, once done it then dispatches another action to execute a reducer function to update the global state.

  - For example, ref [the saga file](/packages/admin/src/containers/Login/reducer.ts) for implementation.
