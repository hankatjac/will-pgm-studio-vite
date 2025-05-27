import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Like from "./Like";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Sider from "./Sider";
import { AppContext } from "../../contexts/appContext";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import getCurrentUser from "../../utils/getCurrentUser";
import Confirm from "../Confirm";

const Single = () => {
  // const { id } = useParams();
  const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const postId = location.pathname.split("/")[2];
  // console.log(location.pathname.split("/"))
  const { logout, deletePostImage } = useContext(AppContext);
  const currentUser = getCurrentUser();
  const post = useLocation().state;
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${post.id}`);
      navigate("/posts");
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
      return;
    }
    deletePostImage(post.imgId);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <span className="capitalize font-semibold">{post.username}</span>
              <p className="text-gray-500 text-sm">
                Posted {moment(post.date).fromNow()}
              </p>
            </div>
            {currentUser?.username === post.username && (
              <div className="flex space-x-3">
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  to={`/posts/write/${post.id}`}
                  state={post}
                >
                  <GrEdit className="w-6 h-6 cursor-pointer" />
                </Link>
                <MdDelete
                  className="text-red-500 hover:text-red-600 w-6 h-6 cursor-pointer"
                  onClick={() => setOpenDialog(true)}
                  title="Delete Post"
                />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold my-4">{post.title}</h1>
          <div className="my-4 flex justify-center">
            <img
              className="w-xl rounded-lg shadow-md"
              src={post?.imgUrl}
              alt=""
            />
          </div>

          <div className="my-4">
            {readMore ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc?.substring(0, 1000)),
                }}
              ></p>
            )}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4 md:ml-auto">
          <Sider />
          <Like cat={post.cat} id={post.id} />
        </div>
      </div>
      <Confirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default Single;
