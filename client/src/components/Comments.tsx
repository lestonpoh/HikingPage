interface CommentDetails {
  profilePicture: string;
  name: string;
  description: string;
}

const Comments = () => {
  const comments: CommentDetails[] = [
    {
      profilePicture: "https://picsum.photos/200",
      name: "aaadd",
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
    },
    {
      profilePicture: "https://picsum.photos/200",
      name: "aaadd",
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
    },
    {
      profilePicture: "https://picsum.photos/200",
      name: "aaadd",
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
    },
    {
      profilePicture: "https://picsum.photos/200",
      name: "aaadd",
      description:
        "loremdmmfkoernginewgnkwernfkw4nmglkn4woirj3on  3wkfnk3  v3iow4nfk n3o4fnr k3 f43nf vckwec 3nfk   c3nco32   odn23odm23wefmwef",
    },
  ];
  return (
    <div>
      <div className="flex gap-4 items-center pb-5 mb-5 border-b border-b-slate-200">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://picsum.photos/200"
          alt=""
        />
        <input className="input" type="text" placeholder="Write a comment" />
        <button className="button">Send</button>
      </div>
      <div className="flex flex-col gap-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-4">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={comment.profilePicture}
              alt=""
            />
            <div>
              <span className="font-bold">{comment.name}</span>
              <p className="text-sm">{comment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
