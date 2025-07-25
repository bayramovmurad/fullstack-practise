import express from "express"
import { addLoginUser, addRegisterUser, getAllUsers, deleteUser } from "../controllers/user.controllers.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", addRegisterUser)
router.post("/login", addLoginUser)
router.get("/allusers", getAllUsers)
router.delete("/delete/:id", authMiddleware, deleteUser)

export default router;