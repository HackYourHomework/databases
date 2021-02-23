//Invitee data
const inviteeInsertQer = `INSERT INTO Invitee VALUES ?  `;
const inviteeData = [
  [1, "Robert Baratheon", "Robb Stark"],
  [2, "Theon Greyjoy", "Sansa Stark"],
  [3, "Samwell Tarly", "John Snow"],
  [4, "Brienne of Tarth", "Jaime Lannister"],
  [5, "Grey Worm", "Missandei"],
];

//Room data
const roomInsertQuer = `INSERT INTO Room VALUES ?  `;
const roomData = [
  [110, "Riverlands", 1],
  [220, "Dragonstone", 2],
  [330, "Dorne", 3],
  [440, "Valyria", 4],
  [550, "Old Wyk", 5],
];

//meeting data
const meetingInsertQuer = `INSERT INTO Meeting VALUES ?  `;
const meetingData = [
  [1, "The Bells", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 110],
  [2, "The B.O.B", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 220],
  [3, "Hardhome", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 330],
  [4, "Blackwater", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 440],
  [5, "The Long Night", "2019-01-01 22:10:23", "2019-01-01 22:10:23", 550],
];

module.exports = {
  inviteeInsertQer,
  inviteeData,
  roomInsertQuer,
  roomData,
  meetingInsertQuer,
  meetingData,
};
