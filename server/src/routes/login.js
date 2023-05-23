import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.post('/', async (req, res) => {
  console.log("로그인 백엔드 과정 진입");
  // 일단 단순히 쿠키를 저장하는 형태로 구현
  try {
    const { typedId, typedPassword } = req.body;
    const thatUser = await prisma.user.findUnique({
      where: {
        userId: typedId,
      },
    });
    if (thatUser === null) {
      return res.status(400).json({ isOK: false, error: 'noSuchUser'});
    }
    if (thatUser.password !== typedPassword) {
      return res.status(400).json({ isOK: false, error: 'wrongPassword'});
    }
    // 로그인 성공
    //res.setHeader('Set-Cookie', `loggedinId=${typedId}`);
    return res.header('Set-Cookie', `loggedinId=${typedId}`).status(200).json({ isOK: true }); //cors 문제
    //return res.status(200).json({ isOK: true, loggedinId: typedId});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ isOK: false, error: `/login 오류` });
  }
})
// role이 비어 있으면 foreign key 문제로 못 넣음! -> pgAdmin에서나 쉘에서 직접 insert 문으로 넣어줘야 함.
// (1, "regularUser"), (2, "bannedUser"), (3, admin)
export default router;
