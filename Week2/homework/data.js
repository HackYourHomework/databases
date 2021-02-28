const faker = require('faker');

const authorName = [];
for (i = 0; i < 15; i++) {
  const firstNameRandom = faker.name.firstName();
  const lastNameRandom = faker.name.lastName();

  authorName.push(firstNameRandom + ' ' + lastNameRandom);
}

const universityName = [];
for (i = 0; i < 15; i++) {
  const randomUniversity = faker.address.country();
  universityName.push(randomUniversity + ' university');
}

const dateOfBirth = [];
for (i = 0; i < 15; i++) {
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toISOString()
      .slice(0, 10);
  }
  dateOfBirth.push(randomDate(new Date(1950, 0, 1), new Date(2000, 0, 1)));
}

const hIndex = [];
for (i = 0; i < 15; i++) {
  const hIndexRandom = faker.random.float();
  hIndex.push(hIndexRandom);
}

const gender = [];
for (i = 0; i < 15; i++) {
  const maleOrFemale = ['m', 'f'];

  const genderRandom = faker.random.arrayElement(maleOrFemale);
  gender.push(genderRandom);
}

const paperTitle = [];
for (i = 0; i < 30; i++) {
  const paperTitleRandom = faker.name.title();
  paperTitle.push(paperTitleRandom + ' Research');
}

const conferenceName = [];
for (i = 0; i < 30; i++) {
  const conferenceRandom = faker.name.title();
  conferenceName.push(conferenceRandom + ' Conference');
}

const publishDate = [];
for (i = 0; i < 30; i++) {
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toISOString()
      .slice(0, 10);
  }
  publishDate.push(randomDate(new Date(2010, 0, 1), new Date(2021, 0, 1)));
}

const mentorNo = [];
for (i = 0; i < 15; i++) {
  while (mentorNo.length < 15) {
    let randomNumber = Math.floor(Math.random() * 15) + 1;
    if (mentorNo.indexOf(randomNumber) === -1) mentorNo.push(randomNumber);
  }
}

const authorNo = [];
for (i = 0; i < 30; i++) {
  while (authorNo.length < 30) {
    let randomAuthorNumber = Math.floor(Math.random() * 15) + 1;
    authorNo.push(randomAuthorNumber);
  }
}

const researchId = [];
for (i = 0; i < 30; i++) {
  while (researchId.length < 30) {
    let randomResearchId = Math.floor(Math.random() * 30) + 1;
    if (researchId.indexOf(randomResearchId) === -1)
      researchId.push(randomResearchId);
  }
}

module.exports.authorName = authorName;
module.exports.universityName = universityName;
module.exports.dateOfBirth = dateOfBirth;
module.exports.hIndex = hIndex;
module.exports.gender = gender;
module.exports.mentorNo = mentorNo;

module.exports.paperTitle = paperTitle;
module.exports.conferenceName = conferenceName;
module.exports.publishDate = publishDate;

module.exports.authorNo = authorNo;
module.exports.researchId = researchId;
