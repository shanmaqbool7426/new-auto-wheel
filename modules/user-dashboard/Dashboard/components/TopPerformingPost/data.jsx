import dayjs from 'dayjs';

export const columns = [
  {
    accessor: 'post',
    title: 'Post',
    width: 140,
  },
  {
    accessor: 'createdDate',
    title: 'Created',
    render: ({ createdDate }) => dayjs(createdDate).format('DD--MM-YYYY'),
  },
  {
    accessor: 'views',
    title: 'Views',
  },
  {
    accessor: 'clicks',
    title: 'Clicks',
  },

]

export const followersData = [
  {
    id: "6f9sd34969a0f1",
    post: "USED 2.0 L 2020 KIA Picanto...",
    createdDate: new Date(),
    views: "100",
    clicks: "200",
  },
  {
    id: "6f9sd34969a0f2",
    post: "USED 2.0 L 2020 KIA Picanto...",
    createdDate: new Date(),
    views: "98",
    clicks: "154",
  },
  {
    id: "6f9sd34969a0f3",
    post: "USED 2.0 L 2020 KIA Picanto...",
    createdDate: new Date(),
    views: "100",
    clicks: "200",
  },
  {
    id: "6f9sd34969a0f4",
    post: "USED 2.0 L 2020 KIA Picanto...",
    createdDate: new Date(),
    views: "100",
    clicks: "200",
  },
  {
    id: "6f9sd34969a0f5",
    post: "USED 2.0 L 2020 KIA Picanto...",
    createdDate: new Date(),
    views: "100",
    clicks: "200",
  },
  {
    id: "6f9sd34969a0f6",
    post: "USED 2.0 L 2020 KIA Picanto...",
    createdDate: new Date(),
    views: "100",
    clicks: "200",
  },
]