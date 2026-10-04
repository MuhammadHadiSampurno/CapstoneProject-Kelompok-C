import book01 from '../assets/images/books/book-01.jpg'
import book02 from '../assets/images/books/book-02.jpg'
import book03 from '../assets/images/books/book-03.jpg'
import book04 from '../assets/images/books/book-04.jpg'
import book05 from '../assets/images/books/book-05.jpg'
import book06 from '../assets/images/books/book-06.jpg'
import book07 from '../assets/images/books/book-07.jpg'
import book08 from '../assets/images/books/book-08.jpg'
import book09 from '../assets/images/books/book-09.jpg'
import book10 from '../assets/images/books/book-10.jpg'
import book11 from '../assets/images/books/book-11.jpg'
import book12 from '../assets/images/books/book-12.jpg'

export const bookData = [
  {
    id: 'book-01',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiksi',
    cover: book01,
    description:
      'Set in the Jazz Age of 1920s America, the novel follows Nick Carraway and his encounters with the mysterious millionaire Jay Gatsby, whose pursuit of love and the past unfolds amid wealth, ambition, and social change.',
    publishedDate: 1925,
    publisher: 'Feedbooks',
    language: 'English',
    isbn: null,
    rating: 3.9,
    popularityScore: 40
  },

  {
    id: 'book-02',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    category: 'Fiksi',
    cover: book02,
    description:
      'A classic romantic novel that follows Elizabeth Bennet as she navigates relationships, social expectations, and misunderstandings while developing a complicated relationship with the wealthy and reserved Mr. Darcy.',
    publishedDate: 2015,
    publisher: 'Recovering the Classics',
    language: 'English',
    isbn: null,
    rating: 4.5,
    popularityScore: 75
  },

  {
    id: 'book-03',
    title: "Alice's Adventures in Wonderland",
    author: 'Lewis Carroll',
    category: 'Fiksi',
    cover: book03,
    description:
      'Alice follows a mysterious White Rabbit down a rabbit hole and enters a fantastical world filled with unusual characters, strange situations, riddles, and adventures as she searches for a way home.',
    publishedDate: 2021,
    publisher: 'Welbeck Publishing Group Limited',
    language: 'English',
    isbn: null,
    rating: 4.0,
    popularityScore: 80
  },

  {
    id: 'book-04',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    category: 'Non Fiksi',
    cover: book04,
    description:
      'The book explores the history of Homo sapiens and examines how human cooperation, shared beliefs, and social structures enabled our species to become a dominant force in the world.',
    publishedDate: 2014,
    publisher: 'Signal',
    language: 'English',
    isbn: null,
    rating: 4.3,
    popularityScore: 78
  },

  {
    id: 'book-05',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Non Fiksi',
    cover: book05,
    description:
      'A practical guide to building better habits through small and consistent changes, emphasizing how repeated actions can accumulate over time and contribute to meaningful personal improvement.',
    publishedDate: 2018,
    publisher: 'Penguin Publishing Group',
    language: 'English',
    isbn: null,
    rating: 4.3,
    popularityScore: 82
  },

  {
    id: 'book-06',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    category: 'Non Fiksi',
    cover: book06,
    description:
      'A personal development book that presents seven principles for improving effectiveness, personal responsibility, relationships, and decision-making in both professional and everyday life.',
    publishedDate: 2013,
    publisher: 'Mango Media',
    language: 'English',
    isbn: null,
    rating: 4.2,
    popularityScore: 77
  },

  {
    id: 'book-07',
    title: 'Introduction to Algorithms',
    author:
      'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    category: 'Edukasi',
    cover: book07,
    description:
      'A comprehensive textbook covering fundamental and advanced algorithms, combining theoretical rigor with practical explanations across topics such as sorting, graph algorithms, data structures, optimization, and machine learning.',
    publishedDate: 2022,
    publisher: 'The MIT Press',
    language: 'English',
    isbn: null,
    rating: 4.3,
    popularityScore: 70
  },

  {
    id: 'book-08',
    title: 'Computer Networking: A Top-Down Approach',
    author: 'James F. Kurose, Keith W. Ross',
    category: 'Edukasi',
    cover: book08,
    description:
      'A textbook that explains computer networking through a top-down approach, beginning with application-layer concepts before progressing through the network, transport, and lower layers to build a structured understanding of networking.',
    publishedDate: 2021,
    publisher: 'Pearson India Education Services',
    language: 'English',
    isbn: null,
    rating: 4.1,
    popularityScore: 68
  },

  {
    id: 'book-09',
    title: 'IELTS Reading (Academic): Actual Tests With Answers',
    author: 'IELTS',
    category: 'Edukasi',
    cover: book09,
    description:
      'A collection of IELTS Academic Reading practice materials designed to develop test-taking skills and reading proficiency through practice questions based on actual or recent test materials.',
    publishedDate: 2021,
    publisher: 'Oxford University Press',
    language: 'English',
    isbn: null,
    rating: null,
    popularityScore: 84
  },

  {
    id: 'book-10',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J. K. Rowling',
    category: 'Anak dan Remaja',
    cover: book10,
    description:
      "Harry Potter discovers that he is a wizard and begins his first year at Hogwarts School of Witchcraft and Wizardry, where he makes new friends and encounters the mysteries surrounding his past and the magical world.",
    publishedDate: 2010,
    publisher: null,
    language: 'English',
    isbn: null,
    rating: 4.5,
    popularityScore: 95
  },

  {
    id: 'book-11',
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    category: 'Anak dan Remaja',
    cover: book11,
    description:
      'A philosophical and imaginative tale about a young prince who travels between planets and encounters different characters, exploring themes of friendship, love, loneliness, responsibility, and the way people understand the world.',
    publishedDate: null,
    publisher: null,
    language: 'English',
    isbn: null,
    rating: 4.3,
    popularityScore: 74
  },

  {
    id: 'book-12',
    title: 'The Chronicles of Narnia',
    author: 'C. S. Lewis',
    category: 'Anak dan Remaja',
    cover: book12,
    description:
      'A fantasy series set in the magical land of Narnia, where children encounter talking animals, mythical creatures, magic, and adventures across a world where time moves differently from their own.',
    publishedDate: 2001,
    publisher: 'HarperCollins',
    language: 'English',
    isbn: null,
    rating: 4.3,
    popularityScore: 90
  }
]

export default bookData