import { useQuery } from "@tanstack/react-query";
import PostDetails from "../interface/PostDetails";
import Post from "./Post";
import axiosInstance from "../services/axiosInstance";

const Posts = () => {
  const { isPending, error, data } = useQuery<PostDetails[]>({
    queryKey: ["posts"],
    queryFn: () =>
      axiosInstance
        .get("/posts")
        .then((res) => {
          return res.data.map((item: any) => ({
            id: item.id,
            username: item.username,
            userId: item.userId,
            profilePic: item.profilePic,
            description: item.description,
            elevation: item.elevation,
            difficulty: item.difficulty,
            duration: item.duration,
          }));
        })
        .catch((err) => {
          console.log(err);
        }),
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-12">
      {isPending
        ? "loading"
        : data?.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;
