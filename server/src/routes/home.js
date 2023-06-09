import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';
import banMiddleware from '../middleware/ban.js'; // 밴이나 로그인 안 한 경우도 체크
import authMiddleware from '../middleware/auth.js'; // 수정이나 삭제 시, 본인이거나 관리자인가

const prisma = new PrismaClient();

const router = express.Router();

router.post('/getissuelist', async (req, res) => {
  try {
    const locFilter = req.body.locFilter;
    //console.log('getissuelist 진입')
    //console.log(locFilter);
    const issueList = await prisma.issue.findMany({
      where: locFilter,
    });
    //console.log(issueList);
    return res.status(200).json({issueList: issueList});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})

router.post('/getlocnumlist', (req, res) => {
  try {
    const locFilter = req.body.locFilter;
    //console.log('getlocnumlist 진입')
    const locList = prisma.issue.findMany();
    //console.log(locList);
    //const locNumList = locList.map((loc) => {loc.});
    return res.status(200).json({locList: locList});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})

router.post('/deleteissue', banMiddleware, authMiddleware, async (req, res) => {
  try {
    const { deleteIssueId, userId, id } = req.body;
    const deleteIssue = await prisma.issue.delete({
      where: {
        id: deleteIssueId,
      }
    });
    //console.log(deleteIssue);
    return res.status(200).json({isOk: true});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})

router.post('/createissue', banMiddleware, async (req, res) => {
  //console.log(req.body);
  const curr = new Date();
  const utc = curr.getTime() + 9*60*60*1000; // 한국 시간대 맞추려고..
  try {
    const {title, content, locationNum, startTime, endTime, authorUserId, userId } = req.body;
    const newIssue = {
      title: title,
      content: content,
      locationNum: locationNum,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      authorUserId: authorUserId,
      createdAt: new Date(utc).toISOString(),
      modifiedAt: new Date(utc).toISOString(),
    }
    const createIssue = await prisma.issue.create({
      data: newIssue,
    });
    //console.log(createIssue);
    return res.status(200).json({isOk: true});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})

router.post('/editissue', banMiddleware, authMiddleware, async (req, res) => {
  //console.log('edit 진입');
  try {
    const { id, title, content, locationNum, startTime, endTime, authorUserId, userId } = req.body;
    const curr = new Date();
    const utc = curr.getTime() + 9*60*60*1000; // 한국 시간대 맞추려고..
    const newIssue = {
      id: id,
      title: title,
      content: content,
      locationNum: locationNum,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      authorUserId: authorUserId,
      modifiedAt: new Date(utc).toISOString(),
    }
    const editIssue = await prisma.issue.update({
      where: {
        id: id,
      },
      data: newIssue,
    })
    return res.status(200).json({isOk: true});
  } catch (e) {
    console.log(e);
    return res.status(500).json({error: e});
  }
})

router.post('/getroleid', async (req, res) => {
  console.log('roleid 확인 진입');
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
      return res.status(200).json({roleId: null});
    } else {
      return res.status(200).json({roleId: thatUser.roleId});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `isexists 오류` });
  }
})

router.post('/getusername', async (req, res) => {
  //console.log('roleid 확인 진입');
  try {
    const userId = req.query.userId;
    //console.log(`userId : ${userId}`);
    const thatUser = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
    if (thatUser === null) {
      return res.status(200).json({userName: null});
    } else {
      return res.status(200).json({userName: thatUser.userName});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: `isexists 오류` });
  }
})





export default router;