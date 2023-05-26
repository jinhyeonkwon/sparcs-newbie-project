import express, { urlencoded } from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// 밴이 아닌 유저로 로그인했는가?
const banMiddleware = async (req, res, next) => { // 현재는 쿠키에 아이디를 넣고 있어서, 그 아이디로 유저 객체만 db에서 뽑아오면 끝.
  const reqId = req.body.userId;
  const user = await prisma.user.findUnique({
    where: {
      userId: reqId,
    }
  })

  if (user === null || user.roleId !== 1 && user.roleId !== 3) {
    console.log('[BAN-MIDDLEWARE] Not Authorized');
    res.status(401).json({ error: 'Not Authorized' });
  } else {
    console.log()
    next();
  }
}

export default banMiddleware;

