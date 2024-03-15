const EditPageForm = ({
  handleEditFormSubmit,
  editedWebsite,
  handleFormChange,
  websiteTech,
  websiteCategories,
  extraTech,
  extraCategories,
}) => (
  <div className="edit-form-container overflow-scroll">
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
          maxLength="200"
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
              <label htmlFor={`technologies-${tech.id}`}>{tech.name}</label>
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
              <label htmlFor="technologies-other">
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
                id={`categories-${category.id}`}
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

          {extraCategories.length > 0 && (
            <>
              {extraCategories.map((category) => (
                <div key={`category-${category}`} className="categories-stack">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    name="categories"
                    value={category}
                    checked={editedWebsite.categories.includes(category)}
                    onChange={handleFormChange}
                  />
                  <label htmlFor={`category-${category}`}>{category}</label>
                </div>
              ))}
            </>
          )}

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

      <button type="submit">
      <div className="submit-btn absolute z-20 bottom-2 left-4 text-base text-black font-semibold flex items-center justify-center rounded-full bg-lime-500 w-24 h-24 animate-pulse">
          Edit 🛠️
      </div>
        </button>
    </form>
  </div>
);

export default EditPageForm;
