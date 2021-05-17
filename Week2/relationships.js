const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alphagama6",
  database: "company",
});
const execQuery = util.promisify(connection.query.bind(connection));
async function seedDatabase() {
  const CREATE_RESEARCH_PAPERS_TABLE = `
      CREATE TABLE IF NOT EXISTS research_Papers(paper_id int PRIMARY KEY , paper_title VARCHAR(255), conference VARCHAR(50),publish_date DATE)`;
  const CREATE_RESEARCH_AUTHOR_TABLE =
    "CREATE TABLE IF NOT EXISTS author_research(author_number int,paper_id int,FOREIGN KEY (author_number) REFERENCES authors(author_no),FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id))";
  const mentors = [
    {
      mentor: 2,
    },
    {
      mentor: 3,
    },
    {
      mentor: 4,
    },
    {
      mentor: 5,
    },
    {
      mentor: 2,
    },
    {
      mentor: 5,
    },
    {
      mentor: 4,
    },
    {
      mentor: 3,
    },
    {
      mentor: 2,
    },
    {
      mentor: 6,
    },
    {
      mentor: 5,
    },
    {
      mentor: 4,
    },
    {
      mentor: 3,
    },
    {
      mentor: 2,
    },
    {
      mentor: 1,
    },
  ];
  const authors = [
    {
      author_no: 1,
      author_name: "osama",
      university: "oxford",
      date_of_birth: "2015-05-06",
      h_index: 3,
      gender: "M",
    },
    {
      author_no: 2,
      author_name: "Ahmed",
      university: "Massachusetts Institute of Technology (MIT)",
      date_of_birth: "2015-05-06",
      h_index: 4,
      gender: "M",
    },
    {
      author_no: 3,
      author_name: "Ibrahim",
      university: "Stanford University",
      date_of_birth: "2015-05-06",
      h_index: 5,
      gender: "M",
    },
    {
      author_no: 4,
      author_name: "shaas",
      university: "Harvard University",
      date_of_birth: "2015-05-06",
      h_index: 4,
      gender: "M",
    },
    {
      author_no: 5,
      author_name: "Mostaffa",
      university: "California Institute of Technology (Caltech)",
      date_of_birth: "2015-05-06",
      h_index: 6,
      gender: "M",
    },
    {
      author_no: 6,
      author_name: "Fatma",
      university: "Oxford",
      date_of_birth: "2015-05-06",
      h_index: 5,
      gender: "F",
    },
    {
      author_no: 7,
      author_name: "Zenab",
      university: "University of Cambridge",
      date_of_birth: "2015-05-06",
      h_index: 7,
      gender: "F",
    },
    {
      author_no: 8,
      author_name: "Mohsen",
      university: "UCL",
      date_of_birth: "2015-05-06",
      h_index: 8,
      gender: "M",
    },
    {
      author_no: 9,
      author_name: "Mahmoud",
      university: "Princeton University",
      date_of_birth: "2015-05-06",
      h_index: 7,
      gender: "M",
    },
    {
      author_no: 10,
      author_name: "Ali",
      university: "Oxford",
      date_of_birth: "2015-05-06",
      h_index: 6,
      gender: "F",
    },
    {
      author_no: 11,
      author_name: "Mariam",
      university: "Stanford University",
      date_of_birth: "2015-05-06",
      h_index: 3,
      gender: "F",
    },
    {
      author_no: 12,
      author_name: "adai",
      university: "UCL",
      date_of_birth: "2015-05-06",
      h_index: 4,
      gender: "M",
    },
    {
      author_no: 13,
      author_name: "Tamimi",
      university: "Massachusetts Institute of Technology (MIT)",
      date_of_birth: "2015-05-06",
      h_index: 2,
      gender: "M",
    },
    {
      author_no: 14,
      author_name: "Sara",
      university: "UCL",
      date_of_birth: "2015-05-06",
      h_index: 1,
      gender: "F",
    },
    {
      author_no: 15,
      author_name: "Khaled",
      university: "Stanford University",
      date_of_birth: "2015-05-06",
      h_index: 5,
      gender: "M",
    },
  ];
  const research_papers = [
    {
      paper_id: 1,
      paper_title: "World Scientists’ Warning of a Climate Emergency",
      conference: "a",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 2,
      paper_title: "Climate tipping points too risky to bet against",
      conference: "b",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 3,
      paper_title:
        "New elevation data triple estimates of global vulnerability to sea-level rise and coastal flooding",
      conference: "c",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 4,
      paper_title: "The global tree restoration potential",
      conference: "d",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 5,
      paper_title:
        "Health effects of dietary risks in 195 countries', 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017",
      conference: "e",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 6,
      paper_title:
        "Food in the Anthropocene: the EAT-Lancet Commission on healthy diets from sustainable foods",
      conference: "f",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 7,
      paper_title: "Concerns of young protesters are justified",
      conference: "g",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 8,
      paper_title: "Concerns of young protesters are justified",
      conference: "a",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 9,
      paper_title:
        "Global warming impairs stock-recruitment dynamics of corals",
      conference: "c",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 10,
      paper_title:
        "Eat less meat: UN climate-change report calls for change to human diet",
      conference: "a",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 11,
      paper_title: "World Scientists’ Warning of a Climate Emergency",
      conference: "u",
      publish_date: "2015-05-06",
    },

    {
      paper_id: 12,
      paper_title: "Climate tipping points too risky to bet against",
      conference: "y",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 13,
      paper_title:
        "New elevation data triple estimates of global vulnerability to sea-level rise and coastal flooding",
      conference: "h",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 14,
      paper_title: "The global tree restoration potential",
      conference: "o",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 15,
      paper_title:
        "Health effects of dietary risks in 195 countries', 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017",
      conference: "s",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 16,
      paper_title:
        "Food in the Anthropocene: the EAT-Lancet Commission on healthy diets from sustainable foods",
      conference: "g",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 17,
      paper_title: "Concerns of young protesters are justified",
      conference: "b",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 18,
      paper_title: "Concerns of young protesters are justified",
      conference: "j",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 19,
      paper_title:
        "Global warming impairs stock-recruitment dynamics of corals",
      conference: "b",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 20,
      paper_title:
        "Eat less meat: UN climate-change report calls for change to human diet",
      conference: "e",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 21,
      paper_title: "World Scientists’ Warning of a Climate Emergency",
      conference: "s",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 22,
      paper_title: "Climate tipping points too risky to bet against",
      conference: "g",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 23,
      paper_title:
        "New elevation data triple estimates of global vulnerability to sea-level rise and coastal flooding",
      conference: "d",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 24,
      paper_title: "The global tree restoration potential",
      conference: "d",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 25,
      paper_title:
        "Health effects of dietary risks in 195 countries', 1990–2017: a systematic analysis for the Global Burden of Disease Study 2017",
      conference: "f",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 26,
      paper_title:
        "Food in the Anthropocene: the EAT-Lancet Commission on healthy diets from sustainable foods",
      conference: "y",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 27,
      paper_title: "Concerns of young protesters are justified",
      conference: "d",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 28,
      paper_title: "Concerns of young protesters are justified",
      conference: "f",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 29,
      paper_title:
        "Global warming impairs stock-recruitment dynamics of corals",
      conference: "a",
      publish_date: "2015-05-06",
    },
    {
      paper_id: 30,
      paper_title:
        "Eat less meat: UN climate-change report calls for change to human diet",
      conference: "a",
      publish_date: "2015-05-06",
    },
  ];
  const authorResearch = [];
  for (let s = 0; s < 2; s++) {
    for (let author_number = 1; author_number <= 15; author_number++) {
      authorResearch.push(author_number);
    }
  }

  connection.connect();
  try {
    // call the function that returns promise
    let i = 0;
    await execQuery(CREATE_RESEARCH_PAPERS_TABLE);
    await execQuery(CREATE_RESEARCH_AUTHOR_TABLE);
    authors.forEach(async (author) => {
      await execQuery("INSERT INTO authors SET ? ", author);
    });

    mentors.forEach(async (mentor) => {
      i++;
      await execQuery(`UPDATE authors SET ? WHERE author_no=${i}`, mentor);
    });
    research_papers.forEach(async (research_paper) => {
      await execQuery("INSERT INTO research_Papers SET ?", research_paper);
    });
    authorResearch.forEach(async (el) => {
      i++;
      await execQuery(
        `INSERT INTO author_research SET author_number=${el},paper_id=${i} `
      );
    });
  } catch (error) {
    console.error(error);
    connection.end();
  }
  connection.end();
}
seedDatabase();
