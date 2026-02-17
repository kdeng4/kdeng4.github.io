// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Growing collection of the cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/plotly/";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/photo-gallery/";
          
        },
      },{id: "post-a-distill-style-blog-post",
        
          title: "a distill-style blog post",
        
        description: "an example of a distill-style blog post and main elements",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/distill/";
          
        },
      },{id: "post-a-post-with-code",
        
          title: "a post with code",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/code/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "projects-pathways-from-online-master-s-in-cs-to-stem-phd-programs",
          title: 'Pathways from Online Master’s in CS to STEM PhD Programs',
          description: "This study explores how a large online master’s program in computer science prepares graduates for STEM PhD programs. By analyzing enrollment data, surveys, and interviews, the research highlights the program&#39;s positive impact on alumni PhD experiences. Key findings include the importance of graduate research and coursework in PhD preparation. The results demonstrate that affordable, online, asynchronous programs can effectively support non-traditional students in pursuing doctoral education. Recommendations are provided for similar programs to enhance research opportunities for PhD-bound students.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Master-to-PhD-Pathway-Study/";
            },},{id: "projects-asl-recognition-with-hidden-markov-models",
          title: 'ASL Recognition with Hidden Markov Models',
          description: "AI system leveraging Hidden Markov Models (HMMs) to recognize American Sign Language gestures from video input with high confidence.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/asl_recognition/";
            },},{id: "projects-job-application-timeline-tracker",
          title: 'Job Application Timeline Tracker',
          description: "Full-featured Android app for tracking job application timelines, built with a comprehensive software development process including design, testing, and documentation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/job_tracker/";
            },},{id: "projects-raven-39-s-progressive-matrices-rpm-agent",
          title: 'Raven&amp;#39;s Progressive Matrices (RPM) Agent',
          description: "AI agent using knowledge-based techniques to solve visual analogy problems from Raven&#39;s Progressive Matrices, achieving 80% accuracy on advanced 3x3 matrices.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/rpm_agent/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
