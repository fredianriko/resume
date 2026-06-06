"use client";

import { useState, useEffect, useRef } from "react";

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<
    "hero" | "about" | "career" | "education" | "project" | "blog" | "contact"
  >("hero");

  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ===== AUTH =====
  const [authed, setAuthed] = useState<boolean | null>(null); // null = checking
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // ===== LIST DATA =====
  const [careerList, setCareerList] = useState<any[]>([]);
  const [educationList, setEducationList] = useState<any[]>([]);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [blogList, setBlogList] = useState<any[]>([]);

  // ===== EDIT MODE =====
  const [editingCareerIndex, setEditingCareerIndex] = useState<number | null>(
    null
  );
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(
    null
  );
  const [editingEducationIndex, setEditingEducationIndex] = useState<
    number | null
  >(null);
  const [editingBlogIndex, setEditingBlogIndex] = useState<number | null>(null);

  // ===== HERO FORM =====
  const [uploading, setUploading] = useState(false);
  const [heroName, setHeroName] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroButtons, setHeroButtons] = useState<
    { label: string; href: string }[]
  >([]);

  // ===== ABOUT FORM =====
  const [aboutText, setAboutText] = useState("");
  const [aboutError, setAboutError] = useState("");

  // ===== CAREER FORM =====
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [achievements, setAchievements] = useState("");
  const [careerSkills, setCareerSkills] = useState("");
  const [careerError, setCareerError] = useState("");

  // ===== PROJECT FORM =====
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [projectError, setProjectError] = useState("");

  // ===== BLOG FORM =====
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [blogAuthor, setBlogAuthor] = useState<string>("");
  const [blogCreatedAt, setBlogCreatedAt] = useState<string>("");
  const [blogUpdatedAt, setBlogUpdatedAt] = useState<string>("");
  const [blogError, setBlogError] = useState<string>("");

  // ===== EDUCATION FORM =====
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [eduPeriod, setEduPeriod] = useState("");
  const [eduDetails, setEduDetails] = useState("");
  const [eduError, setEduError] = useState("");

  // ===== CONTACT FORM =====
  const [contactEmail, setContactEmail] = useState("");
  const [contactLinkedin, setContactLinkedin] = useState("");
  const [contactGithub, setContactGithub] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const [contactResume, setContactResume] = useState("");

  function isEmpty(value: string) {
    return !value || value.trim().length === 0;
  }

  // SIDE EFFECT

  // check existing session on mount
  useEffect(() => {
    fetch("/cms/auth/session")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  // sha256 hex digest using the browser's Web Crypto (available on localhost).
  async function sha256Hex(message: string) {
    const data = new TextEncoder().encode(message);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");

    try {
      // 1. Get a one-time nonce from the server.
      const challenge = await fetch("/cms/auth/challenge").then((r) => r.json());

      // 2. Send only sha256(username:password:nonce) — the raw credentials
      //    never leave the browser, and the proof can't be replayed.
      const proof = await sha256Hex(
        `${loginUser}:${loginPass}:${challenge.nonce}`
      );

      const res = await fetch("/cms/auth/login", {
        method: "POST",
        body: JSON.stringify({ nonce: challenge.nonce, proof }),
      });

      if (res.ok) {
        setAuthed(true);
        setLoginUser("");
        setLoginPass("");
      } else {
        const data = await res.json().catch(() => ({}));
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Login failed");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/cms/auth/logout", { method: "POST" });
    setAuthed(false);
  }

  // load all data when tab changes (only once authenticated)
  useEffect(() => {
    if (activeTab && authed) {
      loadHero();
      loadAbout();
      loadCareer();
      loadEducation();
      loadProjects();
      loadBlog();
      loadContact();
    }
  }, [activeTab, authed]);

  // auto resize about textarea
  useEffect(() => {
    if (!aboutRef.current) return;
    aboutRef.current.style.height = "auto";
    aboutRef.current.style.height = `${aboutRef.current.scrollHeight}px`;
  }, [activeTab]);

  // ===== LOAD DATA =====
  async function loadHero() {
    const res = await fetch("/cms/hero/get-hero");
    const data = await res.json();

    setHeroName(data.name || "");
    setHeroSubtitle(data.subtitle || "");
    setHeroImage(data.profileImage || "");
    setHeroButtons(data.buttons || []);
  }

  async function loadAbout() {
    const res = await fetch("/cms/aboutme/get-aboutme");
    const data = await res.json();

    setAboutText(data?.about || "");
  }

  async function loadCareer() {
    const res = await fetch("/cms/career/get-career");
    const data = await res.json();
    setCareerList(data);
  }

  async function loadProjects() {
    const res = await fetch("/cms/projects/get-project");
    const data = await res.json();
    setProjectList(data);
  }

  async function loadBlog() {
    const res = await fetch("/cms/blog/get-blog");
    const data = await res.json();
    setBlogList(data);
  }

  async function loadEducation() {
    const res = await fetch("/cms/education/get-education");
    const data = await res.json();
    setEducationList(data);
  }

  async function loadContact() {
    const res = await fetch("/cms/contact/get-contact");
    const data = await res.json();
    setContactEmail(data.email || "");
    setContactLinkedin(data.linkedin || "");
    setContactGithub(data.github || "");
    setContactLocation(data.location || "");
    setContactResume(data.resumeUrl || "");
  }

  // ===== FORM SUBMISSIONS =====
  async function handlePhotoUpload(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/cms/hero/upload-photo", {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    alert("Profile picture updated!");

    // Force refresh image cache
    setHeroImage("/profilepict.jpeg?" + Date.now());
  }

  async function handleHeroSubmit() {
    const payload = {
      name: heroName,
      subtitle: heroSubtitle,
      profileImage: heroImage,
      buttons: heroButtons,
    };

    await fetch("/cms/hero/save-hero", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    alert("Hero updated!");
  }

  async function handleAboutSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!aboutText.trim()) {
      setAboutError("About Me cannot be empty.");
      return;
    }

    setAboutError("");

    const payload = {
      about: aboutText,
    };

    await fetch("/cms/aboutme/save-aboutme", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    alert("About Me updated!");
  }

  async function handleCareerSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      isEmpty(title) ||
      isEmpty(company) ||
      isEmpty(period) ||
      isEmpty(achievements)
    ) {
      setCareerError("All fields are required.");
      return;
    }

    setCareerError("");

    const payload = {
      title,
      company,
      period,
      achievements: achievements.split("\n").filter((l) => l.trim()),
      skills: careerSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      index: editingCareerIndex,
    };

    await fetch(
      editingCareerIndex === null
        ? "/cms/career/save-career"
        : "/cms/career/update-career",
      { method: "POST", body: JSON.stringify(payload) }
    );

    alert(editingCareerIndex === null ? "Career added!" : "Career updated!");

    setTitle("");
    setCompany("");
    setPeriod("");
    setAchievements("");
    setCareerSkills("");
    setEditingCareerIndex(null);

    loadCareer();
  }

  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      isEmpty(projectTitle) ||
      isEmpty(projectDesc) ||
      isEmpty(projectTech) ||
      isEmpty(projectUrl) ||
      isEmpty(repoUrl)
    ) {
      setProjectError("All fields are required.");
      return;
    }

    setProjectError("");

    const payload = {
      title: projectTitle,
      description: projectDesc,
      tech: projectTech.split(",").map((t) => t.trim()),
      liveUrl: projectUrl,
      repoUrl: repoUrl,
      index: editingProjectIndex,
    };

    await fetch(
      editingProjectIndex === null
        ? "/cms/projects/save-project"
        : "/cms/projects/update-project",
      { method: "POST", body: JSON.stringify(payload) }
    );

    alert(editingProjectIndex === null ? "Project added!" : "Project updated!");

    setProjectTitle("");
    setProjectDesc("");
    setProjectTech("");
    setProjectUrl("");
    setRepoUrl("");
    setEditingProjectIndex(null);
    loadProjects();
  }

  async function handleBlogSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEmpty(blogTitle) || isEmpty(blogContent)) {
      setBlogError("All fields are required.");
      return;
    }

    setBlogError("");
    const payload = {
      title: blogTitle,
      story: blogContent,
      index: editingBlogIndex,
    };

    await fetch(
      editingBlogIndex === null
        ? "/cms/blog/save-blog"
        : "/cms/blog/update-blog",
      { method: "POST", body: JSON.stringify(payload) }
    );

    alert(editingBlogIndex === null ? "Blog added!" : "Blog updated!");

    setEditingBlogIndex(null);
    setBlogTitle("");
    setBlogContent("");
    setBlogAuthor("Fredi Anriko");
    setBlogCreatedAt(Date.now().toString());
    setBlogUpdatedAt(Date.now().toString());

    loadBlog(); // ✅ refresh list
  }

  async function handleEducationSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      isEmpty(school) ||
      isEmpty(degree) ||
      isEmpty(eduPeriod) ||
      isEmpty(eduDetails)
    ) {
      setEduError("All fields are required.");
      return;
    }

    setEduError("");

    const payload = {
      school,
      degree,
      period: eduPeriod,
      details: eduDetails.split("\n").filter((l) => l.trim()),
      index: editingEducationIndex,
    };

    await fetch(
      editingEducationIndex === null
        ? "/cms/education/save-education"
        : "/cms/education/update-education",
      { method: "POST", body: JSON.stringify(payload) }
    );

    alert(
      editingEducationIndex === null ? "Education added!" : "Education updated!"
    );

    resetEducationForm();
    loadEducation();
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      email: contactEmail,
      linkedin: contactLinkedin,
      github: contactGithub,
      location: contactLocation,
      resumeUrl: contactResume,
    };

    await fetch("/cms/contact/save-contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    alert("Contact updated!");
  }

  // RESET FORMS
  function resetAboutForm() {
    setAboutError("");
  }

  function resetEducationForm() {
    setSchool("");
    setDegree("");
    setEduPeriod("");
    setEduDetails("");
    setEduError("");
    setEditingEducationIndex(null);
  }

  function resetCareerForm() {
    setTitle("");
    setCompany("");
    setPeriod("");
    setAchievements("");
    setCareerSkills("");
    setCareerError("");
    setEditingCareerIndex(null);
  }

  function resetProjectForm() {
    setProjectTitle("");
    setProjectDesc("");
    setProjectTech("");
    setProjectUrl("");
    setRepoUrl("");
    setProjectError("");
    setEditingProjectIndex(null);
  }

  function resetBlogForm() {
    setBlogTitle("");
    setBlogContent("");
    setBlogError("");
    setEditingBlogIndex(null);
  }

  // Other function

  function updateHeroButton(i: number, key: "label" | "href", value: string) {
    const copy = [...heroButtons];
    copy[i] = { ...copy[i], [key]: value };
    setHeroButtons(copy);
  }

  function addHeroButton() {
    setHeroButtons([...heroButtons, { label: "", href: "" }]);
  }

  function removeHeroButton(i: number) {
    setHeroButtons(heroButtons.filter((_, index) => index !== i));
  }

  // ===== RENDER =====
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white rounded-lg shadow p-8 space-y-4 text-black"
        >
          <h1 className="text-2xl font-bold text-center">CMS Login</h1>

          {loginError && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {loginError}
            </div>
          )}

          <input
            className="w-full p-3 border rounded"
            placeholder="Username"
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border rounded"
            placeholder="Password"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />

          <button
            disabled={loggingIn}
            className="w-full bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer disabled:opacity-50"
          >
            {loggingIn ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 text-black">
      <div className="max-w-4xl mx-auto mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-black">Content Manager</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer"
        >
          Log out
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          {/* Hero Tab */}
          <button
            onClick={() => {
              setActiveTab("hero");
              resetAboutForm();
              resetCareerForm();
              resetProjectForm();
              resetBlogForm();
            }}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "hero"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Hero
          </button>

          {/* About Tab */}
          <button
            onClick={() => {
              setActiveTab("about");
              resetAboutForm();
              resetCareerForm();
              resetProjectForm();
            }}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "about"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            About Me
          </button>

          {/* Career Tab */}
          <button
            onClick={() => {
              setActiveTab("career");
              resetCareerForm();
            }}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "career"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Career Form
          </button>

          {/* Education Tab */}
          <button
            onClick={() => {
              setActiveTab("education");
              resetEducationForm();
            }}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "education"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Education
          </button>

          {/* Project Tab */}
          <button
            onClick={() => {
              setActiveTab("project");
              resetProjectForm();
            }}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "project"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Project Form
          </button>

          {/* Blog Tab */}
          <button
            onClick={() => {
              setActiveTab("blog");
              resetBlogForm(); // ✅ change this
            }}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "blog"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Blog Form
          </button>

          {/* Contact Tab */}
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex-1 p-4 font-semibold cursor-pointer ${
              activeTab === "contact"
                ? "bg-gray-100 border-b-2 border-black text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Contact
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-black">
          {activeTab === "hero" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Edit Hero Section</h2>

              <div className="space-y-4">
                <input
                  className="w-full p-3 border rounded"
                  placeholder="Name"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                />

                <textarea
                  className="w-full p-3 border rounded h-32"
                  placeholder="Subtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                />

                <div className="border border-gray-300 rounded-xl p-4 w-fit mt-4 space-y-4">
                  <label className="font-bold block">Profile Picture</label>

                  {/* Profile image */}
                  <div className="w-40 h-40 flex items-center justify-center border-2 border-gray-300 rounded-xl">
                    <img
                      src={heroImage || "/profilepict.jpeg"}
                      className="w-32 h-32 rounded-full object-cover"
                      alt="Profile"
                    />
                  </div>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (!e.target.files?.[0]) return;
                      handlePhotoUpload(e.target.files[0]);
                    }}
                  />

                  {/* Upload button */}
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>

                  {uploading && (
                    <p className="text-sm text-gray-500">Uploading...</p>
                  )}
                </div>

                <div>
                  <h3 className="font-bold mb-2">Buttons</h3>

                  {heroButtons.map((btn, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        className="flex-1 p-2 border rounded"
                        placeholder="Label"
                        value={btn.label}
                        onChange={(e) =>
                          updateHeroButton(i, "label", e.target.value)
                        }
                      />
                      <input
                        className="flex-1 p-2 border rounded"
                        placeholder="Href"
                        value={btn.href}
                        onChange={(e) =>
                          updateHeroButton(i, "href", e.target.value)
                        }
                      />
                      <button
                        onClick={() => removeHeroButton(i)}
                        className="px-3 bg-red-600 text-white rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={addHeroButton}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    + Add Button
                  </button>
                </div>

                <button
                  onClick={handleHeroSubmit}
                  className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
                >
                  Save Hero
                </button>
              </div>
            </>
          )}

          {activeTab === "about" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Edit About Me</h2>

              <form onSubmit={handleAboutSubmit} className="space-y-4">
                {aboutError && (
                  <div className="bg-red-100 text-red-700 p-3 rounded">
                    {aboutError}
                  </div>
                )}

                {/* About Text */}
                <textarea
                  ref={aboutRef}
                  className="w-full p-4 border rounded resize-none "
                  placeholder="Write your About Me here..."
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                />

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer">
                  Save About Me
                </button>
              </form>
            </>
          )}

          {activeTab === "career" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Add Career</h2>

              <form onSubmit={handleCareerSubmit} className="space-y-4">
                {careerError && (
                  <div className="bg-red-100 text-red-700 p-3 rounded">
                    {careerError}
                  </div>
                )}

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Period"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                />

                <textarea
                  className="w-full p-3 border rounded h-32"
                  placeholder="Achievements (one per line)"
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Key skills (comma-separated, e.g. Node.js, MySQL, GKE)"
                  value={careerSkills}
                  onChange={(e) => setCareerSkills(e.target.value)}
                />

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer">
                  {editingCareerIndex === null
                    ? "Save Career"
                    : "Update Career"}
                </button>
              </form>

              <hr className="my-8" />

              <h3 className="text-xl font-bold mb-4">Career List</h3>

              <div className="space-y-4">
                {careerList.map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold">
                        {item.title} - {item.company}
                      </div>
                      <div className="text-sm text-gray-600">{item.period}</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                        onClick={() => {
                          setEditingCareerIndex(index);
                          setTitle(item.title);
                          setCompany(item.company);
                          setPeriod(item.period);
                          setAchievements(item.achievements.join("\n"));
                          setCareerSkills((item.skills || []).join(", "));
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                        onClick={async () => {
                          if (!confirm("Delete this career?")) return;
                          await fetch("/cms/career/delete-career", {
                            method: "POST",
                            body: JSON.stringify({ index }),
                          });
                          loadCareer();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "education" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                {editingEducationIndex === null
                  ? "Add Education"
                  : "Edit Education"}
              </h2>

              <form onSubmit={handleEducationSubmit} className="space-y-4">
                {eduError && (
                  <div className="bg-red-100 text-red-700 p-3 rounded">
                    {eduError}
                  </div>
                )}

                <input
                  className="w-full p-3 border rounded"
                  placeholder="School / University"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Degree (e.g. B.Sc. Computer Science)"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Period (e.g. 2016 - 2020)"
                  value={eduPeriod}
                  onChange={(e) => setEduPeriod(e.target.value)}
                />

                <textarea
                  className="w-full p-3 border rounded h-32"
                  placeholder="Details (one per line)"
                  value={eduDetails}
                  onChange={(e) => setEduDetails(e.target.value)}
                />

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer">
                  {editingEducationIndex === null
                    ? "Save Education"
                    : "Update Education"}
                </button>
              </form>

              <hr className="my-8" />

              <h3 className="text-xl font-bold mb-4">Education List</h3>

              <div className="space-y-4">
                {educationList.map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold">{item.degree}</div>
                      <div className="text-sm text-gray-600">
                        {item.school} | {item.period}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                        onClick={() => {
                          setEditingEducationIndex(index);
                          setSchool(item.school);
                          setDegree(item.degree);
                          setEduPeriod(item.period);
                          setEduDetails((item.details || []).join("\n"));
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                        onClick={async () => {
                          if (!confirm("Delete this education?")) return;
                          await fetch("/cms/education/delete-education", {
                            method: "POST",
                            body: JSON.stringify({ index }),
                          });
                          loadEducation();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "project" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Add Project</h2>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                {projectError && (
                  <div className="bg-red-100 text-red-700 p-3 rounded">
                    {projectError}
                  </div>
                )}

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Project Title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                />

                <textarea
                  className="w-full p-3 border rounded h-32"
                  placeholder="Project Description"
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Tech stack (React, NestJS)"
                  value={projectTech}
                  onChange={(e) => setProjectTech(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Project Link"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                />

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Repository Link"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer">
                  {editingProjectIndex === null
                    ? "Save Project"
                    : "Update Project"}
                </button>
              </form>

              <hr className="my-8" />

              <h3 className="text-xl font-bold mb-4">Project List</h3>

              <div className="space-y-4">
                {projectList.map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded flex justify-between items-start"
                  >
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                        onClick={() => {
                          setEditingProjectIndex(index);
                          setProjectTitle(item.title);
                          setProjectDesc(item.description);
                          setProjectTech(item.tech.join(", "));
                          setProjectUrl(item.liveUrl || "");
                          setRepoUrl(item.repoUrl || "");
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                        onClick={async () => {
                          if (!confirm("Delete this project?")) return;
                          await fetch("/cms/projects/delete-project", {
                            method: "POST",
                            body: JSON.stringify({ index }),
                          });
                          loadProjects();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "blog" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                {editingBlogIndex === null ? "Add Blog" : "Edit Blog"}
              </h2>

              <form onSubmit={handleBlogSubmit} className="space-y-4">
                {blogError && (
                  <div className="bg-red-100 text-red-700 p-3 rounded">
                    {blogError}
                  </div>
                )}

                <input
                  className="w-full p-3 border rounded"
                  placeholder="Blog Title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />

                <textarea
                  className="w-full p-3 border rounded h-32"
                  placeholder="Blog Content (one per line)"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                />

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer">
                  {editingBlogIndex === null ? "Save Blog" : "Update Blog"}
                </button>
              </form>

              <hr className="my-8" />

              <h3 className="text-xl font-bold mb-4">Blog List</h3>

              <div className="space-y-4">
                {blogList.map((item, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded flex justify-between items-start"
                  >
                    <div className="max-w-xl">
                      <div className="font-bold">
                        <h3>{item.title}</h3>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>{item.story}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
                        onClick={() => {
                          setEditingBlogIndex(index);
                          setBlogTitle(item.title);
                          setBlogContent(item.story);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                        onClick={async () => {
                          if (!confirm("Delete this blog?")) return;
                          await fetch("/cms/blog/delete-blog", {
                            method: "POST",
                            body: JSON.stringify({ index }),
                          });
                          loadBlog();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "contact" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Edit Contact Info</h2>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="font-semibold block mb-1">Email</label>
                  <input
                    className="w-full p-3 border rounded"
                    placeholder="you@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">LinkedIn URL</label>
                  <input
                    className="w-full p-3 border rounded"
                    placeholder="https://linkedin.com/in/..."
                    value={contactLinkedin}
                    onChange={(e) => setContactLinkedin(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">GitHub URL</label>
                  <input
                    className="w-full p-3 border rounded"
                    placeholder="https://github.com/..."
                    value={contactGithub}
                    onChange={(e) => setContactGithub(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">Location</label>
                  <input
                    className="w-full p-3 border rounded"
                    placeholder="City, Country"
                    value={contactLocation}
                    onChange={(e) => setContactLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">
                    Resume URL (e.g. /resume.pdf)
                  </label>
                  <input
                    className="w-full p-3 border rounded"
                    placeholder="/resume.pdf"
                    value={contactResume}
                    onChange={(e) => setContactResume(e.target.value)}
                  />
                </div>

                <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 cursor-pointer">
                  Save Contact
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
