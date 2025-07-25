import express from "express"
import { addLoginUser, addRegisterUser, getAllUsers } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/register", addRegisterUser)
router.post("/login", addLoginUser)
router.get("/allusers", getAllUsers)

export default router;