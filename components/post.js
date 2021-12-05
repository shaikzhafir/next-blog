const PostHeader = ({ postData }) => {
  return (
    <div>
      <h1>{postData.title}</h1>
      <p>
        <b>{postData.date}</b>
      </p>
      <p>{postData.slug}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
    </div>
  );
};

export default PostHeader;
