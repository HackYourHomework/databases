const faker = require('faker');

const authorName = [];
for (i = 0; i < 15; i++) {
  const firstNameRandom = faker.name.firstName();
  const lastNameRandom = faker.name.lastName();

  authorName.push(firstNameRandom + ' ' + lastNameRandom);
}
console.log(authorName);
const universityName = [];
for (i = 0; i < 15; i++) {
  const randomUniversity = faker.address.country();
  universityName.push(randomUniversity + ' university');
}
console.log(universityName);
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
console.log(dateOfBirth);
const hIndex = [];
for (i = 0; i < 15; i++) {
  const hIndexRandom = faker.random.float();
  hIndex.push(hIndexRandom);
}
console.log(hIndex);
const gender = [];
for (i = 0; i < 15; i++) {
  const maleOrFemale = ['m', 'f'];

  const genderRandom = faker.random.arrayElement(maleOrFemale);
  gender.push(genderRandom);
}
console.log(gender);

const paperTitle = [];
for (i = 0; i < 15; i++) {
  const paperTitleRandom = faker.name.title();
  paperTitle.push(paperTitleRandom + ' Research');
}
console.log(paperTitle);
const conferenceName = [];
for (i = 0; i < 15; i++) {
  const conferenceRandom = faker.name.title();
  conferenceName.push(conferenceRandom + ' Conference');
}
console.log(conferenceName);
const publishDate = [];
for (i = 0; i < 15; i++) {
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .toISOString()
      .slice(0, 10);
  }
  publishDate.push(randomDate(new Date(2010, 0, 1), new Date(2021, 0, 1)));
}
console.log(publishDate);
const mentorNo = [];
for (i = 0; i < 15; i++) {
  while (mentorNo.length < 15) {
    let randomNumber = Math.floor(Math.random() * 14) + 1;
    if (mentorNo.indexOf(randomNumber) === -1) mentorNo.push(randomNumber);
  }
}
console.log(mentorNo);
