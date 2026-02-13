const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
	const isOpen = navLinks.classList.toggle("open");
	menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("show");
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.15 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

const toggleCta = document.querySelector(".toggle-cta");

if (toggleCta) {
	toggleCta.addEventListener("click", () => {
		toggleCta.classList.toggle("is-toggled");
	});
}

const backToTopBtn = document.querySelector(".back-to-top-btn");
const mobileMq = window.matchMedia("(max-width: 720px)");

if (backToTopBtn) {
	backToTopBtn.addEventListener("click", () => {
		if (!mobileMq.matches) {
			backToTopBtn.classList.toggle("is-toggled");
		}
	});
}

const updateBackToTopVisibility = () => {
	if (!backToTopBtn) {
		return;
	}
	if (!mobileMq.matches) {
		backToTopBtn.classList.remove("is-visible");
		return;
	}
	const doc = document.documentElement;
	const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 120;
	backToTopBtn.classList.toggle("is-visible", nearBottom);
};

if (backToTopBtn) {
	window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
	window.addEventListener("resize", updateBackToTopVisibility);
	mobileMq.addEventListener("change", updateBackToTopVisibility);
	updateBackToTopVisibility();
}
