<h1 align="center">Theme</h1>

### Create theme Theme Provider

- To change theme go to [the RootTheme](/packages/admin/src/themes/RootTheme.ts).
- Refer [the official document](https://mui.com/material-ui/customization/theming/) for more information.

### Reuse variables

- We define css variables in [colors.ts](/packages/admin/src/themes/colors.ts) and [styles.ts](packages/admin/src/themes/colors.ts)
- These variables should be imported into your components for reusable and consistency.
- Prepend the props with the symbol `$` to mark it as a props instead of an HTML attribute.

- Example

  ```tsx
  // On component
  <CategoryTab
    $active={selectedTab === `${CategoryType.environmental}`}
  />
  <CategoryTab
    $active={selectedTab === `${CategoryType.social}`}
  />
  ```

  ```ts
  // On styling file
  import { PRIMARY_COLOR, SECONDARY_COLOR } from 'themes/colors';

  interface CategoryTabProps {
    $active: boolean;
  }

  export const CategoryTab = styled(Tab)<CategoryTabProps & TabProps>`
    color: ${(props) => (props.$active ? PRIMARY_COLOR : SECONDARY_COLOR)};
  `;
  ```
