const PublishPageForm = ({
  handlePublishFormSubmit,
  newWebsite,
  handleFormChange,
  websiteTech,
  websiteCategories,
  id,
}) => (
  <div className="publish-form-container">
    <form onSubmit={handlePublishFormSubmit}>
      <div className="text-input-wrapper">
        <label htmlFor={"url-" + id} className="text-xl">
          Website URL:
        </label>
        <input
          type="text"
          id={"url-" + id}
          name="url"
          value={newWebsite.url}
          placeholder="URL"
          onChange={handleFormChange}
          required
        />

        <label htmlFor={"url-" + id} className="text-xl">
          Dascription:
        </label>
        <textarea
          id={"description" + id}
          name="description"
          value={newWebsite.description}
          placeholder="A short description..."
          maxLength="150"
          onChange={handleFormChange}
          required
        />
      </div>

      <div className="flex flex-col justify-evenly w-full h-[400px]">


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
              <label htmlFor={`technologies-${tech.id}`}>{tech.name}</label>
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
                <label htmlFor="categories-other" className="text-xl">
                  Add custom categories
                </label>
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

      </div>


      <button type="submit" className="bg-blue-600 text-blue-50 p-2 rounded">
        Submit
      </button>
    </form>
  </div>
);

export default PublishPageForm;
