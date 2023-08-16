/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    {
      name: "dashboard",
      to: "dashboard",
      icon: "si si-speedometer",
    },
    // You can also set an external link to your main navigation and it will render as a link
    // {
    //   name: "Link Name",
    //   to: "https://example.com",
    //   icon: "si si-link",
    //   target: "_blank", // You can also set its target property
    // },
    {
      name: "Post",
      icon: "si si-book-open",
      subActivePaths: "posts",
      sub: [
        {
          name: "posts_index",
          to: "posts.index"
       
        },
        {
          name: "posts_create",
          to: "posts.index"
       
        },
      ],
    }
  
  ],
 
};
