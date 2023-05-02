const PostImage = ({ url }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        //backgroundSize: "300px",
        height: "200px",
      }}
    ></div>
  );
};

export default PostImage;
