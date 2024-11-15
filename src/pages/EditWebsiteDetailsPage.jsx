import { useContext, useEffect, useState } from "react";
import { WebsiteContext } from "../context/website.context";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "/src/services/API_URL.jsx";
import Navbar from "../components/Navbar";
import axios from "axios";
import EditPageForm from "../components/EditPageForm";
import EditPagePreviewCard from "../components/EditPagePreviewCard";

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
    publishDate: ""
  });

  const [extraTech, setExtraTech] = useState([]);
  const [extraCategories, setExtraCategories] = useState([]);

  let technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Three.js",
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
        publishDate: response.data.publishDate
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
            console.log(prev,  name)
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

    const otherTechArr = editedWebsite.technologiesOtherText.split(",")
    .map((tech) => tech.trim())
    .filter((tech) => tech !== "")

    const otherCategoryArr = editedWebsite.categoriesOtherText.split(",")
    .map((category) => category.trim())
    .filter((category) => category !== "")

    const currentDate = new Date();
    const publishDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  
    const websiteUrl = 
      editedWebsite.url.startsWith("http://") ||
      editedWebsite.url.startsWith("https://")
        ? editedWebsite.url
        : `https://${editedWebsite.url}`

    const editedWebsiteData = {
      url: websiteUrl,
      description: editedWebsite.description,
      technologies: [...editedWebsite.technologies, ...otherTechArr],
      categories: [...editedWebsite.categories, ...otherCategoryArr],
      publishDate: publishDate,
    };

    console.log(editedWebsiteData);

    try {
      axios.put(`${API_URL}/websites/${websiteId}`, editedWebsiteData)
      .then((response) => {
        navigate(`/websites/${websiteId}`)
      })
    } catch (error) {
      console.error("Put request was unsuccessful.", error)
    }
  };

  return (
    <>
      <div className="edit-page-container">

        <EditPageForm
          handleEditFormSubmit={handleEditFormSubmit}
          editedWebsite={editedWebsite}
          handleFormChange={handleFormChange}
          websiteTech={websiteTech}
          websiteCategories={websiteCategories}
          extraTech={extraTech}
          extraCategories={extraCategories}
        />
        <EditPagePreviewCard
          editedWebsite={editedWebsite}
        />
      </div>
    </>
  );
};

export default EditWebsiteDetailsPage;
