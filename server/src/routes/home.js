import express from "express";
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

router.post('/getissuelist', async (req, res) => {
  try {
    const locFilter = req.body.locFilter;
    console.log('getissuelist 진입')
    console.log(locFilter);
    const issueList = await prisma.issue.findMany({
      where: locFilter,
    });
    console.log(issueList);
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
    console.log('getlocnumlist 진입')
    const locList = prisma.issue.findMany();
    console.log(locList);
    //const locNumList = locList.map((loc) => {loc.});
    return res.status(200).json({locList: locList});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})

router.post('/deleteissue', async (req, res) => {
  try {
    const deleteIssueId = req.body.deleteIssueId;
    const deleteIssue = await prisma.issue.delete({
      where: {
        id: deleteIssueId,
      }
    });
    console.log(deleteIssue);
    return res.status(200).json({isOk: true});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})

router.post('/createissue', async (req, res) => {
  console.log(req.body);
  try {
    const {title, content, locationNum, startTime, endTime, authorUserId } = req.body;
    const newIssue = {
      title: title,
      content: content,
      locationNum: locationNum,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      authorUserId: authorUserId
    }
    const createIssue = await prisma.issue.create({
      data: newIssue,
    });
    console.log(createIssue);
    return res.status(200).json({isOk: true});
  }
  catch (e) {
    console.log(e);
    return res.status(500).json({ error: e });
  }
  

})





export default router;