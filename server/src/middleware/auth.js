import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';
import authMiddleware from '../middleware/auth';

const prisma = new PrismaClient();

// 정상 유저로 로그인했는가?
const authMiddleware = async (req, res, next) => { // 현재는 쿠키에 아이디를 넣고 있어서, 그 아이디로 유저 객체만 db에서 뽑아오면 끝.
  const reqId = req.body.loggedinId;
  const user = await prisma.user.findUnique({
    where: {
      userId: reqId,
    }
  })

  if (user === null) {
    console.log('[AUTH-MIDDLEWARE] Not Authorized User');
    res.status(401).json({ error: 'Not Authorized' });
  } else {
    console.log()
    next();
  }
}

module.exports = authMiddleware;