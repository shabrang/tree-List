export const data = [
  {
    id: 1, title: 'a', children: [
      { id: 5, title: 'a_1', children: [] },
      {
        id: 6, title: 'a_2', children: [
          { id: 7, title: 'a_2_1', children: [] }
        ]
      }
    ]
  },

  { id: 2, title: 'b', children: [] },

  {
    id: 3, title: 'c', children: [
      { id: 8, title: 'c_1', children: [] },
      { id: 9, title: 'c_2', children: [
          { id: 10, title: 'c_2_1', children: [] },
          { id: 11, title: 'c_2_2', children: [] }
        ] }
    ]
  },

  { id: 4, title: 'd', children: [] }

]