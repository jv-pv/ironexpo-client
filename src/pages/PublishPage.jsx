import { useState, useId, useContext, useEffect } from "react";
import { WebsiteContext } from "../context/website.context";
import { useNavigate } from "react-router-dom";
import { API_URL } from "/src/services/API_URL.jsx"
import Navbar from "../components/Navbar";
import axios from "axios";

const PublishPage = () => {
  const id = useId();
  const navigate = useNavigate()
  const { websiteTech, websiteCategories, fetchWebsiteTech, fetchWebsiteCategories } = useContext(WebsiteContext);

  useEffect(() => {
    fetchWebsiteTech();
    fetchWebsiteCategories()
  }, []);

  const [newWebsite, setNewWebsite] = useState({
    url: "",
    description: "",
    technologies: [],
    technologiesOther: false,
    technologiesOtherText: "",
    categories: [],
    categoriesOther: false,
    categoriesOtherText: ""
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewWebsite((prev) => {
      if (type === "checkbox") {
        if (name === "technologiesOther" || name === "categoriesOther") {
          return {
            ...prev,
            [name]: checked
          }
        } else {
          if (checked) {
            return {
              ...prev,
              [name]: [...prev[name], value],
            };
          } else {
            return {
              ...prev,
              [name]: prev[name].filter((tech) => tech !== value),
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
    e.preventDefault()

    // Create array from custom technologies
    const techArr = newWebsite.technologiesOtherText
    .split(",")
    .map((tech) => tech.trim())
    .filter((tech) => tech !== "")


    // Create array from custom categories
    const categoryArr = newWebsite.categoriesOtherText
    .split(",")
    .map((category) => category.trim())
    .filter((category) => category !== "")

    // Get current date
    const currentDate = new Date()
    const publishDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    // Prepend https
    const websiteUrl = newWebsite.url.startsWith("http://") || newWebsite.url.startsWith("https://")
    ? newWebsite.url
    : `https://${newWebsite.url}`

    const websiteData = {
      url: websiteUrl,
      description: newWebsite.description,
      technologies: [...newWebsite.technologies, ...techArr],
      categories: [...newWebsite.categories, ...categoryArr],
      publishDate: publishDate
    }

    try {
      axios.post(`${API_URL}/websites`, websiteData)
      .then((response) => {
        navigate("/websites")
      })
    } catch (error) {
      console.error("Post request was unsuccesful.", error)
    }

  }

  return (
    <>
      <Navbar />

      <div className="publish-page-container">
        {/* <h1>Publish your project</h1> */}

            {/* <h2 className="text-2xl text-center font-semibold mb-2">Please fill out this form</h2> */}

            <div className="publish-form-container">

              <form onSubmit={handlePublishFormSubmit}>

                <div className="text-input-wrapper">

                <label htmlFor={"url-" + id} className="text-xl">Website URL:</label>
                <input
                  type="text"
                  id={"url-" + id}
                  name="url"
                  value={newWebsite.url}
                  placeholder="URL"
                  onChange={handleFormChange}
                />

                <label htmlFor={"url-" + id} className="text-xl">Dascription:</label>
                <textarea
                  id={"description" + id}
                  name="description"
                  value={newWebsite.description}
                  placeholder="A short description..."
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
                          checked={newWebsite.technologies.includes(`${tech.name}`)}
                          onChange={handleFormChange}
                        />
                        <label htmlFor={`technologies-${tech.id}`}>
                          {tech.name}
                        </label>
                      </div>
                    ))}
                    <div className="tech-stack">

                      <input
                        type="checkbox"
                        id="tech-other"
                        name="technologiesOther"
                        checked={newWebsite.technologiesOther}
                        onChange={handleFormChange}
                      />
                      <label htmlFor="tech-other">Other</label>

                    </div>

                    {newWebsite.technologiesOther && (
                      <>
                      <div className="other-input">
                        <label htmlFor="technologies-other" className="text-xl">
                          Add custom tech
                        </label>
                        <input 
                          type="text" 
                          id="technologies-other"
                          name="technologiesOtherText"
                          value={newWebsite.technologiesOtherText}
                          placeholder="Add new technologies seperated by commas"
                          onChange={handleFormChange}
                        />
                      </div>
                      </>
                    )}
                    
                  </div>
                  

                </div>

                <div className="categories-container">
                  <h2 className="text-xl">Categories:</h2>

                  <div className="checkbox-wrapper">

                    {websiteCategories.map((category) => (
                      <div key={`category-${category.id}`} className="categories-stack">
                        <input
                          type="checkbox"
                          id={`categories-${category.id}`}
                          name="categories"
                          value={category.name}
                          checked={newWebsite.categories.includes(`${category.name}`)}
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
                        checked={newWebsite.categoriesOther}
                        onChange={handleFormChange}
                      />
                      <label htmlFor="category-other">Other</label>
                    </div>

                    {newWebsite.categoriesOther && (
                      <>
                      <div className="other-input">
                        <label htmlFor="categories-other" className="text-xl">Add custom categories</label>
                        <input 
                          type="text" 
                          id="categories-other"
                          name="categoriesOtherText"
                          value={newWebsite.categoriesOtherText}
                          placeholder="Add new categories seperated by commas"
                          onChange={handleFormChange}
                        />
                      </div>
                      
                      </>
                    )}

                  </div>

                </div>

                <button type="submit" className="bg-gray-200 p-2 rounded">Submit</button>

              </form>


        </div>
        
        <div className="preview-card-container">

          <div className='preview-card flex flex-col w-96 h-auto max-h-[580px] min-h-[580px] bg-gray-100 rounded-xl justify-self-center p-2'>
            <div className='card-image bg-gray-300'>
              {newWebsite.url ? (
                <iframe src={newWebsite.url.startsWith("http://") || newWebsite.url.startsWith("https://") ? newWebsite.url : `https://${newWebsite.url}` }></iframe>
              ) : (
                <img src="/src/assets/placeholder-image.png" alt="placeholder-img" className="w-full h-[350px]"/>
              )
              
            }
            </div>
            <div className="card-link text-center text-blue-500 text-base p-2 block">
              {newWebsite.url ? (
                <a href={newWebsite.url} target="_blank">{newWebsite.url}</a>
              ) : (
                <p>www.yourwebsite.com</p>
              )
            
            }
            </div>
            {newWebsite.description ? (
              <p className='card-description p-2 text-sm flex-1'>
                  {newWebsite.description}
              </p>
            ) : (
              <p className='card-description p-2 text-sm flex-1'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio eveniet eaque nihil eligendi doloribus autem dolor excepturi aperiam deserunt consequuntur.
              </p>
            )
          }
            <div className='flex flex-wrap w-full p-2 gap-2'>
              {newWebsite.technologies.length > 0 ? (
                newWebsite.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                ))
              ) : (
                <>
                  <span className="tech-tag">Lorem</span>
                  <span className="tech-tag">Ipsum</span>
                  <span className="tech-tag">Dolor</span>
                </>
              )
            
            }
            </div>
            <div className="flex justify-end items-center p-2">
                <p className='published-date text-xs'>Published: Month day, year </p>
            </div>
          </div>

        </div>


      </div>
    </>
  );
};

export default PublishPage;