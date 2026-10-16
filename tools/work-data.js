// Case studies for /work/<slug>/ — describe only what is verifiably on each live site.
// `thumb`: optional local screenshot; otherwise a live screenshot is used.
// `related`: landing page slugs from tools/pages-data.js.
module.exports = [
  {
    slug: 'third-eye-social',
    name: 'Third Eye Social',
    url: 'https://thirdeye.social/',
    industry: 'AI Automation Agency',
    thumb: '/assets/work/thirdeye.svg',
    summary: 'A bold, dark-themed website for an AI automation agency that helps businesses deploy AI agents across sales, support, finance, HR and operations.',
    client: 'Third Eye Social builds AI agents that automate repetitive work for mid-size and large businesses in healthcare, finance, insurance, manufacturing, real estate and e-commerce.',
    goals: [
      'Explain a complex offer (AI agents) simply to business decision-makers',
      'Show the range of agent types and industry use cases',
      'Build credibility with case studies and client testimonials',
      'Turn visitors into booked calls',
    ],
    built: [
      'Striking dark design with orange accents and animated headline treatment',
      'Use case sections for each agent type: customer service, sales, finance, HR, legal, marketing and lead generation',
      'Case study cards and client testimonials',
      'FAQ section addressing common concerns about adopting AI',
      'Insights (blog) section for thought leadership',
      '"Book a Call" calls to action throughout, plus WhatsApp',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The site is one long homepage with four menu items, What We Do, Use Cases, Case Studies and Insights, each jumping to its own section. The hero leads with the outcome rather than the technology, \"Smarter Scaling, Smaller Workforce, Leverage AI Agents\", followed by a promise of double the output in half the time. The page then runs through the agent types, the company's mission, recent automations, case studies, testimonials, a FAQ and recent articles, and closes with \"Let's Build Your AI Workforce\".",
          "Case studies and articles are the only separate pages. Each case study has its own URL and a heading that names the process and the type of client: vendor onboarding for an LED lights manufacturing plant, loan application processing for an NBFC in Delhi, and claims processing for a hospital in Bangalore. Each one ends with links to the other case studies and the same closing call to action."
        ]
      },
      {
        "h": "Explaining AI agents to business decision-makers",
        "p": [
          "\"AI agent\" means little to most operations heads, so the What We Do section, headed \"Automating tasks, one industry at a time\", breaks the offer into twelve agent types: problem solver, customer service, insurance, operations, sales, finance, management, HR, legal, marketing, healthcare and lead generation. Each card has an animated illustration and one line on the work the agent takes over, such as ticketing and drafting replies for customer service, invoice processing and expense tracking for finance, or screening candidates and scheduling interviews for HR.",
          "The cards also name the software each agent works with: Zendesk, Freshdesk and Intercom for customer service, HubSpot, Salesforce and Pipedrive for sales, SAP, Oracle and Airtable for operations, and QuickBooks, Xero and NetSuite for finance. A decision-maker can see straight away whether the tools their team already uses are on the list, which is one of the first practical questions about bringing in AI.",
          "A \"Recent Automations\" strip then names jobs the agency says it has implemented, including vendor onboarding, loan processing, complaint management, insurance requests and replacement management. These turn abstract agent types into processes a reader recognises from their own business."
        ]
      },
      {
        "h": "Proof, objections and booking a call",
        "p": [
          "Every case study follows the same structure: a \"Key Outcomes\" summary first, then the challenge, the solution, implementation details, the results and a conclusion. The vendor onboarding study, for example, explains how separate contract, compliance and setup agents divide the work, and sets out the implementation phases from design to staff training. A sceptical buyer gets the headline figures on the first screen and the detail underneath.",
          "Each testimonial gives the person's name and company, including Kailash Hospitals, Vansh Electromechanical Devices and Rare Rabbit, and the founder adds a short quote of his own. The FAQ takes on the objections a cautious business raises: whether agents are hard to integrate for a company that is not tech-savvy, how they reduce operating costs, how they handle lead generation and follow-ups, how to make sure an agent follows the right instructions, and how to tell whether agents suit a particular business.",
          "Every route ends in a conversation. \"Book A Call\", \"Let's Talk\" and \"Reach Out\" buttons appear throughout the page, and the booking buttons open a WhatsApp chat, so a visitor can start talking to the team from a phone without filling in a form. For readers who want more depth first, the Insights section has articles on subjects such as OpenAI's Operator and the differences between RAG, Graph RAG and KAG."
        ]
      },
      {
        "h": "What other agencies and B2B service firms can take from this",
        "p": [
          "If your offer is technical, break it into the jobs it does for each department and name the software it connects to. That tells a buyer more than a paragraph about capabilities. Lead with the business outcome in the headline and leave the technical detail to the cards and case studies.",
          "Write every case study in the same order, with outcomes first, and give each one its own page with the client type and the process in the heading. Answer integration and control worries in a FAQ, and if your buyers are happy to chat, let \"Book a Call\" open WhatsApp. This site does that with WordPress, Elementor, the Hello Elementor theme and Yoast SEO."
        ]
      }
    ],
    reading: ["write-case-studies-business-website","website-for-it-software-companies","whatsapp-on-business-website","faq-page-seo","write-service-pages-that-convert"],
    stack: ['WordPress', 'Elementor', 'Hello Elementor theme', 'Yoast SEO'],
    related: ['wordpress-developer-for-agencies', 'website-for-startups', 'elementor-developer'],
  },
  {
    slug: 'vansh-group',
    name: 'Vansh Group',
    url: 'https://vansh.group/',
    industry: 'Electronics Manufacturing (OEM)',
    metaDescription: 'Case study: a professional B2B website for an electronics OEM, presenting product development services, infrastructure and brand partnerships.',
    summary: 'A professional B2B website for an electronics OEM with decades of experience, presenting its product development services, infrastructure and brand partnerships.',
    client: 'Vansh is an electronics original equipment manufacturer offering end-to-end product development and manufacturing from facilities in North India, serving well-known electrical and lighting brands.',
    goals: [
      'Present a wide range of engineering and manufacturing services clearly',
      'Prove capability to large B2B buyers',
      'Make it easy for prospects to enquire about a specific service',
      'Support credibility with a downloadable company profile',
    ],
    built: [
      'Services section covering PCB and circuit development, electrical appliance development, sheet metal, injection moulded parts and tool & die development',
      'Infrastructure and About sections showcasing facilities and experience',
      'Client and brand testimonial carousel',
      'Contact form with a service-type dropdown so enquiries arrive pre-qualified',
      'Company profile download and prominent phone and email calls to action',
      'Insights blog for industry articles',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "Most of the site's substance sits on one long homepage. The menu offers Home, Services, About Us, Infrastructure, Products and Insights, and apart from Services each item jumps to a section of that page instead of opening a new one. A buyer can scroll from the rotating hero, which carries \"Company Since 1996\" on every slide, through manufacturing capabilities, services, company background, leadership, the product portfolio, client testimonials and recent articles, and finish at the enquiry form.",
          "The five services sit near the top as cards: PCB and circuit development, electrical appliance development, sheet metal product development, injection moulded part development, and tool and die development. Each card has one line on what the service covers, such as design, prototyping and assembly for smart devices on the PCB card, or custom moulds, dies and rapid prototyping on the tool and die card. A procurement team can see the whole range on one screen before deciding which conversation to start."
        ]
      },
      {
        "h": "Proving capability to large B2B buyers",
        "p": [
          "Large buyers want to know whether a supplier makes things itself or subcontracts them, so the first section after the hero is headed \"Comprehensive In-House Manufacturing Capabilities\" and names a tool room, power press machines, an SMT room and injection moulding machines. The About section adds more than 25 years of experience, three manufacturing units in Northern India and a headquarters in Kundli Industrial Area, Haryana, about five minutes from the Delhi border.",
          "A \"Why Choose Us\" block links those facilities to what a buyer worries about, in three short points: in-house technology means no delays caused by vendor dependencies, owning the infrastructure removes third-party costs from the price, and the company works to regulatory requirements for global markets. A leadership section introduces the managing director, the directors responsible for finance, fixtures and finished goods, and the marketing head, so a buyer can see who runs the business.",
          "The testimonial carousel gives the name, job title and company of each person quoted, and the companies are established electrical and lighting brands: Sturlite, Crompton, Polycab, Goldmedal and Signify. A grid of client logos follows, showing a buyer that the supplier already works with companies of a similar size."
        ]
      },
      {
        "h": "Enquiries, downloads and insights",
        "p": [
          "The contact section, headed \"Contact With Us\", asks for contact details, the service the enquiry is about and a message. The service dropdown offers product development, PCB development, part development and tool development, so every enquiry arrives already tagged with the kind of work the buyer needs and can be passed to the right person without a round of clarifying emails.",
          "B2B buyers often need something to share internally before they get in touch. A \"Click here to download our company profile\" block offers the 2025 company profile as a PDF, and the product portfolio section links to two catalogues, one for LED fixtures and one for complete LED lights made as an OEM. The phone number, email address and Kundli address appear together in a contact block beside the form and again at the foot of the page, and the email address opens a new message when clicked.",
          "The Insights section shows recent articles on the homepage, on subjects such as India's growth as an electronics exporter, how companies are diversifying supply chains in response to trade tariffs, and what to check on a factory visit before signing with an OEM. These are the questions a sourcing manager asks early in a search, and the articles end by inviting readers to arrange a consultation and a tour of the facility."
        ]
      },
      {
        "h": "What other manufacturers can take from this",
        "p": [
          "Name your machines and facilities instead of describing them in general terms: a tool room, an SMT room and moulding machines tell a buyer more than \"state-of-the-art infrastructure\". Say how many units you run and where they are, show testimonials with the person's name, title and company, and introduce the people who run the business.",
          "Add a service dropdown to your enquiry form so requests arrive sorted, and offer your company profile and catalogues as downloads, because the person who finds your website is often not the person who approves a new supplier. Keep the full list of services on the homepage so nobody has to hunt for it. This site does that with WordPress, Elementor and the Arkito theme."
        ]
      }
    ],
    reading: ["b2b-manufacturer-website-guide","rfq-forms-b2b-websites","industrial-website-product-catalogue","seo-for-pdfs-brochures","website-trust-signals-checklist"],
    stack: ['WordPress', 'Elementor', 'Arkito theme'],
    related: ['website-for-manufacturers', 'website-redesign', 'wordpress-seo-services'],
  },
  {
    slug: 'india-automation-hub',
    name: 'India Automation Hub',
    url: 'https://indiaautomationhub.com/',
    industry: 'Industrial Automation Media',
    summary: 'A content-rich news and resource portal for India\'s industrial automation community, covering robotics, control systems and Industry 4.0.',
    client: 'India Automation Hub publishes news, special reports, webinars and thought leadership for automation professionals, engineers, plant managers and technology vendors.',
    goals: [
      'Organise a large volume of technical content so readers can find topics quickly',
      'Grow a subscriber base for newsletters and reports',
      'Give vendors and advertisers a credible, professional platform',
    ],
    built: [
      'Magazine-style layout with clear visual hierarchy and thumbnails',
      'Deep category structure: control systems (PLC, DCS, SCADA), robotics, IIoT, OT cybersecurity, sensors and more',
      'Sections for industry roundups, special reports, webinars and leadership moves',
      'Newsletter subscribe form and site-wide search',
      'Recent posts widgets and category filtering',
      'Social integration including LinkedIn and podcast links',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The homepage reads like the front page of a trade magazine. A Featured block of three stories leads into the Industrial Automation Roundup, Industry News, Editor's Picks, Recent Articles, Industry Leadership Moves and Popular sections, each laid out with thumbnails, headlines and bylines so a reader can scan the latest news in seconds. The tagline describes the site as covering industrial automation, robotics and smart manufacturing.",
          "The main menu stays short: Automation & Tech, Products & Solutions, Industry Roundup, Special Reports, Contact and Webinar. Special Reports presents the Industrial Automation Review as a flipbook, Webinar collects session write-ups, and the About page explains who the site is for (manufacturers, plant leaders, automation professionals, technology buyers, OEMs, system integrators and technology providers) and what each of its platforms offers, from the website and newsletter to webinars, podcasts and industry reports."
        ]
      },
      {
        "h": "Making a large technical archive easy to browse",
        "p": [
          "The real organising work is in the Automation & Tech menu, which groups the subject into six families, each with its own subcategories. Control Systems & Automation covers PLC, DCS, SCADA and HMI, control architectures and safety systems; Machines & Robotics covers industrial robots and robotic cells; Industrial Software & Data covers AI in manufacturing, predictive maintenance, MES, digital twins and simulation. Connectivity & IIoT, Cybersecurity (OT security) and Industrial Components & Technologies, from sensors and machine vision to motion control, complete the set, while Products & Solutions adds factory, warehouse and logistics, process and smart factory automation.",
          "Each category has its own archive page, so a control engineer can go straight to articles such as a comparison of DCS and PLC for refinery, pharma and chemical plants, or a piece on centralised versus distributed control in Indian smart factories, without wading through robotics news. Each archive shows how many articles it holds, and every post card carries a thumbnail, a category tag and the author's name.",
          "Readers who know what they want can use the site-wide search, and the sidebars repeat Latest, Popular and an \"Explore IAH\" list of category links, so a reader who finishes one article always has the next one in view."
        ]
      },
      {
        "h": "Newsletter, webinars and a platform for vendors",
        "p": [
          "Growing a subscriber base was one of the main goals, so the newsletter appears in several places: \"Subscribe to Updates\" and \"Join Our Newsletter\" blocks on the homepage and in the sidebars, and \"Join the inner circle. Stay in the know.\" on the contact page. The About page tells readers what they will receive: industry news, product launches and leadership moves.",
          "Webinar write-ups, the Special Reports flipbook and a podcast on Spotify give the site formats beyond daily news. A webinar banner in the archive sidebars links to a recording on YouTube, and Facebook, LinkedIn and Spotify links appear on every page.",
          "For vendors and advertisers, the contact page separates editorial outreach and product releases, which go to the editor's address, from advertising and general queries, which go to the main address or the form, and promises a reply within one business day. The About page adds routes for companies to join the site's listing and to collaborate on campaigns, so a technology provider can see how to get involved before writing in."
        ]
      },
      {
        "h": "What other industry publishers can take from this",
        "p": [
          "If you publish a lot of technical content, design the category tree before the homepage. Group subjects the way your readers think about their work, give every subcategory its own archive, and show the category tag on every post card so readers can move sideways to related articles.",
          "Ask for newsletter sign-ups in more than one place, say exactly what subscribers will get, and give vendors a separate, clearly labelled route for press releases and advertising. This site does that with WordPress, Elementor, the Newsfy theme and Yoast SEO."
        ]
      }
    ],
    reading: ["news-magazine-websites-wordpress","category-tag-pages-seo","email-newsletter-small-business","improve-wordpress-site-search","topic-clusters-pillar-pages"],
    stack: ['WordPress', 'Elementor', 'Newsfy theme', 'Yoast SEO'],
    related: ['website-for-manufacturers', 'wordpress-speed-optimization', 'wordpress-seo-services'],
  },
  {
    slug: 'streak-creative',
    name: 'Streak Creative',
    url: 'https://streakcreative.in/',
    industry: 'Growth Marketing Agency',
    thumb: '/assets/work/streakcreative.svg',
    summary: 'A modern, editorial website for a growth marketing agency, built around its proprietary LOOP methodology and industry-specific offers.',
    client: 'Streak Creative builds repeatable growth systems for category leaders in e-commerce, real estate and B2B manufacturing, combining strategy, AI-driven creativity and performance.',
    goals: [
      'Position the agency as a premium, systems-driven partner',
      'Explain the LOOP methodology and services clearly',
      'Capture leads with a blueprint offer and a newsletter',
      'Showcase case studies and industry expertise',
    ],
    built: [
      'Editorial design with serif headlines, bold red accents and 3D imagery',
      'Service navigation for strategy, production and distribution',
      'Dedicated LOOP methodology pages with industry-specific applications',
      'Case studies, About and the Streak Journal blog',
      '"Streak Signals" newsletter sign-up and "Get Your LOOP Growth Blueprint" lead magnet',
      'Clear "Let\'s Talk" calls to action',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The menu is built around how the agency wants to be understood. Our Services opens Strategy, Production and Distribution; LOOP opens versions of the methodology for e-commerce, real estate and B2B manufacturing; SIGNALS opens newsletter sections for the same three industries; and Case Studies, About and Blog sit alongside, with a \"Let's Talk\" button at the end. A visitor from any of the three industries is one click from a page written for them.",
          "The homepage opens with \"The Growth Engine That Never Stops Learning\" and a line naming the three industries the agency serves, followed by a strip of client logos under \"Trusted by category leaders\". It then moves through an introduction to LOOP, the agency's capabilities and its three services, and ends with \"Let's Collaborate\", the Streak Signals sign-up and the Bengaluru office address, email and phone number."
        ]
      },
      {
        "h": "Explaining the LOOP methodology",
        "p": [
          "A proprietary methodology only helps if a buyer can follow it, so the homepage breaks LOOP into four steps with one line each: Listen (category immersion and data analysis), Organize (finding growth levers and setting priorities), Optimize (rapid creative iteration and testing) and Perform (launching campaigns that drive revenue). A \"See how the LOOP works\" link leads to the full methodology page.",
          "That page, headed \"The Playbook That Powers Category Growth From Insight to Impact\", sets LOOP out as three phases, each with an Approach and an Outcome. Strategic Category Reports study platform trends, consumer behaviour and pricing to produce a Category Growth Blueprint; Always-on Storefronts refresh banners, themes and layouts every 15 days in line with sales calendars; and an AI-Powered Creative Studio produces product and campaign visuals from a brand's existing product images. Splitting each phase into what the agency does and what the client gets keeps a long process easy to read."
        ]
      },
      {
        "h": "Industry pages, proof and lead capture",
        "p": [
          "Each industry gets its own LOOP page. The e-commerce version opens with the promise to \"Turn Scrolls into Repeat Orders\" and follows a numbered Problem, Solution, Proof structure: rising acquisition costs and flat repeat purchases, then LOOP as 30-day cycles of AI-assisted creative that is tested and scaled weekly, then examples from named campaigns. It spells out three deliverables, creative operations, performance media and retention systems, and ends with an invitation to book a 30-day growth and LTV audit.",
          "The Case Studies page, headed \"Proof That LOOP Works.\", shows projects as a grid of cards, each with an image, a one-line summary and category tags, and filter buttons above the grid narrow it to branding, e-commerce or real estate work. A brand manager can see projects from their own sector first, and every card opens a full case study page.",
          "Two offers serve visitors who are not ready to talk yet. \"Get Your LOOP Growth Blueprint\" leads to its own request form, and Streak Signals is described as a monthly brief of category-specific growth strategies, data-backed trends and playbooks, with separate article sections for e-commerce, real estate and manufacturing. Both sit beside the \"Let's Talk\" buttons rather than replacing them, so the site can capture interest at different levels of commitment."
        ]
      },
      {
        "h": "What other marketing agencies can take from this",
        "p": [
          "If you sell a methodology, explain it twice: a short version on the homepage that fits on one screen, and a full page that shows what you do and what the client gets at each stage. Then give each industry you serve its own page, with the problem, your approach and your proof in that order.",
          "Let visitors filter case studies by sector, and offer something between \"read the blog\" and \"book a call\", such as a blueprint or an industry newsletter, for people who are interested but not ready to talk. This site does that with WordPress, Elementor, the Ohio theme and Yoast SEO."
        ]
      }
    ],
    reading: ["website-for-digital-marketing-agencies","lead-magnets-newsletter-small-business","write-case-studies-business-website","write-service-pages-that-convert","email-newsletter-small-business"],
    stack: ['WordPress', 'Elementor', 'Ohio theme', 'Yoast SEO'],
    related: ['wordpress-developer-for-agencies', 'figma-to-wordpress', 'landing-page-design'],
  },
  {
    slug: 'our-temples',
    name: 'Our Temples',
    url: 'https://ourtemples.info/',
    industry: 'Temple Directory & Travel Guide',
    summary: 'A large directory and travel guide of Hindu temples across India and abroad, searchable by state and by deity, with videos, slokas and a blog.',
    client: 'Our Temples helps devotees, pilgrims and travellers discover temples and plan visits, with hundreds of temples catalogued across Indian states and international destinations.',
    goals: [
      'Organise hundreds of temple listings so visitors can browse easily',
      'Let people search by location and by deity',
      'Build a community around videos, slokas and festival guides',
      'Allow temple owners and guests to register',
    ],
    built: [
      'Directory structure with temples by state and by deity (25+ deity categories)',
      'Search and browse by location, deity or state',
      '"Recently added" temples with photos',
      'Videos and slokas/mantras sections',
      'Blog with festival guides and pilgrimage routes',
      'User login and registration for guests and temple owners, and multilingual (Telugu) content',
    ],
    sections: [
      {
        "h": "How the directory is organised",
        "p": [
          "The homepage opens with the line \"Discover amazing temples everywhere you go\" and then offers three ways into the directory. \"Explore Temples by Deity\" shows a grid of deity cards, each with the number of temples listed under it; \"Explore Temples In India\" shows a card for each state with its own count; and \"Explore Temples In Other Countries\" covers listings abroad, starting with Thailand. A \"Recently Added Temples\" strip with photos sits between them, so returning visitors can see what is new.",
          "The main menu repeats those routes, with Temples, Temples by Deity and Temples by States alongside Videos, Sloka / Mantra, About Us and Contact, plus a Destinations dropdown that lists each state. The deity list runs to 25 categories, from Lord Shiva, Lord Hanuman and Venkateshwara to Durga Mata and Sai Baba, because devotees often look for a temple by the deity they want to visit as much as by place."
        ]
      },
      {
        "h": "Finding and planning a temple visit",
        "p": [
          "Each deity and each state has its own archive. The Lord Shiva archive, for example, shows how many results it holds, then paginated cards with a photo, the temple's name and address and a link to its state. Visitors can narrow the list by neighbourhood or state, use a \"Near Me\" option, sort by newest, rating or featured listings, or switch to a map view, which helps a pilgrim plan several temples into one trip.",
          "Single temple pages answer a visitor's practical questions in a fixed order. They open with a photo gallery and the address, then show a map with directions, contact details, travel highlights such as the nearest airport, bus, train, taxi and parking, and opening hours with an \"Open now\" status. A More Information block covers temple history, sub-temples, things to see, dress code, pooja details, festivals, a travel guide and announcements, and a short FAQ answers questions such as how to reach the temple. Similar places close the page."
        ]
      },
      {
        "h": "Content, community and languages",
        "p": [
          "Content around the listings gives people a reason to come back between trips. The blog publishes festival guides that gather temples for an occasion, such as Shiva temples for Maha Shivaratri, Ganesh Chaturthi temples in Hyderabad, Surya temples for Ratha Saptami and the Pancharama Shiva temples of Andhra Pradesh, along with a general guide to temples by state and deity.",
          "The site is not limited to English. The Sloka / Mantra page presents the Hanuman Chalisa, Aditya Hridayam and Dakshinamurthy Stotram in Telugu script, temple pages give the temple name and sections such as history, pooja details and festivals in Hindi and Telugu as well as English, and a Telugu-language article on Ranganatha temples for Vaikunta Ekadasi sits among the English posts.",
          "Visitors can register as a guest or as a temple owner, and log in from any page through a popup. The footer links to the project's Instagram, Facebook, YouTube, Telegram and X accounts and its WhatsApp channel, and lists separate email addresses for general and business enquiries."
        ]
      },
      {
        "h": "What other directory websites can take from this",
        "p": [
          "Decide how people will search before building the directory, and give each route its own archive: here that means deity, state and country, each with a visible count so visitors know how much they will find. Add filters, sorting and a map view to any archive with more than a page of results.",
          "Use one template for every listing so each entry answers the same questions, such as timings, directions, dress code and festivals, and publish occasion-based guides that send readers back into the directory. If your audience reads more than one language, put it in the listings themselves, not just the menu. This site does that with WordPress, Elementor, the Golo directory theme and Rank Math SEO."
        ]
      }
    ],
    reading: ["directory-website-wordpress","temple-ngo-website-online-donations","multilingual-wordpress-website-hindi-english","seasonal-festival-campaigns-website","category-tag-pages-seo"],
    stack: ['WordPress', 'Elementor', 'Golo directory theme', 'Rank Math SEO'],
    related: ['website-for-temples-and-ngos', 'wordpress-seo-services', 'hotel-website-design'],
  },
  {
    slug: 'dr-sudhir-arora',
    name: 'Dr. Sudhir Arora',
    url: 'https://drsudhirarora.com/',
    industry: 'Healthcare & Wellness',
    summary: 'A personal-brand website for an experienced doctor offering mind-body wellness education, online consultations and structured coaching programs.',
    client: 'Dr. Sudhir Arora (MBBS) offers an educational, non-medicinal approach to managing stress, anxiety, anger and negative thinking, mainly for busy professionals and business owners.',
    goals: [
      'Build trust with a clear profile, credentials and experience',
      'Explain each life challenge the programs address',
      'Engage visitors with a free self-assessment',
      'Convert visitors into consultations and course enrolments',
    ],
    built: [
      'Doctor profile with qualifications and registration details',
      'Pages for each life challenge: anxiety, stress, anger, depression, fears, negative thinking and low confidence',
      'Free anxiety self-assessment tool',
      'Online consultation and personal counselling pages',
      'Life coaching program pages with course structure',
      'Blog and contact page',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The menu starts from the visitor's problem. \"Your Anxiety Score\" sits right after Home, and \"Life Challenges We Address\" opens a page for each concern the programmes cover: stress and anxiety, tensions and worries, anger and frustration, extreme and persistent sadness, fears and phobias, negative thinking and overthinking, low confidence and self-doubt, and marriage challenges. Other menu items lead to Online Guidance, the Online Mind Mastery Course (overview, four pillars, and format and schedule), a Google Reviews page, About Us and Contact Us.",
          "The homepage leads with \"Manage Your Stress & Anxiety\" and \"With Personal 1-To-1 Guidance\", then explains the difference between stress and anxiety in everyday terms before listing the life challenges, the benefits of the approach, a five-minute self-test and an introduction to Dr. Arora. A section lists the countries course participants have come from, a reminder that the programmes run online."
        ]
      },
      {
        "h": "Building trust for an educational approach",
        "p": [
          "Busy professionals looking for help with stress want to know who is giving it. The homepage introduces Dr. Sudhir Arora as an MBBS doctor, giving his degree from Maulana Azad Medical College, University of Delhi, in 1979, his registration number and more than 47 years of experience. The About page sets out his no-medicines educational approach, the four pillars of the method (Mind Power, Brain Power, Breath Power and Soul Power) and a core sequence of understanding, training and mastering the mind.",
          "Being clear about what the service is not matters just as much. The About page states that Dr. Arora is not a psychiatrist and that the programme is not a substitute for medical diagnosis, treatment, psychotherapy or psychiatric care, and it advises anyone with serious or persistent symptoms to see a qualified healthcare professional. The challenge pages repeat the point in their FAQs, noting that online guidance is not suitable for serious psychiatric problems or emergencies.",
          "Each challenge page pairs a short, encouraging introduction with a long FAQ and a four-step section on how the approach works: understanding patterns, learning techniques, one-to-one guidance and applying the skills in daily life. The stress page alone answers eleven questions, from what stress is to how online sessions and enrolment work."
        ]
      },
      {
        "h": "From self-assessment to a consultation",
        "p": [
          "Engaging visitors with a free self-assessment was one of the goals. \"Your Stress & Anxiety Score\" asks ten questions one at a time, with a progress indicator and a five-point scale from \"Never\" to \"Very Often\", each option marked with an emoji. The total falls into one of six bands, each with a short interpretation and suggested next steps, and the page states that the score is a self-awareness indicator, not a diagnosis. No contact details are needed to see the result.",
          "From there, every route leads to a conversation. The online consultation page has one clear instruction, to send a WhatsApp message to book, and the link opens WhatsApp with the message already written. A \"WhatsApp us\" button appears on every page, and the Contact Us block gives two phone numbers, an email address, the Shivajinagar, Pune address and hours of 9 AM to 9 PM, seven days a week.",
          "The course page explains the online group sessions, held in Hindi on Saturday mornings and in English on Sunday afternoons, and states that there is a one-time enrolment fee with no monthly or hidden charges, answering a common worry before anyone has to ask."
        ]
      },
      {
        "h": "What other wellness coaches and doctors can take from this",
        "p": [
          "Organise the site around the problems people arrive with, give each one its own page with an FAQ, and offer a short self-assessment that shows a result without asking for an email first. State your qualifications precisely, and be just as clear about what your service does not replace.",
          "If your clients prefer to message, make WhatsApp the booking route and pre-fill the first message so that starting the conversation takes one tap. This site does that with WordPress, Elementor and the Hello Elementor theme."
        ]
      }
    ],
    reading: ["website-for-psychologists-counsellors","website-for-coaches-consultants","website-quiz-lead-generation","personal-brand-website-professionals","whatsapp-on-business-website"],
    stack: ['WordPress', 'Elementor', 'Hello Elementor theme'],
    related: ['wordpress-website-for-doctors', 'landing-page-design', 'wordpress-seo-services'],
  },
  {
    slug: 'dr-sunaina-dental-care',
    name: 'Dr. Sunaina Dental Care',
    url: 'https://drsunainadentalcare.com/',
    industry: 'Dental Clinic',
    summary: 'A warm, trust-focused website for a dental clinic and implant centre in Agra, built to explain treatments clearly and turn visitors into booked appointments.',
    client: 'Dr. Sunaina Dental Care & Implant Center is a dental clinic in Rajpur Chungi, Agra, offering teeth cleaning and whitening, braces and clear aligners, root canal treatment, implants, crowns and full mouth rehabilitation for patients of all ages.',
    goals: [
      'Reassure nervous patients with a gentle, personal tone',
      'Explain the main treatments in plain language',
      'Build local trust with patient testimonials and clear clinic information',
      'Make booking an appointment or calling the clinic effortless on mobile',
    ],
    built: [
      'Home page with a clear local headline and "Book Appointment" and contact calls to action',
      'Services page covering cleaning and whitening, braces and aligners, single-sitting root canals, zirconia crowns and bridges, implants and full mouth rehabilitation',
      'About page with the clinic\'s vision, mission and strengths',
      'Patient testimonials and an FAQ section answering common questions about pain, booking and location',
      'Dedicated appointment page plus a contact form',
      'Click-to-chat WhatsApp button, click-to-call phone number and social links',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The navigation is kept to four items, Home, About Us, Services and Contact, with a \"Book Now\" button beside them. The homepage moves from a local headline, \"Expert Dental Care with a Personal Touch in Agra\", to a short introduction to Dr. Sunaina and her team, four treatment cards, patient testimonials, animated counters, an FAQ, a contact form and a \"We're Just a Call Away\" block with the phone number, email address and clinic address.",
          "Every inner page ends the same way, with testimonials, a contact form and the clinic's contact details, so wherever a patient lands they finish next to a way to get in touch. The Services page lists the treatments with a one-line description each and adds the clinic's opening hours, while the About page sets out the clinic's vision and mission in collapsible panels alongside a section on its strengths."
        ]
      },
      {
        "h": "Writing for nervous patients",
        "p": [
          "The brief asked for a gentle, personal tone that would reassure nervous patients, and the copy follows it. The introduction talks about patients feeling at ease from the moment they walk into the Rajpur Chungi clinic, and the treatment section is headed \"Modern, gentle dental care for confident, healthy smiles.\"",
          "Each treatment description answers a practical worry in one sentence: cleaning and whitening in one visit, root canal treatment completed in a single sitting, a choice of metal or invisible braces, zirconia for crowns and bridges, titanium-rooted implants, and removable or fixed options for full mouth rehabilitation. The FAQ tackles the biggest worry head on with \"Is the treatment painful?\", alongside questions about services, booking and location.",
          "Each testimonial names the treatment the patient had, such as a root canal, cleaning and scaling, braces or implants, together with the patient's name and occupation. A visitor weighing up one of those treatments can find someone who has already been through it."
        ]
      },
      {
        "h": "Booking and contact on a phone",
        "p": [
          "Effortless booking on mobile was one of the goals, so the main booking buttons, \"Book Now\" in the header and \"Book Appointment\" in the hero, open a WhatsApp chat with the clinic's number. A \"WhatsApp us\" chat button also appears on every page, so a patient can message the clinic from their phone without filling in a form.",
          "For patients who prefer to write, there is a short form that asks only for name, email and message, and the phone number and email address sit in a contact block that is repeated in the footer. Three fields are quick to complete on a small screen.",
          "The address is written with landmarks: Niramaya Care Centre, behind Gol Market on Takkar Road, opposite Frontline Electrical, in Rajpur Chungi. The FAQ repeats it in answer to \"Where is your clinic located?\", and the homepage copy names both Rajpur Chungi and Agra, which ties the clinic to its neighbourhood for patients and search engines alike. Footer links lead to the clinic's Instagram and YouTube channels, and a clinic video is embedded on the homepage."
        ]
      },
      {
        "h": "What other dental clinics can take from this",
        "p": [
          "Put your city and neighbourhood in the main headline, describe each treatment by what the patient actually wants to know (how many visits, whether it hurts, which material), and answer the pain question directly in an FAQ. Short, plain answers are easier to scan on a phone than a long list of procedures.",
          "If your patients already message you on WhatsApp, make that the main booking button and keep a short form as a backup. Give your address with landmarks, repeat your contact details at the end of every page, and connect each testimonial to a treatment. This site does all of that with WordPress, Elementor and the Hello Elementor theme."
        ]
      }
    ],
    reading: ["website-for-dentists","clinic-website-checklist-for-doctors","whatsapp-on-business-website","online-appointment-booking-website","faq-page-seo"],
    stack: ['WordPress', 'Elementor', 'Hello Elementor theme'],
    related: ['wordpress-website-for-doctors', 'elementor-developer', 'wordpress-seo-services'],
  },
  {
    slug: 'studio-agama-interiors',
    name: 'Studio Agama Interiors',
    url: 'https://interiorstudioagama.com/',
    industry: 'Interior Design Studio',
    summary: 'A visual, lead-focused website for a Hyderabad interior design and turnkey execution studio, showcasing services and projects and driving free quote requests.',
    client: 'Studio Agama Interiors is an interior design studio based in Hyderabad offering modular kitchens and wardrobes, full home turnkey interiors, luxury and commercial interiors, renovations, custom furniture, 3D visualisation and project management, with blog content covering Hyderabad, Vizag and Vijayawada.',
    goals: [
      'Present a wide range of residential and commercial interior services clearly',
      'Let the work speak with an attractive, browsable project gallery',
      'Turn visitors into free quote requests and consultations',
      'Recruit designers and partners through a dedicated page',
      'Build local search visibility in the cities they serve',
    ],
    built: [
      'Home page with service highlights, reasons to choose the studio, testimonials, brand partners and "Get A Free Quote" calls to action throughout',
      'Services covering modular interiors, full home turnkey interiors, luxury, commercial, renovation, room planning, custom furniture, hospitality, 3D visualisation and project management',
      'Project gallery showcasing completed interiors',
      '"Become a Design Partner" page with a partner enquiry form',
      'Blog with location-focused articles for Hyderabad, Vizag and Vijayawada',
      'Contact page with operational and registered addresses and enquiry forms',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The menu is short, About, Services, Become a Design Partner, Contact and Blog, and a \"Get A Free Quote\" button repeats down the homepage. The homepage opens with \"Thoughtfully Designed Interiors\" and goes straight to \"A Single Destination For All Your Interior Needs.\", five headline services: modular, full home, luxury, commercial and renovation interiors. It then moves through the studio's background, its wider range of services, brand partners, testimonials, selected projects, reasons to choose the studio, a note on budgets and a closing \"Let's Work!\" block.",
          "Project images on the homepage are captioned by style and by room, such as \"The Minimalist: Modern Interior\", \"Boho Styles: Sleeping Space\", \"Workspaces: Simplicity\" and \"New Kitchen: Dinner Space\", so a homeowner can see quickly whether the studio's work suits their taste. A gallery of thumbnails follows lower down the page."
        ]
      },
      {
        "h": "Explaining a wide range of interior services",
        "p": [
          "Interior buyers range from someone who needs a new kitchen to a hotel owner, so the Services page, headed \"Your Trusted Partner in Interiors Design to Execution\", covers the five headline services and then eight more: residential design, commercial spaces, room planning, custom furniture and fixtures, interior renovation, hospitality and boutique hotels, 3D visualisation and project management. Each has a short description, such as kitchens, wardrobes and storage built from precision-engineered units for modular interiors.",
          "An FAQ on the same page answers the questions buyers ask when comparing options: the difference between modular and full home interiors, whether one room can be designed without redoing the whole home, whether consultations and quotes are free, how many design revisions are included, how the studio differs from contractors and individual designers, and whether payment can be spread out. A \"Gain the confidence to make the right choice\" section explains that clients see product samples and detailed 3D renderings before work starts.",
          "The About section lists the studio's own points, including more than 100 quality checks, post-project support and factory-precision craftsmanship. A row of brand partner logos and testimonials that each describe a specific job, from a living room and an office to a kitchen and a bedroom on a tight budget, add outside voices."
        ]
      },
      {
        "h": "Quote requests, enquiries and design partners",
        "p": [
          "Turning visitors into quote requests was a central goal, so \"Get A Free Quote\" and \"Book Free Consultation\" appear throughout, and the contact page carries a \"Your Design Enquiry\" form. Beyond name, email, phone and locality, it asks what sort of enquiry it is (a turnkey home project, luxury interiors, commercial or multi-functional spaces, or renovation and space planning), how the person heard about the studio, what stage the project is at, and the budget and time frame.",
          "With those answers the studio can see the type, scale and budget of a job before the first call, and the \"How did you hear about me?\" dropdown, with options such as Google, Facebook ads, Instagram and word of mouth, shows which channels bring enquiries in. The contact page lists the operational address in Madhapur and the registered address in S.R. Nagar, along with phone numbers and separate email addresses, including one for careers.",
          "Recruiting designers and partners has its own page. \"Become a Design Partner\" uses a separate form for name, mobile number, email, project stage and a message, so partnership enquiries do not get mixed up with homeowners asking for quotes. The blog supports local search with articles on residential design trends in Hyderabad, Vijayawada and Vizag, office designs in Hyderabad and Vizag, and common interior design mistakes in Hyderabad."
        ]
      },
      {
        "h": "What other interior designers can take from this",
        "p": [
          "Caption your project photos by style and room so visitors can match your work to their own home, give every service a one-line description, and answer comparison questions in an FAQ: modular or full home, one room or the whole house, how many revisions, and how payment works.",
          "Ask for enquiry type, project stage and budget in your enquiry form so you know what each lead needs before you call, and keep partner and recruitment enquiries on a separate page. This site does that with WordPress, Elementor Pro and the Hello Elementor theme."
        ]
      }
    ],
    reading: ["website-for-interior-designers-architects","website-for-modular-kitchen-companies","multi-step-forms-lead-qualification","local-landing-pages-without-doorway-pages","website-for-3d-visualisation-studios"],
    stack: ['WordPress', 'Elementor Pro', 'Hello Elementor theme'],
    related: ['elementor-developer', 'wordpress-website-development', 'wordpress-seo-services'],
  },
  {
    slug: 'southern-flavours',
    name: 'Southern Flavours',
    url: 'https://southernflavours.co.uk/',
    industry: 'Indian Restaurant (UK)',
    summary: 'A warm, appetite-led website for an Indian restaurant in Solihull, UK, built around table reservations, the menu and its weekend South Indian breakfast buffet.',
    client: 'Southern Flavours is an Indian restaurant on Stratford Road in Shirley, Solihull, serving South and North Indian dishes, from dosas and idli to curries, tandoori specialities and cocktails, with an unlimited South Indian breakfast buffet at weekends.',
    goals: [
      'Make booking a table quick and easy on any device',
      'Showcase signature dishes and the weekend breakfast buffet',
      'Give diners the practical details they look for: address, phone and opening hours',
      'Support online ordering and build a list of regular customers',
    ],
    built: [
      'Home page with the restaurant\'s story, signature dishes and a clear "Table Reservations" call to action',
      'Dedicated weekend breakfast buffet section',
      'Table reservation form with party size and date selection and an instant confirmation message',
      'Menu, gallery and About pages telling the restaurant\'s story',
      'WooCommerce shop and cart for online ordering',
      'Opening hours, address and phone on every page, and a newsletter sign-up',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The menu covers what a diner needs and little else: Home, About Us, Menu, Gallery, Shop, Reservation, Cart and Contact. The homepage opens with \"Welcome to Southern Flavours\" and the line \"Where India Comes to Your Table\", and its two buttons, \"Table Reservations\" and \"Menu & Ordering\", lead straight to the two things most visitors come to do.",
          "Below the hero, the page runs in the order a hungry visitor thinks: the weekend breakfast buffet first, then \"Signature Creations\", then a table booking section headed \"We've Saved You a Seat\", with the address, phone number, email address and opening hours beside it. The About page tells the restaurant's story in short sections, Our Heritage, The Journey and Our Commitment, and describes a menu of dosas, biryanis, curries, tandoori specialities and handcrafted cocktails."
        ]
      },
      {
        "h": "Putting the weekend breakfast buffet first",
        "p": [
          "Showcasing the unlimited South Indian breakfast buffet was one of the goals, so it gets the first section after the hero, headed \"Start Your Day the Southern Way\", with an \"Available Every Weekend\" label and a \"Book Your Breakfast Experience Today\" prompt.",
          "The opening hours spell out the details: buffet breakfast only from 09:30 to 12:00 on Saturday and Sunday, with the restaurant then open until 23:00. Weekday hours, Friday lunch and a note that the kitchen closes 30 minutes before closing time are listed alongside, so a family planning a weekend morning out, or a group booking a weeknight dinner, can check the times without phoning.",
          "Signature Creations shows eight dishes with photos that mix South and North Indian cooking: idli, meddu vada, dosa, channa masala, naan, dal tarka, chilli chicken and saag paneer. Showing both sides of the menu tells a first-time visitor that the restaurant is not only for South Indian food."
        ]
      },
      {
        "h": "Booking a table and ordering online",
        "p": [
          "Quick booking on any device was the first goal, so the reservation form is short: the number of people, from one to eight, and a date. The same form sits on the homepage and on its own Reservation page, and when it is sent the visitor sees \"Reservation received! We'll confirm shortly.\" on the same screen, so they know the request has gone through without waiting for an email.",
          "For orders, the WooCommerce shop lists more than 100 dishes in 13 categories, from dosa, biryani and breads to veg and non-veg starters, main courses, salads and desserts. Each dish shows its price in pounds, a quantity control and an \"Add to Cart\" button, and a cart summary in the header keeps the running total in view.",
          "A newsletter sign-up in the footer offers exclusive offers and culinary insights, giving the restaurant a way to reach regular customers directly rather than relying only on social media or delivery apps."
        ]
      },
      {
        "h": "What other restaurants can take from this",
        "p": [
          "Put your two main actions, booking and ordering, in the hero, and give your most distinctive offer its own section near the top with the days and times spelled out. Show dishes from every part of your menu so first-time visitors know what to expect, and keep your address, phone number and hours next to the booking form.",
          "Keep the reservation form short, confirm the request on screen straight away, and show prices on your online menu. This site does that with WordPress, Elementor, the Hello Elementor theme and WooCommerce."
        ]
      }
    ],
    reading: ["restaurant-website-online-ordering","restaurant-menu-on-website","online-appointment-booking-website","email-newsletter-small-business","own-website-vs-marketplaces"],
    stack: ['WordPress', 'Elementor', 'Hello Elementor theme', 'WooCommerce'],
    related: ['website-for-restaurants', 'woocommerce-developer', 'elementor-developer'],
  },
  {
    slug: 'dr-nitish-gupta-pulmonologist',
    name: 'Dr. Nitish Gupta',
    url: 'https://agrapulmonologist.com/',
    industry: 'Pulmonology Clinic',
    metaDescription: 'Case study: a trust-building WordPress website for an interventional pulmonologist in Agra, with credentials, lung services and appointment booking.',
    summary: 'A detailed, trust-building website for an interventional pulmonologist in Agra, presenting his credentials, chest and lung services and diagnostic facilities, with easy appointment booking.',
    client: 'Dr. Nitish Gupta is a consultant physician and interventional pulmonologist at Niramaya Care Center in Agra, treating lung, chest, allergy and sleep disorders, with services including bronchoscopy, spirometry and sleep studies.',
    goals: [
      'Build trust with a clear doctor profile, qualifications and professional memberships',
      'Explain a wide range of specialised services in patient-friendly language',
      'Help patients find information about specific diseases and procedures',
      'Make booking an appointment or calling the clinic effortless',
    ],
    built: [
      'Doctor profile covering education, past academic role and memberships of national and international chest societies',
      'Services section for chest, sleep, tuberculosis and allergy care, video bronchoscopy, pleural procedures and vaccination',
      'Diagnostics section explaining pulmonary function tests, peak flow monitoring, pulse oximetry, polysomnography, the six-minute walk test and sputum tests',
      'Dedicated Bronchoscopy, Diseases, Gallery, Appointment and Contact sections',
      'Top bar with email, phone and a "Book an Appointment" button on every page',
      'Site search to help patients find information quickly',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The whole site lives on one long homepage. The menu items (About, Service, Bronchoscopy, Gallery, Diseases, Appointment and Contact) jump down to sections of that page instead of opening new ones, so a patient who arrives from a search can scroll from the doctor's introduction to the booking form without waiting for another page to load. The order follows the questions a new patient usually has: who is this doctor, what does he treat, what do the tests involve and how do I book, with reviews, the address, opening hours and a map at the end.",
          "The page opens with the doctor's profile, because building trust with qualifications and memberships was the first goal. It states his MBBS from Wardha University (2012) and MD in Pulmonary Medicine from Gujarat University (2016), his former role as an assistant professor at Dhiraj Hospital in Vadodara, and his membership of the Indian Medical Association, Indian Chest Society, European Respiratory Society, American College of Chest Physicians, American Thoracic Society and Asian Pacific Society of Respirology. A later \"Who are we and our history\" block adds his training in bronchoscopy and sleep apnoea and his work with free camps and charitable hospitals."
        ]
      },
      {
        "h": "Explaining tests, procedures and diseases",
        "p": [
          "Patients often come to a chest specialist after being told they need a test they have never heard of. The services section starts with a quick list (chest, sleep disorders, tuberculosis, allergy, spirometry, video bronchoscopy, pleural tapping, ICD insertion, allergy testing and immunisation, and vaccination), then gives each diagnostic service its own card with a photo, a heading and a short explanation. The cards cover pulmonary function testing, peak flow monitoring, pulse oximetry, BiPAP, CPAP and oxygen therapy rental, pulmonary rehabilitation, polysomnography, the six-minute walk test, sputum tests and vaccination.",
          "The explanations are written for patients, not doctors. The six-minute walk test card says it measures how far a patient can walk on a flat, hard surface in six minutes; the peak flow card explains that patients can use the meter on their own to track asthma or COPD; the pulmonary rehabilitation card lists exercise training, nutrition counselling, meditation and yoga. Bronchoscopy gets its own section that answers \"What is a bronchoscopy?\" and \"Why does the doctor order a bronchoscopy?\" before explaining video bronchoscopy.",
          "The Diseases section gives asthma, allergic rhinitis, tuberculosis, lung fibrosis, pneumonia, smoking-related diseases, obstructive sleep apnoea and lung cancer a heading and a short paragraph each. That serves the goal of helping patients find information about specific conditions, and the search option in the menu lets them jump straight to a term."
        ]
      },
      {
        "h": "Booking, reviews and local details",
        "p": [
          "A slim top bar above the menu shows the clinic's email address, a phone number that dials on tap and a \"Book an Appointment\" button. The booking form asks for name, email, phone, a preferred date and a time slot, with the slot dropdown listing the clinic's morning and evening sessions from Monday to Saturday and its Sunday morning session, plus a message box. The clinic receives a requested date and session rather than a bare \"please call me\" message.",
          "Testimonials come from Google instead of being typed into the page. A reviews widget shows the doctor's Google rating and recent patient reviews, with a link that takes patients straight to Google to leave a review of their own, so every quote on the page can be traced back to a public profile.",
          "The page closes with the full address of Niramaya Care Center on Agra Shamshabad Raja Kherah Marg, Rajpur Chungi, near Gol Market, the email and phone number again, opening hours and an embedded Google Map. The page title names the doctor, his specialty and the city, and the main heading reads \"Pulmonologist in Agra (Lungs, Chest, Allergy)\", the same words a patient is likely to type when looking for a chest specialist nearby."
        ]
      },
      {
        "h": "What other specialist doctors can take from this",
        "p": [
          "Lead with credentials a patient can check: degrees with the university and year, past teaching roles and named professional societies say far more than \"experienced specialist\". Then explain every test and procedure you offer in two or three plain sentences, because a patient who has been told to get a lung function test or a sleep study will usually look it up before booking.",
          "Give each condition you treat its own heading, keep the phone number and booking button at the top of the page, and ask for a preferred date and session in the booking form. If your practice already has Google reviews, show them through a widget linked to your profile instead of retyping quotes. None of this needs a complicated build: this site runs on WordPress with Elementor and the OceanWP theme."
        ]
      }
    ],
    reading: ["clinic-website-checklist-for-doctors","website-for-specialist-doctors","online-appointment-booking-website","google-reviews-on-website","google-business-profile-checklist"],
    stack: ['WordPress', 'Elementor', 'OceanWP theme'],
    related: ['wordpress-website-for-doctors', 'elementor-developer', 'wordpress-seo-services'],
  },
  {
    slug: 'sahni-power-solutions',
    name: 'Sahni Power Solutions',
    url: 'https://sahnipowersolutions.com/',
    industry: 'Generator Rental',
    summary: 'A lead-focused website for a diesel generator rental company, presenting its full fleet from small portable units to large silent gensets.',
    client: 'Sahni Power Solutions rents diesel generators for commercial, industrial, institutional, event and infrastructure needs, on daily, weekly, monthly and annual terms.',
    goals: [
      'Show the full range of generator capacities clearly',
      'Serve very different customers: factories, hospitals, events, construction sites',
      'Generate enquiries and callback requests quickly',
      'Build trust with experience, projects and compliance details',
    ],
    built: [
      'Generator range organised by capacity and type: portable, silent, welding, mobile and industrial',
      'Industry-specific service descriptions for each customer type',
      'Prominent "Enquire Now" and "Request a Call Back" calls to action',
      'Trust indicators: years in business, projects completed and running',
      'Installation photo gallery',
      'Detailed FAQ section and compliance information (CPCB-IV+, noise norms)',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "Navigation is kept to three items, Home, Our Generator Range and Contact Us, with a \"Request a Call Back\" button in the header. The generator range menu splits the fleet into seven capacity bands, from 5 to 62.5 kVA up to 1,500 kVA, and each band has its own page, so a buyer who already knows roughly how much power they need can go straight to the right one instead of scrolling a long catalogue.",
          "The homepage opens with \"Your Power Partner\" and a summary of the fleet, diesel, portable, mobile and silent gensets from 5 kVA to 2000 kVA, with \"Generators on Rent\" and \"Hire Generators\" buttons. It then covers the company's mission, generator cards for each capacity band, counters, services, separate feature lists for power, welding and silent generators, an installation photo gallery and a long FAQ."
        ]
      },
      {
        "h": "Matching generators to very different customers",
        "p": [
          "A factory, a hospital and an event organiser need different machines, so the homepage describes the range by type as well as size: single-phase portable units from 5 to 15 kVA, three-phase units up to 125 kVA, silent generators for noise-sensitive sites, welding generators from 200 to 400 amps, and large industrial DG sets. Rental terms run daily, weekly, monthly and annually, and a separate \"Enquire for Monthly Rentals\" button serves longer hires.",
          "The services section names the customers the fleet serves: refineries and bottling plants, mining, government projects such as PWD, Smart City and metro work, data centres, BPOs and tech parks, events, banks, schools, hospitals, warehouses, malls, construction sites and crushers. A visitor from any of these sectors can see their kind of work listed before they enquire.",
          "Each capacity page answers that band's own questions. The 82.5 to 125 kVA page, for example, lists typical uses from small industries and hospitals to party halls and IT offices, explains what affects the rental price (hire duration, fuel arrangement, whether an operator is included and the distance from the Yelahanka yard), gives an approximate fuel consumption at full load, and compares 100 kVA with 125 kVA for a small hospital."
        ]
      },
      {
        "h": "Enquiries, trust and compliance",
        "p": [
          "Generating enquiries quickly was a core goal, so \"Request a Call Back\" stays in the header, each feature section ends with \"Enquire Now\", and \"Call Us for Enquiries\" appears alongside the phone number. The phone number, email address and Yelahanka address are repeated in the footer of every page.",
          "Counters on the homepage show projects completed and running, the copy notes that the business began as Sahni Traders in 1992, and the installation gallery adds photos of generators on site. Compliance is spelled out for buyers who need it: the site refers to CPCB-IV+ emission standards and to Karnataka State Pollution Control Board noise limits for silent, acoustic-canopied units.",
          "The FAQ is written in the words people search with. It covers the sizes available in Bangalore, emergency hire, maintenance, delivery and setup, how to choose the right generator, the difference between portable and silent units, and monthly DG rental. Localities such as Whitefield, Electronic City, Peenya and Hebbal are named alongside Pan India service, which ties the site to the areas the company covers."
        ]
      },
      {
        "h": "What other equipment rental businesses can take from this",
        "p": [
          "Organise your fleet the way customers specify it, by capacity first, and give each band its own page with typical uses, what affects the price and the questions specific to that size. Name the industries you serve so visitors can see their own work on the page.",
          "Keep a call-back button in the header, put an enquiry button at the end of every section, and state compliance standards plainly. Write FAQs in the words people search with, including your city and the localities you cover. This site does that with WordPress, Elementor, the Astra theme and Rank Math SEO."
        ]
      }
    ],
    reading: ["equipment-rental-website-guide","website-for-event-rental-businesses","service-area-business-seo","faq-page-seo","get-more-enquiries-from-your-website"],
    stack: ['WordPress', 'Elementor', 'Astra theme', 'Rank Math SEO'],
    related: ['website-for-solar-and-power-companies', 'website-for-manufacturers', 'landing-page-design'],
  },
  {
    slug: 'samverse',
    name: 'Samverse (this website)',
    url: 'https://samverse.space/',
    industry: 'Portfolio & Lead Generation',
    thumb: '/assets/og-image.png',
    metaDescription: 'Case study: samverse.space, a fast, custom-coded portfolio and lead generation site with service pages, a blog, case studies and a cost calculator.',
    summary: 'The site you\'re reading: a fast, search-focused portfolio and lead generation website for my own freelance business, with service and industry pages, a blog, case studies and a cost calculator.',
    client: 'Samverse is my own freelance WordPress development business. The website needed to explain services clearly to very different buyers, prove experience with real work, rank for high-intent searches and turn visitors into enquiries.',
    goals: [
      'Give every service and industry its own focused page',
      'Show real experience through case studies',
      'Rank for informational and commercial searches with genuinely useful content',
      'Capture enquiries reliably by email and WhatsApp, without spam',
    ],
    built: [
      'Dozens of service, industry, case study and article pages generated from simple data files, so adding content is quick and consistent',
      'Contact form that emails enquiries to Gmail through a serverless function, then opens WhatsApp, with honeypot and math-question spam protection',
      'Structured data on every page: business, services, FAQs, articles, breadcrumbs and case studies',
      'Internal linking between services, articles and case studies, plus sitemap, RSS feed and llms.txt',
      'Free website cost calculator, glossary and key takeaways on every article',
      'Per-page social share images, mobile-first design and Lighthouse SEO score of 100',
    ],
    sections: [
      {
        "h": "How the site is organised",
        "p": [
          "The homepage works as a summary of the whole business. Under the headline \"Hi, I'm the developer behind Samverse. I build WordPress websites that work.\" it moves through an About section, seven skills, four featured industries, nine selected projects, a short description of how a project runs, recent articles, six FAQs and the contact form, with each block linking to a deeper page.",
          "Behind the homepage sit more than 20 service and industry pages, each written for one kind of buyer: an agency that needs white-label help, a clinic, a manufacturer, a restaurant, or a business owner whose site has been hacked. They share one layout, from benefits and inclusions to related case studies, a FAQ and blog guides, and all end at the same contact form. A /solutions/ page lists every one of them, and a dozen case studies, including this one, live under /work/."
        ]
      },
      {
        "h": "Hundreds of pages from simple data files",
        "p": [
          "The site has no CMS and no database. Service pages, articles and case studies are entries in plain JavaScript data files, and a Node.js build script turns them into static HTML that Hostinger serves as ordinary files. I set it up this way so that adding a page takes one entry and one build, and the header, footer, contact form and styling stay identical everywhere.",
          "The same build writes structured data for each type of page: Service, FAQPage and BreadcrumbList on the landing pages, BlogPosting on articles, CreativeWork on case studies, WebApplication on the cost calculator and DefinedTermSet on the glossary. It also regenerates the sitemap, the blog's RSS feed and an llms.txt file that describes the site for AI assistants. A separate script creates a 1200 by 630 pixel share image for every article, landing page and case study, and another submits every URL in the sitemap to IndexNow so that Bing and Yandex hear about new pages after a deploy.",
          "The blog holds more than 570 articles grouped into six topics: planning and costs, SEO and growth, speed, security and maintenance, e-commerce, industry guides, and guides for agencies. Each article shows its read time, three key takeaways, an \"On this page\" contents list, a FAQ, related articles and services, and previous and next links within its topic."
        ]
      },
      {
        "h": "Enquiries without spam or lost leads",
        "p": [
          "Many business owners would rather talk on WhatsApp than wait for an email reply, so the contact form is built around it. It asks for a name, a phone or WhatsApp number, an optional email, a project type and a message. When it is sent, a small PHP script on the server emails the enquiry to me, and the browser then opens WhatsApp with the same details already typed in. If the email step fails, WhatsApp still opens, so a mail error never costs an enquiry.",
          "Spam protection works without reCAPTCHA. The form has a hidden honeypot field that only bots fill in, a simple addition question with a button for a new one, and a check that quietly drops anything submitted within three seconds of the page loading.",
          "The free website cost calculator is a second way in. A visitor picks a landing page, a business website, a large B2B site or a WooCommerce store, sets the number of pages (and products, for a store), ticks extras such as a booking system, online payments or multiple languages, and watches a price range in rupees update as they go. The \"Get an Exact Quote on WhatsApp\" button sends that selection as a message, so the conversation starts with a brief. Alongside it, a 40-term glossary explains words like DNS, caching and Core Web Vitals in plain English."
        ]
      },
      {
        "h": "What other freelancers and small businesses can take from this",
        "p": [
          "Give each service and each type of customer its own page instead of one long services page, and link everything together: articles point to the services they relate to, service pages list relevant articles and case studies, and case studies link back to services. If you publish prices, label them clearly as a guide, as the calculator does.",
          "If your enquiries usually move to WhatsApp, send them there straight from the form while keeping an email copy, and try light spam checks before adding a captcha that real visitors find annoying. A static build is not right for every business, but for a content-heavy site run by one person it keeps hosting simple and every page consistent."
        ]
      }
    ],
    reading: ["portfolio-website-freelancers-creatives","schema-markup-explained","website-calculators-lead-generation","stop-contact-form-spam","internal-linking-explained"],
    stack: ['HTML, CSS & JavaScript', 'Node.js build scripts', 'Hostinger hosting', 'PHP form handler'],
    related: ['wordpress-seo-services', 'landing-page-design', 'hire-wordpress-developer'],
  },
];
