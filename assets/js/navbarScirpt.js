const navigation = document.querySelector(".navigation-overlay");
const hamburgerButton = document.querySelector(".hamburger-button");
const profileImage = document.querySelector(".hero .profile-photo");
const slides = Array.from(document.querySelectorAll(".slide-stage > section"));
const navigationLinks = Array.from(document.querySelectorAll(".navigation a[href^='#']"));
const slideCounter = document.querySelector(".slide-counter");
const slideCurrent = document.querySelector("#slide-current");
const projectCards = Array.from(document.querySelectorAll(".portofolio .card"));
const projectPrevious = document.querySelector("#project-previous");
const projectNext = document.querySelector("#project-next");
const projectPageLabel = document.querySelector("#project-page-label");
const projectsPerPage = 4;
let currentProjectPage = 0;
const skillPages = Array.from(document.querySelectorAll("[data-skill-page]"));
const skillPrevious = document.querySelector("#skill-previous");
const skillNext = document.querySelector("#skill-next");
const skillPageLabel = document.querySelector("#skill-page-label");
let currentSkillPage = 0;

const updateSlideCounterLabel = (slideIndex) => {
  if (!slideCounter) {
    return;
  }

  const language = document.documentElement.lang || "id";
  const label = language === "en" ? "Slide" : "Bagian";
  const from = language === "en" ? "of" : "dari";
  slideCounter.setAttribute("aria-label", `${label} ${slideIndex} ${from} ${slides.length}`);
};

const translations = {
  navProfile: { id: "Profil", en: "Profile" },
  navAbout: { id: "Tentang Saya", en: "About Me" },
  navPortfolio: { id: "Portofolio", en: "Portfolio" },
  navExperience: { id: "Pengalaman", en: "Experience" },
  navSkills: { id: "Keterampilan", en: "Skills" },
  navEducation: { id: "Pendidikan", en: "Education" },
  navContact: { id: "Kontak Saya", en: "Contact" },
  navigationLabel: { id: "Navigasi utama", en: "Main navigation" },
  languageLabel: { id: "Pilih bahasa", en: "Choose language" },
  menuOpenLabel: { id: "Buka menu", en: "Open menu" },
  menuCloseLabel: { id: "Tutup menu", en: "Close menu" },
  projectPrevious: { id: "← Sebelumnya", en: "← Previous" },
  projectNext: { id: "Berikutnya →", en: "Next →" },
  projectPage: { id: "Halaman {current} dari {total}", en: "Page {current} of {total}" },
  skillsPaginationLabel: { id: "Navigasi halaman keterampilan", en: "Skills page navigation" },
  technicalSkillsTitle: { id: "Kemampuan Teknis", en: "Technical Skills" },
  technicalSkill1: { id: "Web Developer", en: "Web Developer" },
  technicalSkill2: { id: "Programmer", en: "Programmer" },
  technicalSkill3: { id: "IT Support", en: "IT Support" },
  technicalSkill4: { id: "Administrasi Pengelolaan Dokumen dan Laporan", en: "Document and Report Administration" },
  technicalSkill5: { id: "Data Entry", en: "Data Entry" },
  technicalSkill6: { id: "Operasional Produksi", en: "Production Operations" },
  technicalSkill7: { id: "Kontrol Kualitas Dasar", en: "Basic Quality Control" },
  softwareSkillsTitle: { id: "Kemampuan Software", en: "Software Skills" },
  softSkillsTitle: { id: "Soft Skills", en: "Soft Skills" },
  softSkill1: { id: "Adaptabilitas", en: "Adaptability" },
  softSkill2: { id: "Manajemen Waktu", en: "Time Management" },
  softSkill3: { id: "Problem Solving", en: "Problem Solving" },
  softSkill4: { id: "Kreativitas", en: "Creativity" },
  softSkill5: { id: "Komunikasi", en: "Communication" },
  softSkill6: { id: "Empati", en: "Empathy" },
  softSkill7: { id: "Kerja Sama Tim", en: "Teamwork" },
  profilePhotoAlt: { id: "Foto profil Muhammad Rizky Maulana", en: "Profile photo of Muhammad Rizky Maulana" },
  pageTitle: { id: "Portofolio | Muhammad Rizky Maulana", en: "Portfolio | Muhammad Rizky Maulana" },
  heroGreeting: { id: "Halo, saya", en: "Hello, I'm" },
  heroRole: { id: "Web Developer dan Data Entry", en: "Web Developer and Data Entry" },
  heroIntro: {
    id: "Selamat datang di portofolio saya!",
    en: "Welcome to my portfolio!",
  },
  heroPortfolioButton: { id: "Portofolio", en: "Portfolio" },
  heroContactButton: { id: "Kontak Saya", en: "Contact Me" },
  downloadCv: { id: "Unduh CV (PDF)", en: "Download CV (PDF)" },
  aboutTitle: { id: "TENTANG SAYA", en: "ABOUT ME" },
  aboutText: {
    id: "Saya merupakan lulusan Sarjana (S1) Teknik Informatika yang berfokus pada pengembangan aplikasi web, pengelolaan basis data, dan efisiensi operasional. Berpengalaman merancang serta mengimplementasikan sistem berbasis PHP, JavaScript, dan MySQL melalui proyek Kerja Praktik (KP) serta Skripsi menggunakan metode Analytical Hierarchy Process (AHP).<br><br>Tak hanya di bidang koding, saya juga menerapkan pengelolaan data dan dokumen menggunakan Microsoft Office (Word, Excel, PowerPoint) yang diasah melalui kegiatan Pengabdian Kepada Masyarakat (PKM) sebagai pemateri pelatihan.<br><br>Didukung pengalaman kerja operasional industri sebagai Operator Mixing, saya memiliki ketelitian tinggi, etos kerja yang kuat, dan kedisiplinan terhadap SOP. Saya selalu terbuka untuk berkolaborasi dan berkontribusi dalam proyek pengembangan web, pengolahan data (data entry), maupun dukungan sistem IT.",
    en: "I hold a Bachelor's degree in Informatics Engineering, with a focus on web application development, database management, and operational efficiency. I have designed and implemented PHP-, JavaScript-, and MySQL-based systems through an internship project and a thesis using the Analytical Hierarchy Process (AHP).<br><br>Beyond coding, I use Microsoft Office (Word, Excel, and PowerPoint) to manage data and documents, skills I developed further as a trainer in a community service program.<br><br>My industrial operations experience as a Mixing Operator has strengthened my attention to detail, work ethic, and discipline in following standard operating procedures. I am open to collaborating on web development, data entry, and IT support projects.",
  },
  portfolioTitle: { id: "PORTOFOLIO", en: "PORTFOLIO" },
  portfolioIntro: {
    id: "Portofolio saya mencakup berbagai proyek dan produktivitas yang menunjukkan kemampuan dan pengalaman saya.",
    en: "My portfolio comprises a range of projects and work samples that demonstrate my skills and experience.",
  },
  projectDescription1: { id: "Pengabdian Kepada Masyarakat: Pelatihan Komputer menggunakan Microsoft Office kepada siswa-siswi", en: "Community Service: Microsoft Office computer training for students." },
  projectDescription2: { id: "Kerja Praktik: Merancang Sistem Aplikasi Asuransi Keluarga Berbasis Web PT. Mitra Proteksi Madani", en: "Internship: Designing a web-based family insurance application system for PT Mitra Proteksi Madani." },
  projectDescription3: { id: "Proyek Skripsi: Pengembangan Sistem Pendukung Keputusan Pemilihan Anime Terbaik Menggunakan Metode Analytic Hierarchy Process pada Platform Bstation", en: "Thesis Project: Developing a decision support system to select the best anime using the Analytic Hierarchy Process on the Bstation platform." },
  projectDescription4: { id: "Membuat dan merancang sistem informasi perpustakaan", en: "Creating and designing a library information system." },
  projectDescription5: { id: "Membuat data anime terintegrasi untuk diimplementasikan pada proyek skripsi tentang sistem pendukung keputusan pemilihan anime terbaik menggunakan metode Analytic Hierarchy Process pada platform Bstation.", en: "Preparing integrated anime data for a thesis project on a decision support system that selects the best anime using the Analytic Hierarchy Process on the Bstation platform." },
  projectDescription6: { id: "Membuat logo untuk toko online", en: "Creating a logo for an online store." },
  projectDescription7: { id: "Membuat banner untuk kedai", en: "Creating a banner for a cafe." },
  projectDescription8: { id: "Membuat poster untuk menyambut Hari Kemerdekaan Indonesia", en: "Creating a poster to celebrate Indonesia's Independence Day." },
  projectDescription9: { id: "Membuat desain promosi untuk toko online", en: "Creating promotional designs for an online store." },
  projectDescription10: { id: "Membuat menu makanan dan minuman untuk kedai", en: "Creating a food and drink menu for a cafe." },
  projectDescription11: { id: "Pelatihan Google (Gapura Digital): Tips memasarkan produk secara online di platform e-commerce", en: "Google Training (Gapura Digital): Tips for marketing products online on e-commerce platforms." },
  projectDescription12: { id: "Uji kompetensi pemrograman dari Lembaga Sertifikasi Profesi (LSP UNPAM), berlisensi BNSP", en: "Programming competency assessment by the Professional Certification Institute (LSP UNPAM), licensed by BNSP." },
  viewDetails: { id: "Lihat Detail", en: "View Details" },
  experienceTitle: { id: "PENGALAMAN", en: "EXPERIENCE" },
  experienceIntro: {
    id: "Pengalaman kerja saya mencakup berbagai bidang yang memungkinkan saya untuk mengembangkan keterampilan dan pengetahuan yang relevan.",
    en: "My work experience spans several areas and has helped me develop relevant skills and knowledge.",
  },
  experienceRole: { id: "Operator Mixing", en: "Mixing Operator" },
  experienceDuty1: { id: "Mengoperasikan dan melakukan perawatan harian mesin pencampur berkapasitas besar sesuai SOP perusahaan.", en: "Operate and perform daily maintenance on large-capacity mixing machines in accordance with company SOPs." },
  experienceDuty2: { id: "Menimbang dan mencampur bahan baku berdasarkan formula produksi dengan tingkat akurasi 100%.", en: "Weigh and mix raw materials according to production formulas with 100% accuracy." },
  experienceDuty3: { id: "Menjaga konsistensi dan kualitas campuran untuk meminimalkan cacat produk sebelum material diteruskan ke proses produksi berikutnya.", en: "Maintain mixture consistency and quality to minimize product defects before materials move to the next production stage." },
  experienceDuty4: { id: "Menerapkan standar K3 secara disiplin demi menjaga lingkungan kerja yang aman dan produktif.", en: "Follow occupational health and safety standards to maintain a safe, productive workplace." },
  skillsTitle: { id: "KEMAMPUAN & KETERAMPILAN", en: "ABILITIES & SKILLS" },
  skillsIntro: {
    id: "Keterampilan yang saya miliki mencakup berbagai aspek teknis dan interpersonal yang memungkinkan saya untuk berkontribusi secara efektif dalam lingkungan kerja yang dinamis.",
    en: "My skill set combines technical and interpersonal abilities that help me contribute effectively in a dynamic work environment.",
  },
  educationTitle: { id: "PENDIDIKAN", en: "EDUCATION" },
  educationIntro: {
    id: "Pendidikan sebagai fondasi utama dalam membentuk individu yang kompeten dan berpengetahuan luas. Melalui pendidikan, seseorang tidak hanya memperoleh pengetahuan akademis, tetapi juga keterampilan sosial, etika, dan kemampuan berpikir kritis yang diperlukan untuk menghadapi tantangan kehidupan.",
    en: "Education is the cornerstone of shaping competent and well-informed individuals. Through education, a person not only acquires academic knowledge, but also the social skills, ethical values and critical thinking skills needed to face life’s challenges."
  },
  educationPhotoAlt: { id: "Foto Muhammad Rizky Maulana", en: "Photo of Muhammad Rizky Maulana" },
  educationDegree: { id: "Teknik Informatika - IPK: 3.37", en: "Informatics Engineering - GPA: 3.37" },
  educationThesisTitle: { id: "Skripsi dan Publikasi Ilmiah", en: "Thesis and Scientific Publication" },
  educationThesis: {
    id: "“Pengembangan Sistem Pendukung Keputusan Pemilihan Anime Terbaik Menggunakan Metode Analytic Hierarchy Process Pada Platform Bstation” — dipublikasikan pada Jurnal Informatika dan Teknik Elektro Terapan, Vol. 14 No. 3, Agustus 2026, terakreditasi SINTA 5.",
    en: "“Development of a Decision Support System for Selecting the Best Anime Using the Analytic Hierarchy Process on the Bstation Platform” — published in Jurnal Informatika dan Teknik Elektro Terapan, Vol. 14 No. 3, August 2026; accredited SINTA 5.",
  },
  educationInternshipTitle: { id: "Kegiatan Mata Kuliah Kerja Praktik (KP)", en: "Internship (KP) Course Project" },
  educationInternship: {
    id: "Merancang dan membuat sistem “Perancangan Sistem Aplikasi Asuransi Keluarga Berbasis Web di PT. Mitra Proteksi Madani” pada September 2024.",
    en: "Designed and developed “Design of a Web-Based Family Insurance Application System at PT Mitra Proteksi Madani” in September 2024.",
  },
  educationCommunityTitle: { id: "Kegiatan Pengabdian Kepada Masyarakat (PKM)", en: "Community Service (PKM) Activity" },
  educationCommunity: {
    id: "Anggota dan pemateri “Pelatihan Komputer Menggunakan Microsoft Office kepada Siswa-Siswi MAN 1 Lebak, Banten” pada Maret 2024.",
    en: "Participated as a member and trainer in “Microsoft Office Computer Training for Students of MAN 1 Lebak, Banten” in March 2024.",
  },
  educationSchoolProgram: { id: "Teknik Kendaraan Ringan dan Otomotif", en: "Light Vehicle Engineering and Automotive" },
  contactTitle: { id: "KONTAK SAYA", en: "CONTACT ME" },
  contactIntro: { id: "Silakan melihat media sosial saya dengan mengeklik ikon di bawah ini:", en: "Connect with me on social media by clicking an icon below:" },
  contactInvite: { id: "Ayo kita berdiskusi", en: "Let's talk" },
  footerCopyright: { id: "© 2026 - [Muhammad Rizky Maulana].", en: "© 2026 - [Muhammad Rizky Maulana]." },
};

const updateProjectPagination = () => {
  if (!projectCards.length) {
    return;
  }

  const pageCount = Math.ceil(projectCards.length / projectsPerPage);
  projectCards.forEach((card, index) => {
    const isVisible = Math.floor(index / projectsPerPage) === currentProjectPage;
    card.hidden = !isVisible;
    card.inert = !isVisible;
  });

  if (projectPrevious) {
    projectPrevious.disabled = currentProjectPage === 0;
  }
  if (projectNext) {
    projectNext.disabled = currentProjectPage >= pageCount - 1;
  }
  if (projectPageLabel) {
    const language = document.documentElement.lang || "id";
    projectPageLabel.textContent = translations.projectPage[language]
      .replace("{current}", String(currentProjectPage + 1))
      .replace("{total}", String(pageCount));
  }
};

const updateSkillPagination = () => {
  if (!skillPages.length) {
    return;
  }

  skillPages.forEach((page, index) => {
    const isVisible = index === currentSkillPage;
    page.hidden = !isVisible;
    page.inert = !isVisible;
  });

  if (skillPrevious) {
    skillPrevious.disabled = currentSkillPage === 0;
  }
  if (skillNext) {
    skillNext.disabled = currentSkillPage >= skillPages.length - 1;
  }
  if (skillPageLabel) {
    const language = document.documentElement.lang || "id";
    skillPageLabel.textContent = translations.projectPage[language]
      .replace("{current}", String(currentSkillPage + 1))
      .replace("{total}", String(skillPages.length));
  }
};

const activateSlide = (slideId, updateUrl = false) => {
  const activeSlide = slides.find((slide) => slide.id === slideId);
  if (!activeSlide) {
    return false;
  }

  slides.forEach((slide) => {
    const isActive = slide === activeSlide;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.inert = !isActive;
  });

  navigationLinks.forEach((link) => {
    const isActive = link.hash === `#${slideId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const slideIndex = slides.indexOf(activeSlide) + 1;
  if (slideCurrent) {
    slideCurrent.textContent = String(slideIndex).padStart(2, "0");
  }
  updateSlideCounterLabel(slideIndex);

  if (updateUrl && window.location.hash !== `#${slideId}`) {
    window.history.pushState({ slideId }, "", `#${slideId}`);
  }
  if (updateUrl) {
    const heading = activeSlide.querySelector("h1");
    heading?.setAttribute("tabindex", "-1");
    heading?.focus({ preventScroll: true });
  }

  return true;
};

const getMenuLabel = (isOpen) => {
  const activeLanguage = document.documentElement.lang || "id";
  const key = isOpen ? "menuCloseLabel" : "menuOpenLabel";
  return translations[key]?.[activeLanguage] || translations[key]?.id || "Buka menu";
};

const updateHamburgerAria = (isOpen = false) => {
  if (!hamburgerButton) {
    return;
  }

  hamburgerButton.setAttribute("aria-expanded", String(isOpen));
  hamburgerButton.setAttribute("aria-label", getMenuLabel(isOpen));
};

const setLanguage = (language) => {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const translation = translations[element.dataset.i18n]?.[language];
    if (translation === undefined) {
      return;
    }

    if (element.dataset.i18nHtml === "true") {
      element.innerHTML = translation;
    } else {
      element.textContent = translation;
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const translatedLabel = translations[element.dataset.i18nAria]?.[language];
    if (translatedLabel !== undefined) {
      element.setAttribute("aria-label", translatedLabel);
    }
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const translatedAlt = translations[element.dataset.i18nAlt]?.[language];
    if (translatedAlt !== undefined) {
      element.setAttribute("alt", translatedAlt);
    }
  });
  document.title = translations.pageTitle[language];

  document.querySelectorAll("[data-language]").forEach((button) => {
    const isSelected = button.dataset.language === language;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  updateHamburgerAria(Boolean(navigation && navigation.classList.contains("active")));
  updateProjectPagination();
  updateSkillPagination();
  updateSlideCounterLabel(slides.findIndex((slide) => slide.classList.contains("is-active")) + 1);

  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    // Language switching still works if browser storage is unavailable.
  }

  document.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language } }));
};

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

let initialLanguage = "id";
try {
  initialLanguage = localStorage.getItem("portfolio-language") || initialLanguage;
} catch {
  // Use Indonesian when browser storage is unavailable.
}
if (!translations.navProfile[initialLanguage]) {
  initialLanguage = "id";
}
setLanguage(initialLanguage);

const updateProfilePhotoAlt = () => {
  if (!profileImage) {
    return;
  }

  profileImage.alt = translations.profilePhotoAlt[document.documentElement.lang];
};

document.addEventListener("portfolio-language-change", updateProfilePhotoAlt);
updateProfilePhotoAlt();

function putarMusik1() {
            var audio1 = document.getElementById("audio1");
            var audio2 = document.getElementById("audio2");

            // Matikan musik kedua jika sedang menyala
            audio2.pause();
            audio2.currentTime = 0;

            if (audio1.paused) {
                audio1.play();
            } else {
                audio1.pause();
            }
        }

        // Fungsi untuk Foto 2
        function putarMusik2() {
            var audio1 = document.getElementById("audio1");
            var audio2 = document.getElementById("audio2");

            // Matikan musik pertama jika sedang menyala
            audio1.pause();
            audio1.currentTime = 0;

            if (audio2.paused) {
                audio2.play();
            } else {
                audio2.pause();
            }
        }
        
const closeNavigation = () => {
  if (!navigation || !hamburgerButton) {
    return;
  }

  navigation.classList.remove("active");
  hamburgerButton.classList.remove("active");
  updateHamburgerAria(false);
};

if (hamburgerButton) {
  hamburgerButton.addEventListener("click", () => {
    if (!navigation) {
      return;
    }

    const isOpen = !navigation.classList.contains("active");
    navigation.classList.toggle("active", isOpen);
    hamburgerButton.classList.toggle("active", isOpen);
    updateHamburgerAria(isOpen);
  });
}

if (navigation) {
  navigation.addEventListener("click", (event) => {
    const clickedElement = event.target instanceof Element ? event.target : null;
    if (event.target === navigation || clickedElement?.closest("a")) {
      closeNavigation();
    }
  });
}

document.addEventListener("click", (event) => {
  if (!hamburgerButton || !navigation) {
    return;
  }

  if (!hamburgerButton.contains(event.target) && !navigation.contains(event.target)) {
    closeNavigation();
  }
});

document.addEventListener("click", (event) => {
  const clickedElement = event.target instanceof Element ? event.target : null;
  const link = clickedElement?.closest("a[href^='#']");
  if (!link) {
    return;
  }

  const slideId = decodeURIComponent(link.hash.slice(1));
  if (!slides.some((slide) => slide.id === slideId)) {
    return;
  }

  event.preventDefault();
  activateSlide(slideId, true);
  closeNavigation();
});

if (projectPrevious) {
  projectPrevious.addEventListener("click", () => {
    currentProjectPage = Math.max(0, currentProjectPage - 1);
    updateProjectPagination();
  });
}

if (projectNext) {
  projectNext.addEventListener("click", () => {
    const pageCount = Math.ceil(projectCards.length / projectsPerPage);
    currentProjectPage = Math.min(pageCount - 1, currentProjectPage + 1);
    updateProjectPagination();
  });
}

if (skillPrevious) {
  skillPrevious.addEventListener("click", () => {
    currentSkillPage = Math.max(0, currentSkillPage - 1);
    updateSkillPagination();
  });
}

if (skillNext) {
  skillNext.addEventListener("click", () => {
    currentSkillPage = Math.min(skillPages.length - 1, currentSkillPage + 1);
    updateSkillPagination();
  });
}

const activateSlideFromLocation = () => {
  const requestedSlide = decodeURIComponent(window.location.hash.slice(1));
  activateSlide(slides.some((slide) => slide.id === requestedSlide) ? requestedSlide : "home");
};

document.documentElement.classList.add("has-slides");
document.querySelector("#slide-total").textContent = String(slides.length).padStart(2, "0");
updateProjectPagination();
updateSkillPagination();
activateSlideFromLocation();
window.addEventListener("popstate", activateSlideFromLocation);
window.addEventListener("hashchange", activateSlideFromLocation);
