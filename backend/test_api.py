import unittest
from main import create_app
from config import TestConfig
from exts import db


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)

        self.client = self.app.test_client(self)

        with self.app.app_context():
            # db.init_app(self.app)

            db.create_all()

    def test_hello_world(self):
        hello_response = self.client.get('/book/hello')

        json = hello_response.json

        self.assertEqual(json, { 'message': 'Hello World' })


    def test_get_all_books(self):
        """
            Test retrieving all books
        """
        response = self.client.get('/book/books')

        status_code = response.status_code

        self.assertEqual(status_code, 200)


    def test_get_one_book(self):
        id = 1
        response = self.client.get(f'/book/book/{id}')

        status_code = response.status_code

        self.assertEqual(status_code, 404)


    def test_create_book(self):
        create_book_response = self.client.post(
            '/book/books',
            json={
                'title': 'Test Book', 
                'author': 'Test author', 
                'description': 'Test description',
                'published': 'Test published',
                'publisher': 'Test publisher',
                'genre': 'Test genre',
                'language': 'Test language',
                'image': 'Test image',
                'rating': '0',
            }
        )

        status_code = create_book_response.status_code

        self.assertEqual(status_code, 201)


    def test_update_book(self):
        create_book_response = self.client.post(
            '/book/books',
            json={
                'title': 'Test Book', 
                'author': 'Test author', 
                'description': 'Test description',
                'published': 'Test published',
                'publisher': 'Test publisher',
                'genre': 'Test genre',
                'language': 'Test language',
                'image': 'Test image',
                'rating': '0',
            }
        )

        status_code = create_book_response.status_code

        id = 1

        update_response = self.client.put(
            f'book/book/{id}',
            json={
                'title': 'Test Book', 
                'author': 'Test author', 
                'description': 'Test description',
                'published': 'Test published',
                'publisher': 'Test publisher',
                'genre': 'Test genre',
                'language': 'Test language',
                'image': 'Test image',
                'rating': '0',
            }
        )

        status_code = update_response.status_code
        self.assertEqual(status_code, 200)


    def test_delete_book(self):
        create_book_response = self.client.post(
            '/book/books',
            json={
                'title': 'Test Book', 
                'author': 'Test author', 
                'description': 'Test description',
                'published': 'Test published',
                'publisher': 'Test publisher',
                'genre': 'Test genre',
                'language': 'Test language',
                'image': 'Test image',
                'rating': '0',
            }
        )

        id = 1

        delete_response = self.client.delete(f'/book/book/{id}')

        status_code = delete_response.status_code

        print(delete_response.json)

        self.assertEqual(status_code, 200)


    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()
