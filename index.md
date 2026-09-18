---

layout: default
title: Home
---

<style>
/* Home-only additions. The shared site design remains unchanged. */
.home-production-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 1.4rem;
  row-gap: 3.4rem;
  align-items: stretch;
}

.home-production-module {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.home-production-module > .production-number {
  align-self: center;
  margin: 0 auto 0.8rem;
}

.home-production-card {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  text-align: center;
}

.home-production-card h3 {
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
}

.home-production-image {
  display: block;
  width: 100%;
  height: 235px;
  margin: 0 auto 0.8rem;
  object-fit: contain;
  object-position: center;
  background: white;
  border: 2px solid var(--gray);
  border-radius: 16px;
}

.home-production-card a {
  margin-top: auto;
}

@media screen and (max-width: 980px) {
  .home-production-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 620px) {
  .home-production-grid {
    grid-template-columns: 1fr;
    row-gap: 2.8rem;
  }

  .home-production-image {
    height: 215px;
  }
}
</style>

<section class="lab-hero">
  <img src="assets/images/LabLOGO.png" alt="Piganelli Lab logo">

  <p class="production-label">A Piganelli Lab Production</p>

  <h1>The Piganelli Lab</h1>

  <p class="tagline">
    Redox Immunology • T Cell Metabolism • Type 1 Diabetes
  </p>

  <p class="hero-description">
    We study how immune cells, beta cells, oxidative stress, and metabolism interact to drive autoimmune diabetes.
  </p>

  <div class="button-row">
    <a class="button" href="research.html">Explore Research</a>
    <a class="button" href="people.html">Meet the Team</a>
    <a class="button" href="gallery.html">View Gallery</a>
  </div>
</section>

<h2 class="section-title">Now Showing</h2>

<p class="section-intro">
  Our research follows the early immune events that shape type 1 diabetes, from beta cell stress and antigen recognition to T cell activation, metabolic reprogramming, and biomarker discovery.
</p>

<section class="production-grid home-production-grid">

  <article class="home-production-module">
    <p class="production-number">Production I</p>
    <div class="production-card home-production-card">
      <h3>Redox Immunology</h3>
      <img class="home-production-image" src="{{ site.baseurl }}/assets/images/production1.png" alt="Redox immunology illustration">
      <a href="research.html">Read more</a>
    </div>
  </article>

  <article class="home-production-module">
    <p class="production-number">Production II</p>
    <div class="production-card home-production-card">
      <h3>T Cell Metabolism</h3>
      <img class="home-production-image" src="{{ site.baseurl }}/assets/images/production2.png" alt="T cell metabolism illustration">
      <a href="research.html">Read more</a>
    </div>
  </article>

  <article class="home-production-module">
    <p class="production-number">Production III</p>
    <div class="production-card home-production-card">
      <h3>Beta Cell Stress</h3>
      <img class="home-production-image" src="{{ site.baseurl }}/assets/images/production3.png" alt="Beta cell stress illustration">
      <a href="research.html">Read more</a>
    </div>
  </article>

  <article class="home-production-module">
    <p class="production-number">Production IV</p>
    <div class="production-card home-production-card">
      <h3>Early Biomarkers</h3>
      <img class="home-production-image" src="{{ site.baseurl }}/assets/images/production4.png" alt="Early biomarker illustration">
      <a href="research.html">Read more</a>
    </div>
  </article>

  <article class="home-production-module">
    <p class="production-number">Production V</p>
    <div class="production-card home-production-card">
      <h3>Antigen-Specific T Cells</h3>
      <img class="home-production-image" src="{{ site.baseurl }}/assets/images/production5.png" alt="Antigen-specific T cell illustration">
      <a href="research.html">Read more</a>
    </div>
  </article>

  <article class="home-production-module">
    <p class="production-number">Production VI</p>
    <div class="production-card home-production-card">
      <h3>Translational Models</h3>
      <img class="home-production-image" src="{{ site.baseurl }}/assets/images/production6.png" alt="Translational models illustration">
      <a href="research.html">Read more</a>
    </div>
  </article>

</section>

<h2 class="section-title">Behind the Scenes</h2>

<div class="card-grid">

  <div class="card">
    <h3>People</h3>
    <p>Meet the trainees, staff, postdoctoral fellows, and scientists who make the lab run.</p>
    <a href="people.html">Meet the team</a>
  </div>

  <div class="card">
    <h3>Publications</h3>
    <p>Explore research articles, reviews, and featured work from the Piganelli Lab.</p>
    <a href="publications.html">Read our work</a>
  </div>

  <div class="card">
    <h3>Gallery</h3>
    <p>See lab life, conference moments, research images, and a little bit of science chaos.</p>
    <a href="gallery.html">Open gallery</a>
  </div>

  <div class="card">
    <h3>Lab Values</h3>
    <p>Learn about the principles that guide our science, mentorship, and collaboration.</p>
    <a href="lab-values.html">View values</a>
  </div>

</div>
