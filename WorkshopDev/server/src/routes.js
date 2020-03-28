import { Router } from "express";

const routes = Router();

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
    title: "MAIOOORursos de programação",
    category: "Estudo",
    description: "Descrição da ideia tal",
    url: "https://www.google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
    title: "123Cursos de programação",
    category: "Estudo",
    description: "Descrição da ideia tal",
    url: "https://www.google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
    title: "2Cursos de programação",
    category: "Estudo",
    description: "Descrição da ideia tal",
    url: "#"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2728/2728995.svg",
    title: "3Cursos de programação",
    category: "Estudo",
    description: "Descrição da ideia tal",
    url: "#"
  }
];

routes.get("/", (req, res) => {
  const lastIdeas = [];

  const reversedIdeas = [...ideas].reverse();

  for (let idea of reversedIdeas) {
    if (lastIdeas.length > 2) {
      break;
    }

    lastIdeas.push(idea);
  }

  return res.render("index", {
    lastIdeas
  });
});

routes.get("/ideias", (req, res) => {
  const reversedIdeas = [...ideas].reverse();

  return res.render("ideias", { ideas: reversedIdeas });
});

export default routes;
