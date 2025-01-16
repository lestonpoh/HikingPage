import PostDetails from "../interface/PostDetails";
import Post from "./Post";

const Posts = () => {
  const posts: PostDetails[] = [
    {
      id: 1,
      name: "aaadd",
      userId: 1,
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
      profilePic: "https://picsum.photos/200",
      elevation: 1000,
      difficulty: 1,
      duration: 1,
    },
    {
      id: 2,
      name: "aafa",
      userId: 2,
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
      profilePic: "https://picsum.photos/200",
      elevation: 1000,
      difficulty: 1,
      duration: 1,
    },
    {
      id: 3,
      name: "aaagg",
      userId: 3,
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
      profilePic: "https://picsum.photos/200",
      elevation: 1000,
      difficulty: 1,
      duration: 1,
    },
    {
      id: 4,
      name: "aggaa",
      userId: 4,
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
      profilePic: "https://picsum.photos/200",
      elevation: 1000,
      difficulty: 1,
      duration: 1,
    },
  ];

  return (
    <div className="flex flex-col gap-12">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default Posts;
