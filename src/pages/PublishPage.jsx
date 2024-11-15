import { useState, useId, useContext, useEffect } from "react";
import { WebsiteContext } from "../context/website.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "/src/services/API_URL.jsx";
import axios from "axios";
import PublishPageForm from "../components/PublishPageForm";
import PublishPreviewCard from "../components/PublishPreviewCard";

const PublishPage = () => {
  const id = useId();
  const navigate = useNavigate();
  const {
    websiteTech,
    websiteCategories,
    fetchWebsiteTech,
    fetchWebsiteCategories,
  } = useContext(WebsiteContext);

  useEffect(() => {
    fetchWebsiteTech();
    fetchWebsiteCategories();
  }, []);

  const [newWebsite, setNewWebsite] = useState({
    url: "",
    description: "",
    technologies: [],
    technologiesOther: false,
    technologiesOtherText: "",
    categories: [],
    categoriesOther: false,
    categoriesOtherText: "",
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewWebsite((prev) => {
      if (type === "checkbox") {
        if (name === "technologiesOther" || name === "categoriesOther") {
          return {
            ...prev,
            [name]: checked,
          };
        } else {
          if (checked) {
            // Spread through the technologies and categories arrays and add the new value if it doesn't exist
            // ...prev[name] spreads the technologies and/or categories array
            // ...prev[name].filter((element) => element !== value) filters out the value if it already exists
            // ...[value] adds the new value to the array
            // return is the new state object
            // prev is the previous state object
            // name is the name of the property to update
            // value is the new value to add to the array
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

  const handlePublishFormSubmit = (e) => {
    e.preventDefault();

    // Create array from custom technologies
    const otherTechArr = newWebsite.technologiesOtherText
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");

    // Create array from custom categories
    const otherCategoryArr = newWebsite.categoriesOtherText
      .split(",")
      .map((category) => category.trim())
      .filter((category) => category !== "");

    // Get current date
    const currentDate = new Date();
    const publishDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Prepend https
    const websiteUrl =
      newWebsite.url.startsWith("http://") ||
      newWebsite.url.startsWith("https://")
        ? newWebsite.url
        : `https://${newWebsite.url}`;

    const websiteData = {
      url: websiteUrl,
      description: newWebsite.description,
      technologies: [...newWebsite.technologies, ...otherTechArr],
      categories: [...newWebsite.categories, ...otherCategoryArr],
      publishDate: publishDate,
    };

    try {
      axios.post(`${API_URL}/websites`, websiteData).then((response) => {
        navigate("/");
      });
    } catch (error) {
      console.error("Post request was unsuccessful.", error);
    }
  };

  return (
    <>
      <div className="publish-page-container">
        <PublishPageForm
          handlePublishFormSubmit={handlePublishFormSubmit}
          newWebsite={newWebsite}
          handleFormChange={handleFormChange}
          websiteTech={websiteTech}
          websiteCategories={websiteCategories}
          id={id}
        />

        <PublishPreviewCard newWebsite={newWebsite} />
      </div>
    </>
  );
};

export default PublishPage;
