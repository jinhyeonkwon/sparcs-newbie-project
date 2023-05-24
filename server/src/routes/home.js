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





export default router;