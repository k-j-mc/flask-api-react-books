from exts import db


"""
class Book:
id:int primary key
title:str
description:str (text)
"""

class Book(db.Model):
    id=db.Column(db.Integer(), primary_key=True)
    title=db.Column(db.String(), nullable=False)
    author=db.Column(db.Text(), nullable=False)
    description=db.Column(db.Text(), nullable=False)
    published=db.Column(db.String(), nullable=False)
    publisher=db.Column(db.String(), nullable=False)
    genre=db.Column(db.String(), nullable=False)
    language=db.Column(db.String(), nullable=False)
    image=db.Column(db.Text(), nullable=False)
    rating=db.Column(db.Integer(), primary_key=False)


    def __repr__(self):
        return f'<Book {self.title} >'
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(
            self, 
            title, 
            author, 
            description, 
            published, 
            publisher, 
            genre, 
            language, 
            image, 
            rating
        ):
        
        self.title=title
        self.author=author
        self.description=description
        self.published=published
        self.publisher=publisher
        self.genre=genre
        self.language=language
        self.image=image
        self.rating=rating

        db.session.commit()


    def delete(self):
        db.session.delete(self)
        db.session.commit()