import { defineAsyncComponent, defineCustomElement } from 'vue';

function dynamicPropsFn(route) {
  return { ...route.query };
}

function getComponentPath(path) {
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');
  const routePath = componentName
    .replace(/([a-zA-Z])(?=[A-Z])/g, '$1-')
    .toLowerCase();

  return { componentName, routePath };
}

// function setCustomElements(routePath, component, defineCustomElement) {
//   const element = routePath.replace(/.ce/, '');
//
//   const customElement = defineCustomElement(component.default);
//   customElements.define(element, customElement);
// }

export default function dynamicRoutes(components, stories, app, router) {
  Object.entries(components).forEach(([path, component]) => {
    const { componentName: parent, routePath } = getComponentPath(path);

    if (parent.includes('.ce')) {
      // TODO - Configure Dynamic Web Components
      // setCustomElements(routePath, component, defineCustomElement);
    } else {
      const children = [];
      Object.entries(stories).forEach(([storyPath, story]) => {
        if (storyPath.includes(parent)) {
          const { componentName, routePath: variation } =
            getComponentPath(storyPath);

          children.push({
            name: componentName,
            path: variation,
            // component: story.default,
            component: () =>
              import(`../stories/${parent}/${componentName}.vue`),
            meta: { parent },
            props: dynamicPropsFn,
          });
        }
      });

      const redirect = children.length
        ? `/${routePath}/${children[0].path}`
        : '/';

      const parentRoute = {
        name: parent,
        path: `/${routePath}`,
        component: () => import(`../components/ui/${parent}/${parent}.vue`),
        // component: component.default,
        meta: { parent: true },
        props: dynamicPropsFn,
        redirect,
        children,
      };

      router.addRoute(parentRoute);

      // app.component(parent, component.default);
      app.component(
        parent,
        defineAsyncComponent(() =>
          import(`../components/ui/${parent}/${parent}.vue`),
        ),
      );
    }
  });
}
