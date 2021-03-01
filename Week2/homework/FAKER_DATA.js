const { Faker } = require('fakergem');

const createFakerData = ()=>({

    author_name: Faker.Name.name() ,
    university :Faker.Educator.university() , 
    date_of_birth :Faker.Date.birthday(18, 65),
    h_index :Faker.Number.between(1, 200),
    gender : Faker.Random.element('FM') ,
    mentor : Faker.Number.between(1, 15),
    paper_title: Faker.Book.title(),
    conference: Faker.Book.publisher(),
    publish_date: Faker.Date.backward(100)
    author_no : Faker.Number.between(1, 15),
    esearch_paper_no : Faker.Number.between(1, 30)
})
const fakers = [];
const dataLength = 30;
for(let i=0 ;i<dataLength;i++){
    fakers.push(createFakerData() )
}


console.log(fakers);