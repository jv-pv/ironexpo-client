import { useContext, useEffect, useState } from "react";
import { WebsiteContext } from "../context/website.context";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "/src/services/API_URL.jsx";
import Navbar from "../components/Navbar";
import axios from "axios";

const EditWebsiteDetailsPage = () => {
  const { websiteId } = useParams();
  const navigate = useNavigate()
  const {
    websiteTech,
    websiteCategories,
    fetchWebsiteTech,
    fetchWebsiteCategories,
  } = useContext(WebsiteContext);
  const [editedWebsite, setEditedWebsite] = useState({
    url: "",
    description: "",
    technologies: [],
    technologiesOther: false,
    technologiesOtherText: "",
    categories: [],
    categoriesOther: false,
    categoriesOtherText: "",
  });

  const [extraTech, setExtraTech] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);

  let technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "NextJS",
    "WebGL",
    "ThreeJS",
  ];
  let categories = [
    "Portfolio",
    "E-Commerce",
    "Blog",
    "Web App",
    "Colourful",
    "Monochrome",
    "Retro",
    "Minimalist",
    "Photography",
    "Video",
    "Audio",
    "Animation",
    "3D",
    "Experimental",
  ];

  const fetchWebsiteData = async () => {
    try {
      const response = await axios.get(`${API_URL}/websites/${websiteId}`);
      setEditedWebsite({
        url: response.data.url,
        description: response.data.description,
        technologies: response.data.technologies,
        technologiesOther: false,
        technologiesOtherText: "",
        categories: response.data.categories,
        categoriesOther: false,
        categoriesOtherText: "",
      });
      let techExtras = response.data.technologies.filter(
        (tech) => technologies.indexOf(tech) === -1
      );
      setExtraTech(techExtras);
      let extraCategories = response.data.categories.filter(
        (category) => categories.indexOf(category) === -1
      );
      setExtraCategories(extraCategories);
    } catch (error) {
      console.error("Could not fetch website data", error);
    }
  };

  useEffect(() => {
    fetchWebsiteData();
    fetchWebsiteTech();
    fetchWebsiteCategories();
  }, [websiteId]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedWebsite((prev) => {
      if (type === "checkbox") {
        if (name === "technologiesOther" || name === "categoriesOther") {
          return {
            ...prev,
            [name]: checked,
          };
        } else {
          if (checked) {
            return {
              ...prev,
              [name]: [...prev[name], value],
            };
          } else {
            return {
              ...prev,
              [name]: prev[name].filter((element) => element !== value),
            };
          }
        }
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    // const techArr = editedWebsite.technologiesOther.split(",")
    // console.log(techArr)

    const currentDate = new Date();
    const publishDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const editedWebsiteData = {
      url: editedWebsite.url,
      description: editedWebsite.description,
      technologies: editedWebsite.technologies,
      categories: editedWebsite.categories,
      publishDate: publishDate,
    };

    console.log(editedWebsiteData);

    // try {
    //   axios.put(`${API_URL}/websites/${websiteId}`, editedWebsiteData)
    //   .then((response) => {
    //     navigate(`/websites/${websiteId}`)
    //   })
    // } catch (error) {
    //   console.error("Put request was unsuccesful.", error)
    // }
  };

  return (
    <>
      <Navbar />

      <div className="edit-page-container">
        <div className="edit-form-container">
          <form onSubmit={handleEditFormSubmit}>
            <div className="text-input-wrapper">
              <label htmlFor="url" className="text-xl">
                Website URL:
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={editedWebsite.url}
                onChange={handleFormChange}
              />

              <label htmlFor="description" className="text-xl">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={editedWebsite.description}
                maxLength="150"
                onChange={handleFormChange}
              />
            </div>

            <div className="tech-container">
              <h2 className="text-xl">Tech Stack:</h2>

              <div className="checkbox-wrapper">
                {websiteTech.map((tech) => (
                  <div key={`tech-${tech.id}`} className="tech-stack">
                    <input
                      type="checkbox"
                      id={`technologies-${tech.id}`}
                      name="technologies"
                      value={tech.name}
                      checked={editedWebsite.technologies.includes(tech.name)}
                      onChange={handleFormChange}
                    />
                    <label htmlFor={`technologies-${tech.id}`}>
                      {tech.name}
                    </label>
                  </div>
                ))}
                {extraTech.length > 0 && (
                  <>
                    {extraTech.map((tech) => (
                      <div key={`tech-${tech}`} className="tech-stack">
                        <input
                          type="checkbox"
                          id={`technologies-${tech}`}
                          name="technologies"
                          value={tech}
                          checked={editedWebsite.technologies.includes(tech)}
                          onChange={handleFormChange}
                        />
                        <label htmlFor={`technologies-${tech}`}>{tech}</label>
                      </div>
                    ))}
                  </>
                )}
                <div className="tech-stack">
                  <input
                    type="checkbox"
                    id="tech-other"
                    name="technologiesOther"
                    checked={editedWebsite.technologiesOther}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="tech-other">Other</label>
                </div>

                {editedWebsite.technologiesOther && (
                  <div className="other-input">
                    <label htmlFor="technologies-other" className="text-xl">
                      Add custom tech
                    </label>
                    <input
                      type="text"
                      id="technologies-other"
                      name="technologiesOtherText"
                      value={editedWebsite.technologiesOtherText}
                      placeholder="Add new technologies seperated by commas"
                      onChange={handleFormChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="categories-container">
              <h2 className="text-xl">Categories:</h2>

              <div className="checkbox-wrapper">
                {websiteCategories.map((category) => (
                  <div key={category.id} className="categories-stack">
                    <input
                      type="checkbox"
                      id={`categories=${category.id}`}
                      name="categories"
                      value={category.name}
                      checked={editedWebsite.categories.includes(category.name)}
                      onChange={handleFormChange}
                    />
                    <label htmlFor={`categories-${category.id}`}>
                      {category.name}
                    </label>
                  </div>
                ))}

                <div className="categories-stack">
                  <input
                    type="checkbox"
                    id="category-other"
                    name="categoriesOther"
                    checked={editedWebsite.categoriesOther}
                    onChange={handleFormChange}
                  />
                  <label htmlFor="category-other">Other</label>
                </div>

                {editedWebsite.categoriesOther && (
                  <div className="other-input">
                    <label htmlFor="categories-other" className="text-xl">
                      Add custom categories
                    </label>
                    <input
                      type="text"
                      id="categories-other"
                      name="categoriesOtherText"
                      value={editedWebsite.categoriesOtherText}
                      placeholder="Add new categories separeted by commas"
                      onChange={handleFormChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="bg-gray-500 text-blue-50 p-2 rounded">
              Submit
            </button>
          </form>
        </div>

        <div className="preview-card-container">
          <div className="preview-card flex flex-col w-96 h-auto max-h-[580px] min-h-[580px] bg-gray-200 rounded-xl justify-self-center p-2">
            <div className="card-image bg-gray-300">
              {editedWebsite.url ? (
                <iframe
                  src={
                    editedWebsite.url.startsWith("http://") ||
                    editedWebsite.url.startsWith("https://")
                      ? editedWebsite.url
                      : `https://${editedWebsite.url}`
                  }
                ></iframe>
              ) : (
                <img
                  src="/src/assets/placeholder-image.png"
                  alt="placeholder-img"
                  className="w-full h-[350px]"
                />
              )}
            </div>
            <div className="card-link text-center text-blue-500 text-base p-2 block">
              {editedWebsite.url ? (
                <a href={editedWebsite.url} target="_blank">
                  {editedWebsite.url}
                </a>
              ) : (
                <p>www.yourwebsite.com</p>
              )}
            </div>
            {editedWebsite.description ? (
              <p className="card-description p-2 text-sm flex-1">
                {editedWebsite.description}
              </p>
            ) : (
              <p className="card-description p-2 text-sm flex-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
                eveniet eaque nihil eligendi doloribus autem dolor excepturi
                aperiam deserunt consequuntur.
              </p>
            )}
            <div className="flex flex-wrap w-full p-2 gap-2">
              {editedWebsite.technologies.length > 0 ? (
                editedWebsite.technologies.map((tech, index) => (
                  <span className="tech-tag" key={index}>
                    {tech}
                  </span>
                ))
              ) : (
                <>
                  <span className="tech-tag">Lorem</span>
                  <span className="tech-tag">Ipsum</span>
                  <span className="tech-tag">Dolor</span>
                </>
              )}
            </div>
            <div className="flex justify-end items-center p-2">
              <p className="published-date text-xs">
                Published: Month day, year{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditWebsiteDetailsPage;
