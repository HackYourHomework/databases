const faker = require('faker');

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .slice(0, 10);
}

const authorDetails = [];
for (i = 0; i < 15; i++) {
  const firstNameRandom = faker.name.firstName();
  const lastNameRandom = faker.name.lastName();
  const randomUniversity = faker.address.country();
  const hIndexRandom = faker.random.float();
  const maleOrFemale = ['m', 'f'];
  const genderRandom = faker.random.arrayElement(maleOrFemale);

  authorDetails.push([
    firstNameRandom + ' ' + lastNameRandom,
    randomUniversity + ' university',
    randomDate(new Date(1950, 0, 1), new Date(2000, 0, 1)),
    hIndexRandom,
    genderRandom,
  ]);
}

// const mentorDetails = [];
// for (i = 0; i < 15; i++) {
//   const randomMentorNumber = Math.floor(Math.random() * 15) + 1;

//   mentorDetails.push([randomMentorNumber]);
// }

const researchDetails = [];
for (i = 0; i < 30; i++) {
  const paperTitleRandom = faker.name.title();
  const conferenceRandom = faker.name.title();

  researchDetails.push([
    paperTitleRandom + ' Research',
    conferenceRandom + ' Conference',
    randomDate(new Date(2010, 0, 1), new Date(2021, 0, 1)),
  ]);
}

const authorResearchRelation = [];
for (i = 0; i < 30; i++) {
  while (authorResearchRelation.length < 30) {
    const randomAuthorNumber = Math.floor(Math.random() * 15) + 1;
    const randomResearchId = Math.floor(Math.random() * 30) + 1;
    authorResearchRelation.push([randomAuthorNumber, randomResearchId]);
  }
}

module.exports.authorDetails = authorDetails;
// module.exports.mentorDetails = mentorDetails;
module.exports.researchDetails = researchDetails;
module.exports.authorResearchRelation = authorResearchRelation;
