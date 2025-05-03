<template>
  <div class="features-row">
    <a
      v-for="feature in features"
      :key="feature.title"
      :href="feature.link"
      target="_blank"
      rel="noopener noreferrer"
      class="feature-item"
    >
      <h3>{{ feature.title }}</h3>
      <!-- <p>{{ feature.details }}</p> -->
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          title: "E-Library",
          details: "Purely memes",
          link: "https://elibrary.pnc.edu.ph/home",
        },
        {
          title: "PnC Website",
          details: "Comics, Newspaper, or any kinds of media",
          link: "https://pnc.edu.ph",
        },
        {
          title: "Pinnacle",
          details: "Movies and Music",
          link: "https://pinnacle.pnc.edu.ph",
        },
      ],
    };
  },
};
</script>

<style scoped>
.features-row {
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 0;
}

.feature-item {
  flex: 1 1 10px;
  max-width: 300px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  /* padding: 0.5rem; */
  text-align: center;
  transition: background-color 0.3s;

  text-decoration: none;
  /* color: inherit; */
}

.feature-item a {
  display: block;
}

.feature-item:hover {
  background-color: #f0f0f0;
}

.feature-item h3 {
  /* margin: 0 0 0.5rem; */
  font-size: 1.2rem;
}

.feature-item p {
  margin: 0;
  font-size: 0.95rem;
}
</style>
