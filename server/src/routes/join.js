import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.post('/isexists', async (req, res) => {
  console.log("존재 여부 확인 진입");
  try {
    const userId = req.query.userId;
    console.log(`userId : ${userId}`);
    const thatUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    console.log(`thatUser === null : ${thatUser === null}`);
    if (thatUser === null) {
      return res.status(200).json({isExists:false});
    } else {
      return res.status(200).json({isExists:true});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `isexists 오류` });
  }
})

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
    // console.log(user);
    // // console.log(prisma)
    // console.log(prisma.$exists);

    // const userIdExists = await prisma.$exists.user({ // 이미 존재하는 아이디면 가입을 허용하지 말자!
    //   userId: userId
    // })

    // if (userIdExists) {
    //   return res.status(400).json({errorType: 'userIdExists'});
    // }

    const createUser = await prisma.user.create({
      data: user,
    }); // roleId = 1 : 일반 유저

    return res.status(200).json({isOK:true});
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `adduser 오류` });
  }
})
// role이 비어 있으면 foreign key 문제로 못 넣음! -> pgAdmin에서나 쉘에서 직접 insert 문으로 넣어줘야 함.
// (1, "regularUser"), (2, "bannedUser"), (3, admin)
export default router;
