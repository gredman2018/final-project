

const app = {
  initialize: function() {
    app.client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: "8ikd5mmf3vgg",
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: "0qd8YhzIEczRs9-Cly8p_z9M0chnYayJfR9Jasl85NI"
    });
  },

  getEntry: function(entry) {
    // fetch a particular project
    app.client.getEntry(entry).then(project => {
      const projectData = {
        title: project.fields.projectName,
        imageUrl: `http:${project.fields.projectPhoto.fields.file.url}`,
        description: documentToHtmlString(project.fields.projectDescription),
        problemStatement: documentToHtmlString(project.fields.problemStatement),
        researchImage: `http:${project.fields.researchPhoto.fields.file.url}`,
        research: documentToHtmlString(project.fields.research),
        wireframeImage: `http:${project.fields.wireframePhoto.fields.file.url}`,
        wireframeDescription: documentToHtmlString(project.fields.wireframes),
        finalPhoto: `http:${project.fields.finishedProductPhoto.fields.file.url}`,
        finalDescription: documentToHtmlString(project.fields.finishedProductDescription)


      };
      // load the template for this item from a local file
      fetch('projectPage.mustache')
        .then(response => response.text())
        .then(template => {
          // render the template with the data
          const rendered = Mustache.render(template, projectData);
          // add the element to the container
          $('.container').append(rendered);
        }
      );
    });
  },

  getAllEntries: function() {
    // fetch all entries
    app.client.getEntries().then(response => {
      // go through each one
      response.items.forEach(project => {
        // pull out the data you're interested in
        const projectData = {
          title: project.fields.projectName,
          imageUrl: `http:${project.fields.projectPhoto.fields.file.url}`,
          pageURL: `${project.fields.urlText}.html`
        };
        // load the template for this item from a local file
        fetch('projectOnHome.mustache')
          .then(response => response.text())
          .then(template => {
            // render the template with the data
            const rendered = Mustache.render(template, projectData);
            // add the element to the container
            $('.container').append(rendered);
          }
        );
      });
    });
  }
};

