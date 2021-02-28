// select E1.author_name As Authors, E2.author_name as Mentors
// from authors as E1 left join authors as E2 
// on E1.mentor = E2.author_no;



// select authors.*, research_papers.paper_title
// from authors
// left join authors_research_papers on authors.author_no = authors_research_papers.author_no
// left join research_papers on authors_research_papers.research_paper_no = research_papers.paper_id