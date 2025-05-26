import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CookieConsent from "react-cookie-consent";
import blog from "../assets/img/svg/blog-svgrepo-com.svg";
import hour from "../assets/img/svg/calculator-svgrepo-com.svg";
import event from "../assets/img/svg/calendar-svgrepo-com.svg";
import contact from "../assets/img/svg/email-mail-svgrepo-com.svg";
import todo from "../assets/img/svg/gui-todo-list-svgrepo-com.svg";
import weather from "../assets/img/svg/weather-color-moon-cloud-light-svgrepo-com.svg";
import recipe from "../assets/img/svg/recipe-svgrepo-com.svg";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 uppercase">
                {t("programming education for kids")}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t(
                  "offering unique, fun, activities and learning. Discover kids' programs with everything from home activities to classes."
                )}
              </p>
              <Link
                to="/event"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded uppercase transition duration-300"
              >
                {t("Learn More")}
              </Link>
            </div>
            <div className="md:w-1/2 flex flex-wrap justify-center">
              {[
                { link: "/posts", src: blog, alt: "supermicro" },
                { link: "/event", src: event, alt: "hammond" },
                { link: "/working-hours", src: hour, alt: "intel" },
                { link: "/todo", src: todo, alt: "microsoft" },
                { link: "/recipe", src: recipe, alt: "microsoft" },
                { link: "/weather", src: weather, alt: "microsoft" },
                { link: "/contact", src: contact, alt: "microsoft" },
              ].map((item, index) => (
                <div key={index} className="w-1/3 p-4">
                  <Link to={item.link}>
                    <img
                      className="w-24 h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                      src={item.src}
                      alt={item.alt}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default Home;
