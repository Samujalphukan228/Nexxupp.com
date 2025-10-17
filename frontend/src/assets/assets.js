import { FaLaptopCode, FaUsers, FaRocket, FaHandsHelping } from "react-icons/fa";


export const myFeatures = [
  {
    id: 1,
    title: "Custom Web Development",
    description:
      "We craft tailored websites that reflect your brand and meet your business objectives. From engaging landing pages to full-featured web applications, our solutions help your business grow online.",
  },
  {
    id: 2,
    title: "Client Engagement & Conversion",
    description:
      "Our interactive designs and user-focused features engage visitors and convert them into loyal clients. We optimize every element for clarity, usability, and strong call-to-actions.",
  },
  {
    id: 3,
    title: "Efficient Project Delivery",
    description:
      "We value your time and ensure fast, reliable, and efficient project delivery without compromising quality. Launch your website quickly and start growing your business immediately.",
  },
  {
    id: 4,
    title: "Ongoing Support & Optimization",
    description:
      "Beyond development, we provide continuous support and optimization. From performance improvements to feature updates, we help your website evolve as your business grows.",
  },
];



// assets.js or wherever you store your feature data
export const myFeatures2 = [
  {
    id: 1,
    title: "Custom Web Development",
    description: "We build websites tailored to your brand and business goals.",
  },
  {
    id: 2,
    title: "Client Engagement & Conversion",
    description: "Interactive designs to engage visitors and convert them into clients.",
  },
  {
    id: 3,
    title: "Efficient Project Delivery",
    description: "Fast and reliable delivery without compromising quality.",
  },
  {
    id: 4,
    title: "Ongoing Support & Optimization",
    description: "Continuous support and performance optimization for your site.",
  },
];


export const servicesData = [
  {
    id: 1,
    icon: <FaLaptopCode size={50}  />,
    title: "Custom Web Development",
    description:
      "We build tailored websites that reflect your brand identity and enhance your online presence. Our development includes responsive design, performance optimization, and the latest web technologies to ensure your site runs flawlessly.",
  },
  {
    id: 2,
    icon: <FaUsers size={50}  />,
    title: "Client Engagement",
    description:
      "Our interactive designs focus on creating meaningful engagement with your audience. We ensure your visitors are not just browsing, but connecting with your brand, turning them into loyal clients over time.",
  },
  {
    id: 3,
    icon: <FaRocket size={50}  />,
    title: "Fast Project Delivery",
    description:
      "We value your time and strive to deliver projects quickly without compromising quality. Our agile workflow ensures deadlines are met, and you can launch your website or application efficiently.",
  },
  {
    id: 4,
    icon: <FaHandsHelping size={50}  />,
    title: "Ongoing Support",
    description:
      "Beyond delivery, we provide continuous support and optimization for your website. We ensure it stays updated, secure, and performs at its best so you can focus on growing your business.",
  },
  {
    id: 5,
    icon: <FaLaptopCode size={50}  />,
    title: "SEO Optimization",
    description:
      "Our SEO services help your website rank higher on search engines, increasing visibility and organic traffic. From keyword research to on-page optimization, we ensure your site reaches the right audience.",
  },
];

export const plans = [
        {
            name: "Basic",
            price: "$19",
            features: ["1 Website", "Basic Support", "10GB Storage"],
            popular: false,
        },
        {
            name: "Pro",
            price: "$49",
            features: ["5 Websites", "Priority Support", "50GB Storage"],
            popular: true, // Highlighted plan
        },
        {
            name: "Enterprise",
            price: "$99",
            features: ["Unlimited Websites", "24/7 Support", "200GB Storage"],
            popular: false,
        },
    ];




const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio built with Next.js and Tailwind CSS.",
      image: "https://picsum.photos/id/1015/800/600",
      link: "https://portfolite.framer.website/",
      tags: ["Next.js", "Tailwind CSS"],
      year: "2024",
    },
    {
      title: "E-commerce Store",
      description: "A modern e-commerce store using React and Stripe API.",
      image: "https://picsum.photos/id/1025/800/600",
      link: "https://forever-five-iota.vercel.app/",
      tags: ["React", "Stripe"],
      year: "2024",
    },
    {
      title: "Company site",
      description: "A headless CMS blog powered by Next.js and Sanity.io.",
      image: "https://picsum.photos/id/1040/800/600",
      link: "https://better-closet-732185.framer.app/",
      tags: ["Next.js", "Sanity.io"],
      year: "2023",
    },
  ];

