export type Locale = 'en' | 'ru';

export interface ExperienceItem {
  name: string;
  role: string;
  start: string;
  end: string;
  shortDescription: string[];
}

export interface ProjectItem {
  projectName: string;
  projectDescription: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    experience: string;
    work: string;
    contact: string;
    resume: string;
  };
  hero: {
    greeting: string;
    name: string;
    taglinePrefix: string;
    taglineHighlight: string;
    descPart1: string;
    descHighlight1: string;
    descPart2: string;
    descHighlight2: string;
    descPart3: string;
    descHighlight3: string;
    descPart4: string;
    descHighlight4: string;
    descPart5: string;
    descHighlight5: string;
    descPart6: string;
    connectLinkedIn: string;
    viewProjects: string;
  };
  about: {
    title: string;
    intro: string;
    experience: string;
    imageAlt: string;
    imageUnavailable: string;
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  projects: {
    title: string;
    topProject: string;
    viewProject: string;
    github: string;
    items: ProjectItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    text: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    sendMessage: string;
    success: string;
    error: string;
  };
  common: {
    scrollToTop: string;
    loading: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    meta: {
      title: "Andres's Portfolio",
      description: 'Andres Bonilla — Full-Stack Developer',
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      work: 'Work',
      contact: 'Contact',
      resume: 'Resume',
    },
    hero: {
      greeting: "Hello, I'm",
      name: 'Andres Bonilla.',
      taglinePrefix: 'I build ',
      taglineHighlight: 'things for the web',
      descPart1: "I'm a ",
      descHighlight1: 'Full-Stack Developer',
      descPart2: ' specializing in ',
      descHighlight2: 'responsive web applications',
      descPart3: ' RESTful APIs. My expertise includes ',
      descHighlight3: 'React',
      descPart4: ', ',
      descHighlight4: 'Node.js',
      descPart5: ', ',
      descHighlight5: 'C#',
      descPart6: ', modern JavaScript, and performance optimization.',
      connectLinkedIn: 'Connect on LinkedIn',
      viewProjects: 'View Projects',
    },
    about: {
      title: 'About Me',
      intro:
        "Hi, I'm Andres. I've been working as a web developer for over three years, building both front-end and back-end applications. I work a lot with HTML, CSS, and JavaScript, and I'm comfortable using frameworks like React and Vue.js to bring ideas to life. On the server side, I work with Node.js and C#, which lets me build dynamic, responsive apps that actually solve what clients need.",
      experience:
        "I'm passionate about writing clean, maintainable code and thrive in collaborative environments where I can contribute to both technical solutions and product strategy. Whether it's troubleshooting complex issues or implementing new features, I approach every challenge with a detail-oriented mindset and a commitment to delivering high-quality results.",
      imageAlt: 'Andres Bonilla - Front End Developer',
      imageUnavailable: 'Image unavailable',
    },
    experience: {
      title: "Where I've Worked",
      items: [
        {
          name: "Q'allta Software",
          role: 'Full Stack Developer',
          start: 'July 2021',
          end: 'February 2025',
          shortDescription: [
            'Developed full-stack solutions across diverse projects, initially building industrial management systems with C#, then ensuring quality as QA Engineer for the same platform',
            'Created responsive front-ends for web applications including an Airbnb-like marketplace using Vue.js, Vuetify and Tailwind CSS, delivering intuitive user experiences.',
            'Built interactive features for a blockchain gaming platform using Next.js, optimizing performance for real-time crypto transactions',
          ],
        },
        {
          name: 'Multigym',
          role: 'Front End Developer',
          start: 'October 2019',
          end: 'February 2020',
          shortDescription: [
            'Architected and implemented the front-end of the website.',
            'Performed preventive maintenance of the lab computers.',
            'Put into practice my knowledge in research and web development areas.',
          ],
        },
        {
          name: 'Universidad Tecnológica Privada de Santa Cruz',
          role: 'Teaching Assistant',
          start: 'February 2018',
          end: 'February 2019',
          shortDescription: [
            'Helped teachers and students providing technical support in the systems labs.',
            'Performed preventive maintenance of the lab computers.',
            'Put into practice my knowledge in research and web development areas.',
          ],
        },
      ],
    },
    projects: {
      title: "Some Things I've Built",
      topProject: 'Top Project',
      viewProject: 'View Project',
      github: 'GitHub',
      items: [
        {
          projectName: 'TesloShop',
          projectDescription:
            'Full-stack e-commerce application built with React + TypeScript, developed as part of my React course by Fernando Herrera. TesloShop includes a public shopping interface and an admin dashboard for managing products, authentication, and roles. It uses TanStack Query for data fetching, Zustand for state management, and a NestJS backend with PostgreSQL (Neon) for persistent storage.',
        },
      ],
    },
    contact: {
      title: "What's Next?",
      subtitle: 'Get In Touch',
      text: "I'm always looking for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sending: 'Sending...',
      sendMessage: 'Send Message',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
    },
    common: {
      scrollToTop: 'Scroll to top',
      loading: 'Loading...',
    },
  },
  ru: {
    meta: {
      title: 'Портфолио Андреса',
      description: 'Андрес Бонилья — Full-Stack разработчик',
    },
    nav: {
      about: 'Обо мне',
      experience: 'Опыт',
      work: 'Работы',
      contact: 'Контакты',
      resume: 'Резюме',
    },
    hero: {
      greeting: 'Привет, я',
      name: 'Андрес Бонилья.',
      taglinePrefix: 'Я создаю ',
      taglineHighlight: 'веб-приложения',
      descPart1: 'Я ',
      descHighlight1: 'Full-Stack разработчик',
      descPart2: ', специализируюсь на ',
      descHighlight2: 'адаптивных веб-приложениях',
      descPart3: ' и RESTful API. Мой стек включает ',
      descHighlight3: 'React',
      descPart4: ', ',
      descHighlight4: 'Node.js',
      descPart5: ', ',
      descHighlight5: 'C#',
      descPart6: ', современный JavaScript и оптимизацию производительности.',
      connectLinkedIn: 'Связаться в LinkedIn',
      viewProjects: 'Смотреть проекты',
    },
    about: {
      title: 'Обо мне',
      intro:
        'Привет, я Андрес. Более трёх лет работаю веб-разработчиком, создавая как фронтенд, так и бэкенд приложения. Много работаю с HTML, CSS и JavaScript, уверенно использую фреймворки React и Vue.js для воплощения идей. На серверной стороне работаю с Node.js и C#, что позволяет мне создавать динамичные, отзывчивые приложения, решающие реальные задачи клиентов.',
      experience:
        'Увлечён написанием чистого, поддерживаемого кода и комфортно чувствую себя в командной работе, где могу вносить вклад как в технические решения, так и в продуктовую стратегию. Будь то устранение сложных проблем или реализация новых функций — подхожу к каждой задаче с вниманием к деталям и стремлением к высокому качеству.',
      imageAlt: 'Андрес Бонилья — Front End разработчик',
      imageUnavailable: 'Изображение недоступно',
    },
    experience: {
      title: 'Где я работал',
      items: [
        {
          name: "Q'allta Software",
          role: 'Full Stack разработчик',
          start: 'Июль 2021',
          end: 'Февраль 2025',
          shortDescription: [
            'Разрабатывал full-stack решения для различных проектов: сначала создавал системы промышленного управления на C#, затем обеспечивал качество как QA-инженер на той же платформе',
            'Создавал адаптивные фронтенды для веб-приложений, включая маркетплейс по типу Airbnb на Vue.js, Vuetify и Tailwind CSS, обеспечивая интуитивный пользовательский опыт.',
            'Разрабатывал интерактивные функции для блокчейн-игровой платформы на Next.js, оптимизируя производительность для транзакций в реальном времени',
          ],
        },
        {
          name: 'Multigym',
          role: 'Front End разработчик',
          start: 'Октябрь 2019',
          end: 'Февраль 2020',
          shortDescription: [
            'Спроектировал и реализовал фронтенд веб-сайта.',
            'Выполнял профилактическое обслуживание компьютеров в лаборатории.',
            'Применял знания в области исследований и веб-разработки.',
          ],
        },
        {
          name: 'Universidad Tecnológica Privada de Santa Cruz',
          role: 'Ассистент преподавателя',
          start: 'Февраль 2018',
          end: 'Февраль 2019',
          shortDescription: [
            'Помогал преподавателям и студентам, оказывая техническую поддержку в компьютерных лабораториях.',
            'Выполнял профилактическое обслуживание компьютеров в лаборатории.',
            'Применял знания в области исследований и веб-разработки.',
          ],
        },
      ],
    },
    projects: {
      title: 'Некоторые мои проекты',
      topProject: 'Лучший проект',
      viewProject: 'Смотреть проект',
      github: 'GitHub',
      items: [
        {
          projectName: 'TesloShop',
          projectDescription:
            'Full-stack e-commerce приложение на React + TypeScript, разработанное в рамках курса React от Fernando Herrera. TesloShop включает публичный интерфейс магазина и админ-панель для управления продуктами, аутентификацией и ролями. Использует TanStack Query для загрузки данных, Zustand для управления состоянием и NestJS бэкенд с PostgreSQL (Neon) для хранения данных.',
        },
      ],
    },
    contact: {
      title: 'Что дальше?',
      subtitle: 'Связаться со мной',
      text: 'Я всегда открыт для новых возможностей, и моя почта всегда доступна. Есть вопрос или просто хотите поздороваться — постараюсь ответить как можно скорее!',
      namePlaceholder: 'Ваше имя',
      emailPlaceholder: 'Ваш email',
      messagePlaceholder: 'Ваше сообщение',
      sending: 'Отправка...',
      sendMessage: 'Отправить сообщение',
      success: 'Сообщение успешно отправлено!',
      error: 'Не удалось отправить сообщение. Попробуйте ещё раз.',
    },
    common: {
      scrollToTop: 'Наверх',
      loading: 'Загрузка...',
    },
  },
};
