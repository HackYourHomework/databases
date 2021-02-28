// 1
// select  research_papers.paper_title, count(authors.author_name)
// from research_papers
// left join authors_research_papers on research_paper_no = research_papers.paper_id
// left join authors on authors_research_papers.author_no = authors.author_no
// group by paper_title;



// 2
// select count(research_papers.paper_title) As FemalesPapers
// from research_papers
// left join authors_research_papers on research_paper_no = research_papers.paper_id
// left join authors on authors_research_papers.author_no = authors.author_no
// where gender = 'f';

// 3
// select count(author_name),university,avg(h_index)
// from authors
// group by university;

// 4
// select university,count(research_papers.paper_title) As Research_Papers
// from research_papers
// left join authors_research_papers on research_paper_no = research_papers.paper_id
// left join authors on authors_research_papers.author_no = authors.author_no
// group by university;


// 5
// select count(author_name),university, max(h_index), min(h_index)
// from authors
// group by university;
