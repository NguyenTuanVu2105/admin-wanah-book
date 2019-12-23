export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Manage',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-user',
      children: [
        {
          name: 'Users',
          url: '/users',
          icon: 'icon-user',
        },
        {
          name: 'Notifications',
          url: '/notifications',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Books',
      url: '/books',
      icon: 'icon-book-open',
      children: [
        {
          name: 'Books',
          url: '/books',
          icon: 'icon-book-open',
        },
        {
          name: 'Categories',
          url: '/categories',
          icon: 'icon-notebook',
        },
        {
          name: 'Authors',
          url: '/authors',
          icon: 'icon-user-female',
        },
      ],
    },
    {
      name: 'Reviews',
      url: '/theme/typography',
      icon: 'icon-doc',
    },
    {
      name: 'Book Requests',
      url: '/theme/typography',
      icon: 'icon-cursor',
    },
    {
      name: 'Messages',
      url: '/theme/typography',
      icon: 'icon-bubbles',
    },
  ],
};
