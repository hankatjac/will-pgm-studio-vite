import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { fetchPosts } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (err) {
        console.log(err);
        alert(err.response?.data || "Error fetching posts");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fetchPosts]);

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Latest Posts Row */}
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {posts
              .slice(-4)
              .reverse()
              .map((post) => (
                <div key={post.id} className="flex flex-col items-start">
                  <Link
                    to={`/posts/${post.id}`}
                    state={post}
                    className="text-gray-300 hover:text-white transition-colors font-semibold mb-2"
                  >
                    {post.title}

                    {post.imgUrl && (
                      <img
                        src={post.imgUrl}
                        alt=""
                        className="w-100 h-32 object-cover rounded-md mt-2 d-block mx-auto"
                      />
                    )}
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-gray-400">
            Copyright &copy; Will-PGM studio {new Date().getFullYear()} - All
            rights reserved
          </p>

          <ul className="flex space-x-4 mt-4 sm:mt-0">
            <li>
              <a href="https://www.facebook.com/hankbymeta/" className="hover:text-blue-400 transition-colors">
                <FaFacebookF size={20} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/hang-ruan/" className="hover:text-blue-600 transition-colors">
                <FaLinkedinIn size={20} />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                <FaGoogle size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
