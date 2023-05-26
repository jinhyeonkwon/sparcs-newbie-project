import { PrismaClient } from '@prisma/client'
import process from 'process'
const prisma = new PrismaClient()
async function main() {
  const role1 = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      roleName: 'regularUser',
    },
  })
  const role2 = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      roleName: 'bannedUser',
    },
  })
  const role3 = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      roleName: 'admin',
    },
  })
  const admin = await prisma.user.upsert({
    where: { userId: 'daystar' },
    update: {},
    create: {
      userId: 'daystar',
      userName: '권진현',
      password: 'kjh',
      roleId: 3,
    },
  })
  const regularUser = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      roleName: 'regularUser',
    },
  })
  const bannedUser = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 1,
      roleName: 'bannedUser',
    },
  })
  const adminUser = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 1,
      roleName: 'adminUser',
    },
  })

  // 건물 table 초기 설정
  const locationList = [
    { locationNum: 'N19', locationName: '아름관'},
    { locationNum: 'N16', locationName: '소망관'},
    { locationNum: 'N14', locationName: '사랑관'},
    { locationNum: 'N17', locationName: '성실관'},
    { locationNum: 'N18', locationName: '진리관'},
    { locationNum: 'N20', locationName: '신뢰관'},
    { locationNum: 'N21', locationName: '지혜관'},
    { locationNum: 'W6', locationName: '미르/나래관'},
    { locationNum: 'W4-4', locationName: '희망관'},
    { locationNum: 'W4-3', locationName: '다솜관'},
    { locationNum: 'E8', locationName: '세종관'},
    { locationNum: 'N11', locationName: '카이마루'},
    { locationNum: 'N10', locationName: '교양분관'},
    { locationNum: 'N12', locationName: '학사 학생회관'},
    { locationNum: 'N13', locationName: '태울관'},
    { locationNum: 'N13-1', locationName: '장영신학생회관'},
    { locationNum: 'N3', locationName: '류근철 스포츠컴플렉스'},
    { locationNum: 'N4', locationName: '디지털인문사회과학부동'},
    { locationNum: 'N2', locationName: '행정분관'},
    { locationNum: 'N1', locationName: '김병호 김삼열 IT융합빌딩'},
    { locationNum: 'N6', locationName: '교수회관'},
    { locationNum: 'E11', locationName: '창의학습관'},
    { locationNum: 'E6-5', locationName: '궁리실험관'},
    { locationNum: 'W8', locationName: '교육지원동'},
    { locationNum: 'E9', locationName: '학술문화관'},
    { locationNum: 'E21', locationName: 'KAIST 클리닉'},
    { locationNum: 'E17', locationName: '원운동장'},
    { locationNum: 'E0-1', locationName: '오리연못'}, // 건물번호 없는 건 임의로 0-1, 0-2, ... 할 거임
    { locationNum: 'E11', locationName: '창의학습관'},
    { locationNum: 'W2', locationName: '서측 학생회관'},
    { locationNum: 'E5', locationName: '교직원회관'},
  ]; 

  // locationList.forEach(async function(location) {
  //   console.log(location);
  //   const newLocation = await prisma.location.upsert({
  //     where: { locationNum: location.locationNum },
  //     update: {},
  //     create: {
  //       locationNum: location.locationNum,
  //       locationName: location.locationName,
  //     },
  //   })
  // });

  await Promise.all(locationList.map(async (location) => { // await Promise.all 하면 삽입 다 하고 연결 끊김! (순서 섞임)
    const newLocation = await prisma.location.upsert({
      where: { locationNum: location.locationNum },
      update: {},
      create: {
        locationNum: location.locationNum,
        locationName: location.locationName,
      },
    })
  }))

  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })