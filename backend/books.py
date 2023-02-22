from flask_restx import Namespace, Resource, fields
from models import Book
from flask import request


book_namespace=Namespace('book', description='Namespace for books')

#model (serialiser)
book_model=book_namespace.model(
    "Book",
    {
        'id': fields.Integer(),
        'title': fields.String(),
        'author': fields.String(),
        'description': fields.String(),
        'published': fields.String(),
        'publisher': fields.String(),
        'genre': fields.String(),
        'language': fields.String(),
        'image': fields.String(),
        'rating': fields.Integer()
    }
)
    
@book_namespace.route("/hello")
class HelloResource(Resource):
    def get(self):
        return {"message": "Hello World"}


@book_namespace.route('/books')
class BooksResource(Resource):

    @book_namespace.marshal_list_with(book_model)
    def get(self):
        """
            Get all books
        """

        books=Book.query.all()


        return books


    @book_namespace.marshal_with(book_model)
    @book_namespace.expect(book_model)
    def post(self):
        """
            Add new entry
        """

        data=request.get_json()

        new_book=Book(
            title=data.get('title'),
            author=data.get('author'),
            description=data.get('description'),
            published=data.get('published'),
            publisher=data.get('publisher'),
            genre=data.get('genre'),
            language=data.get('language'),
            image=data.get('image'),
            rating=data.get('rating')
        )

        new_book.save()

        return new_book, 201
    #GIVE SERVER RESPONSE!!!!!
    # return make_response(jsonify({"message": "User created successfuly"}), 201)


@book_namespace.route('/book/<int:id>')
class BookResource(Resource):

    @book_namespace.marshal_with(book_model)
    def get(self, id):
        """
            Get book by id
        """
        
        book=Book.query.get_or_404(id)

        return book

    @book_namespace.marshal_with(book_model)
    @book_namespace.expect(book_model)
    def put(self, id):
        """
            Update book by id
        """
        
        book_to_update=Book.query.get_or_404(id)

        data=request.get_json()

        book_to_update.update(
            data.get('title'), 
            data.get('author'), 
            data.get('description'),
            data.get('published'),
            data.get('publisher'),
            data.get('genre'),
            data.get('language'),
            data.get('image'),
            data.get('rating'),
        )

        return book_to_update


    @book_namespace.marshal_with(book_model)
    def delete(self, id):
        """
            delete book by id
        """
        
        book_to_delete=Book.query.get_or_404(id)

        book_to_delete.delete()

        return book_to_delete