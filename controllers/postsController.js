import urlMetadata from "url-metadata";

import { postsRepository } from "../repositories/postsRepository.js";

export async function getAllPosts(req, res) {
  try {
    const result = await postsRepository.getAllPosts();
    res.status(200).send(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao buscar posts!");
  }
}

export async function publishNewPost(req, res) {
  const { url, description } = req.body;
  const { userId } = res.locals;
  let urlTitle = "";
  let urlDescription = "";
  let urlImage = "";
  let post = { userId, url, description };

  urlMetadata(url).then(
    async function (metadata) {
      console.log(metadata);
      urlTitle = metadata.title;
      urlDescription = metadata.description;
      if (metadata.image.startsWith("http")) {
        urlImage = metadata.image;
      } else if (metadata.image.startsWith("/")) {
        urlImage = metadata.source + metadata.image;
      } else {
        urlImage = metadata.source + "/" + metadata.image;
      }

      post = { ...post, urlTitle, urlDescription, urlImage };

      try {
        await postsRepository.insertNewPost(post);
        res.sendStatus(201);
      } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao publicar post!");
      }
    },
    function (error) {
      console.log(error);
    }
  );
}
