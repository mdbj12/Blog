from app import app
from models import db, User, Blog
import click

with app.app_context():
    user_options = 0

    while user_options != 3:
        click.echo('(1) Create a New User!')
        click.echo('(2) Create a New Blog Post!')
        click.echo('(3) Exit Program...')

        user_options = int(input())

        if user_options == 1:
            @click.command()
            @click.option('--username', prompt='Enter Username: ')
            @click.option('--email', prompt='Enter your Email: ')
            @click.option('--password', prompt='Enter a Password: ')

            def create_user(username, email, password):
                new_user = User(
                    username = username,
                    email = email,
                    password = password
                )
                db.session.add(new_user)
                db.session.commit()

                click.echo('Creating User...')

            if __name__ == '__main__':
                create_user.main(standalone_mode=False)
        
        elif user_options == 2:
            menu_options = 0

            while menu_options != 2:
                click.echo('(1) Write a new post?')
                click.echo('(2) Back to UserIDs...')

                menu_options = int(input())

                if menu_options == 1:
                    users = db.session.query(User).all()
                    user_info = dict()
                    for user in users:
                        user_info[user.id] = user
                        click.echo(user.username)

                    while True:
                        try:
                            user_id = int(input('Search a UserID: '))
                        except ValueError:
                            click.echo('Enter Valid UserID')
                            continue
                        if user_id not in list(user_info.keys()):
                            click.echo('UserID does not exist!')
                        else:
                            break

                    @click.command()
                    @click.option('--text', prompt='Write your post!')

                    def add_post(text, user_id=user_id):
                        new_post = Blog(
                            text = text,
                            user_id = user_id
                        )

                        db.session.add(new_post)
                        db.session.commit()
                        click.echo('Blog posted!')

                    if __name__ == '__main__':
                        add_post.main(standalone_mode=False)
                    continue

                elif menu_options == 2:
                    click.echo('Going back to UserIDs')
    
        else:
            click.echo('Quitting Program...')