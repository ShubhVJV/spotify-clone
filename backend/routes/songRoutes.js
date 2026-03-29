import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";

import {
  addSong,
  addThumbnail,
  createAlbum,
  deleteSong,
  getAllAlbums,
  getAllSongs,
  getAllSongsByAlbum,
  getSingleSong,
} from "../controllers/songControllers.js";

const router = express.Router();

// 🔹 Album Routes
router.post("/album/new", isAuth, uploadFile, createAlbum);
router.get("/album/all", isAuth, getAllAlbums);

// 🔹 Song Routes
router.post("/new", isAuth, uploadFile, addSong);
router.post("/:id", isAuth, uploadFile, addThumbnail);

// 🔹 Fetch Routes
router.get("/all", isAuth, getAllSongs);
router.get("/album/:id", isAuth, getAllSongsByAlbum);
router.get("/:id", isAuth, getSingleSong); // ✅ FIXED (this was missing)

// 🔹 Delete Route
router.delete("/:id", isAuth, deleteSong);

export default router;