import { useState, useId, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { WebsiteContext } from "../context/website.context";

const PublishPage = () => {
  const id = useId();
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

  const handleSubmit = (e) => {
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

    console.log(websiteData)

  }

  return (
    <>
      <Navbar />

      <div className="publish-page-container">
        {/* <h1>Publish your project</h1> */}

        <div className="publish-form-card-wrapper">
            {/* <h2 className="text-2xl text-center font-semibold mb-2">Please fill out this form</h2> */}

            <div className="publish-form-container">

              <form onSubmit={handleSubmit}>

                <div className="text-input-wrapper">

                <label htmlFor={"url-" + id} className="text-xl">Website URL:</label>
                <input
                  type="text"
                  id={"url-" + id}
                  value={newWebsite.url}
                  name="url"
                  placeholder="URL"
                  onChange={handleFormChange}
                />

                <label htmlFor={"url-" + id} className="text-xl">Dascription:</label>
                <textarea
                  id={"description" + id}
                  value={newWebsite.description}
                  name="description"
                  placeholder="A short description..."
                  maxLength="160"
                  onChange={handleFormChange}
                />

                </div>

                <div className="tech-wrapper">
                  <label htmlFor={"technologies-" + id} className="text-xl">Tech Stack:</label>

                  <div className="ceckbox-wrapper">

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
                        <label htmlFor="technologies-other" className="text-xl">Add custom tech</label>
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

                <div className="categories-wrapper">
                  <label htmlFor={"categories-" + id} className="text-xl">Categories:</label>

                  <div className="ceckbox-wrapper">

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


        </div>
        
        <div className="preview-card-container">

          <div className='preview-card flex flex-col w-96 h-auto max-h-[550px] min-h-[550px] bg-gray-100 rounded-xl justify-self-center p-2'>
            <div className='card-image bg-gray-300'>
                <iframe src={newWebsite.url.startsWith("http://") || newWebsite.url.startsWith("https://") ? newWebsite.url : `https://${newWebsite.url}` }></iframe>
            </div>
            <div className="card-link text-center text-blue-500 text-base p-2 block">
                <a href={newWebsite.url}>{newWebsite.url}</a>
            </div>
            <p className='card-description flex items-center p-2 text-sm flex-1'>
                {newWebsite.description}
            </p>
            <div className='tech-stack flex p-2 gap-2'>
                {newWebsite.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                ))}
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