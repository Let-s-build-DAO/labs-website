import HeaderNav from "~/components/HeaderNav";
import type { Route } from "./+types/home";
import Footer from "~/components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Let's Build Labs - Innovating Web3 Technology in Africa" }];
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    about: false,
    partners: false,
    projects: false,
    team: false,
    contact: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Creative marketing texts array
  const marketingTexts = [
    "Preparing Africa's Web3 revolution...",
    "Building tomorrow's digital Africa...",
    "Connecting the continent to Web3...",
    "Crafting Africa's blockchain future...",
    "Empowering African developers...",
    "Unleashing Web3 across Africa...",
    "Loading African innovation...",
    "Bridging Africa to decentralization...",
    "Awakening the digital lion...",
    "Igniting Africa's tech renaissance...",
    "Preparing Africa's Web3 story...",
  ];

  // Select random marketing text on component mount
  const [randomText] = useState(() => {
    return marketingTexts[Math.floor(Math.random() * marketingTexts.length)];
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check visibility of sections for scroll animations
      const sections = [
        "hero",
        "about",
        "partners",
        "projects",
        "team",
        "contact",
      ];
      const newVisibility = { ...isVisible };

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView =
            rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
          newVisibility[section as keyof typeof isVisible] = isInView;
        }
      });

      setIsVisible(newVisibility);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible((prev) => ({ ...prev, hero: true }));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Client-side only
  useEffect(() => {
    setIsClient(true);

    // Simulate loading time for smooth experience
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 1.2 seconds loading

    return () => clearTimeout(loadingTimer);
  }, []);

  // Calculate scale and border radius based on scroll
  const maxScroll = 400; // Adjust this value to control how much scroll affects the scaling
  const scrollProgress = Math.min(scrollY / maxScroll, 1);
  const scale = 1 - scrollProgress * 0.1; // Scale from 1 to 0.9
  const borderRadius = scrollProgress * 24; // Border radius from 0 to 24px

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("message", formData.message);
      formDataToSubmit.append(
        "_subject",
        "New Contact Form Submission from LB Labs Website"
      );
      formDataToSubmit.append("_captcha", "false");
      formDataToSubmit.append("_template", "table");

      await axios.post(
        "https://formsubmit.co/hello@letsbuilddao.org",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#6B46C1] via-[#9333EA] to-[#E879F9] transition-opacity duration-500">
          <div className="text-center">
            {/* Logo/Brand Animation */}
            <div className="mb-8 animate-pulse">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-bounce"></div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                Let's Build Labs
              </h1>
            </div>

            {/* Loading Animation */}
            {/* <div className="flex justify-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div> */}

            {/* Loading Text */}
            <p className="text-white/90 text-sm md:text-base font-medium">
              {randomText}
            </p>

            {/* Progress Bar */}
            {/* <div className="w-64 h-1 bg-white/20 rounded-full mx-auto mt-6 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-white/60 to-white rounded-full animate-pulse"></div>
            </div> */}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <HeaderNav />
        <section
          id="hero"
          className="relative overflow-hidden transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            transformOrigin: "center top",
          }}
        >
          <img
            src="/images/hero.jpg"
            className="w-full h-[100vh] object-cover"
            alt="Let's Build Labs hero image showcasing Web3 and blockchain innovation in Africa"
            loading="eager"
            fetchPriority="high"
          />

          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-white px-6 transition-all duration-1000 ${
              isVisible.hero
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center max-w-5xl mx-auto">
              <div
                className={`mb-6 transition-all duration-700 delay-300 ${
                  isVisible.hero
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 tracking-wide uppercase hover:bg-white/30 transition-all duration-300">
                  Let's Build Labs
                </span>
              </div>

              <h1
                className={`text-4xl md:text-6xl lg:text-7xl overflow-hidden font-bold mb-6 transition-all duration-700 delay-500 ${
                  isVisible.hero
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <span className="block hover:scale-105 transition-transform duration-300">
                  The Future Begins
                </span>
                <span className="block bg-gradient-to-r from-[#7B5CFF] to-[#E879F9] bg-clip-text text-transparent hover:from-[#E879F9] hover:to-[#7B5CFF] transition-all duration-500">
                  In Africa
                </span>
                <span className="block hover:scale-105 transition-transform duration-300">
                  With Web3 Innovation
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className={`text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-700 ${
                  isVisible.hero
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                In the heart of Africa, a revolution is brewing. We're not just
                building technology – we're crafting the foundation for a new
                digital era that will transform how an entire continent
                interacts with the decentralized world.
              </p>

              {/* Call-to-Action Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-900 ${
                  isVisible.hero
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-[#7B5CFF] to-[#6B46C1] text-white rounded-full font-semibold hover:from-[#6B46C1] hover:to-[#553C9A] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl active:scale-95">
                  Join the Revolution
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95">
                  Read Our Story
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 hover:text-[#6B46C1] transition-colors duration-300">
                Our Origin Story
              </h2>
              <p className="text-lg max-w-3xl mx-auto">
                Every great movement starts with a vision. Ours began with
                seeing Africa's untapped potential in the Web3 revolution and
                realizing that the continent needed its own champions to lead
                the charge.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Content Side */}
              <div
                className={`transition-all duration-700 ${
                  isVisible.about
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: isVisible.about ? "200ms" : "0ms" }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  The Mission That Drives Us
                </h3>
                <p className=" mb-6 leading-relaxed">
                  We recognized that Africa needed more than just access to Web3
                  technology – it needed infrastructure built by Africans, for
                  Africans. Our mission became clear: create a robust ecosystem
                  of tools and services that would make blockchain technology as
                  accessible as mobile banking has become across the continent.
                </p>
                <p className="mb-6 leading-relaxed">
                  But we knew we couldn't do this alone. That's why we're
                  building more than just technology – we're cultivating the
                  "Let's Build DAO" community, a collaborative space where
                  African developers, entrepreneurs, and visionaries come
                  together to shape the continent's digital future.
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-2xl font-bold text-[#6B46C1] mb-2">
                      1000+
                    </h4>
                    <p className="text-[#6B7280] text-sm">Visionaries United</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-2xl font-bold text-[#6B46C1] mb-2">
                      80+
                    </h4>
                    <p className="text-[#6B7280] text-sm">Stories Minted</p>
                  </div>
                </div>
              </div>

              {/* Visual Side */}
              <div
                className={`transition-all duration-700 ${
                  isVisible.about
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: isVisible.about ? "400ms" : "0ms" }}
              >
                <div className="relative overflow-hidden">
                  <div className="bg-gradient-to-br overflow-hidden from-[#6B46C1] to-[#9333EA] rounded-2xl p-8 text-white">
                    <h4 className="text-xl font-bold mb-4">
                      Our African Advantage
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mt-1 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          Deep understanding of African tech landscape
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mt-1 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Community-first approach to development</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mt-1 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Community-driven development</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mt-1 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Real-world problem solving</span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-5 h-5 mt-1 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>DAO-Driven Governance & Funding</span>
                      </li>
                    </ul>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E879F9] rounded-full opacity-20 animate-pulse"></div>
                  <div
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#7B5CFF] rounded-full opacity-30 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 ${
                isVisible.about
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible.about ? "600ms" : "0ms" }}
            >
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6B46C1] to-[#9333EA] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Innovation
                </h4>
                <p className="">
                  Pushing the boundaries of what's possible with blockchain
                  technology
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#9333EA] to-[#C084FC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Community
                </h4>
                <p className="">
                  Building a supportive ecosystem for developers and
                  entrepreneurs
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#C084FC] to-[#DDD6FE] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Education
                </h4>
                <p className="">
                  Empowering the next generation with Web3 knowledge and skills
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners/Sponsors Section */}
        <section id="partners" className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-700 ${
                isVisible.partners
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-[#6B46C1] transition-colors duration-300">
                Building Alliances
              </h2>
              <p className="text-lg  max-w-2xl mx-auto">
                No revolution succeeds in isolation. These visionary
                organizations joined our mission to transform Africa's digital
                landscape, bringing their expertise and resources to amplify our
                impact.
              </p>
            </div>

            <div className="overflow-hidden">
              <div className=" py-8">
                <Marquee>
                  <div className="flex-shrink-0 group mx-4">
                    <img
                      className="h-16 w-auto my-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      src="/images/partners/borderless.png"
                      alt="Borderless"
                    />
                  </div>
                  <div className="flex-shrink-0 group mx-4">
                    <img
                      className="h-16 w-auto my-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 "
                      src="/images/partners/lisk.png"
                      alt="Lisk"
                    />
                  </div>
                  <div className="flex-shrink-0 group mx-4">
                    <img
                      className="h-16 w-auto my-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 "
                      src="/images/partners/streamlivr.png"
                      alt="Streamlivr"
                    />
                  </div>
                  <div className="flex-shrink-0 group mx-4">
                    <img
                      className="h-16 w-auto my-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 "
                      src="/images/partners/gdg.png"
                      alt="Google Developer Groups"
                    />
                  </div>
                </Marquee>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible.projects
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 hover:text-[#6B46C1] transition-colors duration-300">
                Transforming Ideas into Reality
              </h2>
              <p className="text-lg  max-w-2xl mx-auto">
                From vision to execution. These are the groundbreaking projects
                where our dreams take digital form, each one a stepping stone
                toward Africa's Web3 future.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className={`linear !rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible.projects ? "100ms" : "0ms",
                }}
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/projects/lets-build-dao.png"
                    className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Let's Build DAO"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold my-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                    Let's Build DAO
                  </h3>
                  <p className=" mb-4 group-hover:text-[#4B5563] transition-colors duration-300">
                    Africa’s first On-Chain Intelligence Hub, designed to drive
                    real blockchain adoption by collecting, analyzing, and
                    leveraging on-chain transaction data.
                  </p>
                  <a
                    href="https://letsbuilddao.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#6B46C1] text-white py-2 px-4 rounded-full hover:bg-[#553C9A] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 group-hover:shadow-lg"
                  >
                    Learn More
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <div
                className={`linear !rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible.projects ? "200ms" : "0ms",
                }}
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/projects/academy.png"
                    className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Let's Build Academy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold my-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                    Let's Build Academy
                  </h3>
                  <p className=" mb-4 group-hover:text-[#4B5563] transition-colors duration-300">
                    A self-learning platform offering Web3 courses in
                    development, design, and blockchain writing.
                  </p>
                  <a
                    href="https://academy.letsbuilddao.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#6B46C1] text-white py-2 px-4 rounded-full hover:bg-[#553C9A] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 group-hover:shadow-lg"
                  >
                    Learn More
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div
                className={`linear !rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible.projects ? "300ms" : "0ms",
                }}
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/projects/events.jpg"
                    className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Events"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold my-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                    Hackathons, Meetups & Bootcamps
                  </h3>
                  <p className=" mb-4 group-hover:text-[#4B5563] transition-colors duration-300">
                    Connecting Enthusiasts, students, builders, investors, and
                    innovators to bring impactful Web3 projects to life.
                  </p>
                  <a
                    href="https://meetup.letsbuilddao.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#6B46C1] text-white py-2 px-4 rounded-full hover:bg-[#553C9A] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 group-hover:shadow-lg"
                  >
                    Learn More
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div
                className={`linear !rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer ${
                  isVisible.projects
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible.projects ? "400ms" : "0ms",
                }}
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src="/images/projects/nfts.jpg"
                    className="h-80 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Lazy NFTs"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold my-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                    Lazy NFT's
                  </h3>
                  <p className=" mb-4 group-hover:text-[#4B5563] transition-colors duration-300">
                    The gateway of the Let's Build DAO ecosystem — where your
                    NFT is more than just art. It's your all-access pass to the
                    new economy of skills, community, and power.
                  </p>
                  <a
                    href="https://lazy.letsbuilddao.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#6B46C1] text-white py-2 px-4 rounded-full hover:bg-[#553C9A] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95 group-hover:shadow-lg"
                  >
                    Learn More
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="py-16 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible.team
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 hover:text-[#6B46C1] transition-colors duration-300">
                Meet The Visionaries
              </h2>
              <p className="text-lg  max-w-2xl mx-auto">
                Behind every revolution are the brave souls who dare to dream
                differently. Meet the architects of Africa's Web3 transformation
                - each bringing unique expertise to our shared mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] text-center group ${
                  isVisible.team
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible.team ? "100ms" : "0ms" }}
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#6B46C1] to-[#9333EA] rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  GA
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Great Adams
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">Team Lead</p>
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/great-adams-606b22187/"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/greatAdams01"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 2 */}
              <div
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] text-center group ${
                  isVisible.team
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible.team ? "200ms" : "0ms" }}
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#9333EA] to-[#C084FC] rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  AE
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Alabo Excel
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">
                  Development Team Lead
                </p>

                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/alabo-excel/"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/alabo-excel"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 3 */}
              <div
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] text-center group ${
                  isVisible.team
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible.team ? "300ms" : "0ms" }}
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#C084FC] to-[#DDD6FE] rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  BV
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Bibi Victoria
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">
                  Human Resource Manager
                </p>
                {/* <p className=" text-sm mb-4">
                Passionate educator creating comprehensive learning experiences
                for developers worldwide.
              </p> */}
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/victoria-bibi-a4497a221/"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Team Member 4 */}
              <div
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] text-center group ${
                  isVisible.team
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: isVisible.team ? "400ms" : "0ms" }}
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#DDD6FE] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  JC
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2 group-hover:text-[#6B46C1] transition-colors duration-300">
                  Jerry Chukwundah
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">
                  Product Manager
                </p>
                {/* <p className=" text-sm mb-4">
                Building and nurturing our global community of developers,
                creators, and innovators.
              </p> */}
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/jeremiah-chukundah-19bbb81b5/"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/jerrychukundah"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#DDD6FE] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  NN
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2">
                  Natachi Nnamaka
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">
                  Academy Lead
                </p>
                {/* <p className=" text-sm mb-4">
                Building and nurturing our global community of developers,
                creators, and innovators.
              </p> */}
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/natachijs/"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/natachijs"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#DDD6FE] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  RR
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2">
                  Richard
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">Design Lead</p>
                {/* <p className=" text-sm mb-4">
                Building and nurturing our global community of developers,
                creators, and innovators.
              </p> */}
                <div className="flex justify-center space-x-3">
                  <a
                    href="#"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/IamChardDo"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#DDD6FE] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  JB
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2">
                  Joseph Bassey
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">
                  Community Management Lead
                </p>
                {/* <p className=" text-sm mb-4">
                Building and nurturing our global community of developers,
                creators, and innovators.
              </p> */}
                <div className="flex justify-center space-x-3">
                  <a
                    href="#"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/josephbassey21"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#DDD6FE] to-[#6B46C1] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  CO
                </div>
                <h3 className="text-xl font-bold text-[#030303] mb-2">
                  Chisaneme Aloni
                </h3>
                <p className="text-[#6B46C1] font-semibold mb-3">
                  Marketing Lead
                </p>
                {/* <p className=" text-sm mb-4">
                Building and nurturing our global community of developers,
                creators, and innovators.
              </p> */}
                <div className="flex justify-center space-x-3">
                  <a
                    href="https://www.linkedin.com/in/chisaneme-aloni/"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/aloni212"
                    target="_blank"
                    className="text-[#6B46C1] hover:text-[#553C9A] transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div
              className={`text-center mb-8 transition-all duration-700 ${
                isVisible.contact
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 hover:text-[#6B46C1] transition-colors duration-300">
                Join Our Story
              </h2>
              <p className="text-lg  max-w-2xl mx-auto">
                Every great story needs new chapters, and yours could be next.
                Whether you're a developer, entrepreneur, or simply someone who
                believes in Africa's digital future, we want to hear from you.
                Reach out at{" "}
                <a
                  href="mailto:hello@letsbuilddao.org"
                  className="text-[#6B46C1] hover:text-[#553C9A] font-semibold transition-colors duration-300"
                >
                  hello@letsbuilddao.org
                </a>{" "}
                or use the form below to start your journey with us.
              </p>
            </div>

            <div
              className={`rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-700 ${
                isVisible.contact
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible.contact ? "200ms" : "0ms" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-green-800 font-medium">
                      ✅ Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800 font-medium">
                      ❌ Failed to send message. Please try again or email us
                      directly.
                    </p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[#030303] mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#E5DEFF] rounded-lg focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all duration-300 bg-[#F8F6FF] text-[#030303] placeholder-[#9CA3AF] disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-[#030303] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#E5DEFF] rounded-lg focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all duration-300 bg-[#F8F6FF] text-[#030303] placeholder-[#9CA3AF] disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#030303] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[#E5DEFF] rounded-lg focus:ring-2 focus:ring-[#6B46C1] focus:border-transparent outline-none transition-all duration-300 bg-[#F8F6FF] text-[#030303] placeholder-[#9CA3AF] resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6B46C1] hover:bg-[#553C9A] text-white font-semibold py-4 px-6 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:ring-4 focus:ring-[#6B46C1]/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
