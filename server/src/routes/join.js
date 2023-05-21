import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.post('/adduser', async (req, res) => { // 한번 해봤는데 
  console.log("라우터 진입");
  try {
    const { userId, name, password } = req.body;
    console.log(`${userId}, ${name}, ${password}`);
    const user = {
      userId: userId,
      userName: name,
      password: password,
      roleId: 1
    };
    console.log(user);

    const createUser = await prisma.user.create({
      data: user,
    }); // roleId = 1 : 일반 유저

    return res.status(200).json({isOK:true});
  } catch (e) {
    return res.status(500).json({ error: `adduser 오류, ${e}` });
  }
})

export default router;
