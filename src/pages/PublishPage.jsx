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
  });

  const handleSubmit = (e) => {
    e.preventDefault()

    const techArr = newWebsite.technologiesOtherText
    .split(",")
    .map((tech) => tech.trim())
    .filter((tech) => tech !== "")

    const currentDate = new Date()
    const publishDate = currentDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const websiteData = {
      url: newWebsite.url,
      description: newWebsite.description,
      technologies: [...newWebsite.technologies, ...techArr],
      categories: newWebsite.categories,
      publishDate: publishDate
    }

    console.log(websiteData)

  }

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewWebsite((prev) => {
      if (type === "checkbox") {
        if (name === "technologiesOther") {
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

  return (
    <>
      <Navbar />

      <div className="publish-page-container">
        <h1>Publish your project</h1>

        <div className="publish-form-card-wrapper">
          <div className="form-container">
            <h2 className="text-2xl text-center font-semibold mb-2">Please fill out this form</h2>

            <div className="form-container-inner">
              <form onSubmit={handleSubmit}>
                <label htmlFor={"url-" + id} className="text-xl">Website URL:</label>
                <input
                  type="url"
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
                  onChange={handleFormChange}
                />

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
                      <label htmlFor="technologies-other" className="text-xl">Add custom tech</label>
                      <div className="other-input">
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
                  </div>

                </div>

                <button type="submit" className="bg-gray-200 p-2 rounded my-2">Submit</button>

              </form>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default PublishPage;
