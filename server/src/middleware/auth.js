import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// 본인이거나 관리자인가?
const authMiddleware = async (req, res, next) => { // 현재는 쿠키에 아이디를 넣고 있어서, 그 아이디로 유저 객체만 db에서 뽑아오면 끝.
  const { userId, id } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      userId: userId,
    }
  });
  const issue = await prisma.issue.findUnique({
    where: {
      id: id
    }
  })
  // console.log(req.body.userId);
  // console.log(req.body.id);
  // console.log(user.userId);
  // console.log(user.roleId);

  if ((user.roleId === 3) || (user.userId === issue.authorUserId) ) {
    console.log()
    next();
  } else {
    console.log('[AUTH-MIDDLEWARE] Not Authorized User');
    res.status(401).json({ error: 'Not Authorized' });
  }
}

export default authMiddleware;